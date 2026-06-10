# fullstack-chatgpt-tutorial

Installation
Clone this repo.

Navigate into the repo >>  cd fullstack-chatgpt-tutorial

Navigate into the backend folder >>  cd backend

Install the dependencies >>  npm install

Replace the configuration data with your own data in the index.js file

Run the index.js file >>  node index

That will start the backend server on port 8000: http://localhost:8000/

Navigate into the frontend folder >>  cd frontend
Install the dependencies >>  npm install
Start the local server >>  npm run dev
That will open the project on your default browser: http://localhost:5173/. You can now chat with the AI from your browser


Updated on 11 JUNE 2026

The code has been updated with Node 18 but using --legacy-peer-devs to maintain its original version.  As it is running in
Vite+React, the main.jsx can still be used. As I am using a local LLM, running in a docker container in a Proxmox server, 
may need to change if using a Openai API in cloud, in /backend/index.js file.
