// const express = require('express');
import express from "express";
import cors from "cors";
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());


let quizzes = [
    { id: 1, title: "Квиз1", description: "Описание1" },
];

app.get("/api/quizzes", (req, res) => {
    res.json(quizzes);
});

app.post("/api/quizzes", (req,res)=>{
    const {title, description} = req.body;

    const newQuiz = {
        id: Date.now(),
        title:title,
        description:description
    };
    quizzes.push(newQuiz);
    res.status(201).json(newQuiz);
});


//отображение данных
//http://localhost:5000/api/data

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log(`GET http://localhost:${port}/api/quizzes - получить все квизы`);
});
