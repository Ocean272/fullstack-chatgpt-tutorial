// import { GoogleGenAI } from "@google/genai";
import {OpenAI} from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

//const whitelist = ["localhost:5173", "127.0.0.1:5173", "[::1]:5173"];

const app = express();
const port = 8000;
dotenv.config();
app.use(bodyParser.json());

// const allowedOrigins = [
//         "http:127.0.0.1:5173",
//         "http:localhost:5173"
//         ];

app.use(cors({
    // origin: function (origin, callback) {
    //     if (!origin) return callback(null, true);

    //     const isWhitelisted = whitelist.some(domain => origin.includes(domain));

    //     if (isWhitelisted) {
    //         callback(null, true);
    //     } else {
    //         callback(new Error("Blocked By Security CORS Policy"));
    //     }
    // },
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowHeaders:["Content-Type"]
}));

// const ai = new GoogleGenAI({
//   apiKey: process.env.OPENAI_API_KEY,
//   apiVersion: 'v1'
// });

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.MY_HOSTING_PAGE
})



app.post("/", async (request, response) => {
    const { chats } = request.body;

    // if (!chats) {
    //     return response.status(400).json({error: "Missing chats payload parameter."});
    // }

    try{
        // const contents = chats.map(msg => ({
        //     role: msg.role === "assistant" ? "model" : "user",
        //     parts: [{text: msg.content}]
        // }));

        // const result = await ai.models.generateContent({
        const result = await openai.chat.completions.create({
            // model: "gemini-2.5-flash",
            model: "llama3.2:latest",
            // contents: contents,
            // config: [
            //     {
            //         systemInstruction: "You are a AmyGPT."
            //     },
            messages: [
                {
                    role: "system",
                    content: "You are AmyGPT."
                },
                ...chats,
            ],
        });
    
        response.json({
            // output:{
            //     role: "assistant",
            //     content: result.text
            // }
            output: result.choices[0].message,
        });

    } catch (error) {
        console.error("Proxmox LLM Connection Error: ", error);
        response.status(500).json ({ error: error.message});
    }
});

app.listen( port, () => {
    console.log(`Listening on port ${port} ...`);
});