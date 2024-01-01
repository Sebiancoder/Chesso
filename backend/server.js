//backend server for sending openai requests

import oai_key from "./OAI_KEY.js";
import { OpenAI } from "langchain/llms/openai";
import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import http from 'http';

const app = express()

const openai_llm = new OpenAI({openAIApiKey: oai_key})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/', (req, res) => {
    
    console.log(req.body.prompt)
    
    const prompt = req.body.prompt

    const result = openai_llm.predict(prompt).then((response) => {

        res.send(response)

    })
});

const port = process.env.PORT || 4000; // You can use environment variables for port configuration
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});