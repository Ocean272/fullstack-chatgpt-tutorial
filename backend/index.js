import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";


const app = express();
const port = 8000;
dotenv.config();
app.use(bodyParser.json());
app.use(cors());

const configuration = new Configuration({
    organization: `${process.env.CHAT_ORGANIZATION}`,
    apiKey: `${process.env.CHAT_APIKEY}`
});

const openai = new OpenAIApi(configuration);

app.post("/", async (request, response) => {
    const { chats } = request.body;

    const result = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "You are a AmyGPT."
            },
            ...chats,
        ],
    });

    response.json({
        output: result.data.choices[0].message,
    });
});

app.listen( port, () => {
    console.log(`Listening on port ${port} ...`);
});