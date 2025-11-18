import express from 'express';
import cors from "cors"

const db = require("./db.js");
const express = require("express")
const app = express();

app.use(express.json());
app.use(cors())


// mensagem para ver se a conexão com o banco de dados esta funcionando
app.get("/", (req, res)=>{
    res.json({
        message: "funcionando"
    })
});


// pegar usuario pelo id
app.get("/usuarios/:id", async (res, req) =>{
    const usuarios = await db.selectCustumer(req.params.id);
    res.json(usuarios)
});

// pegar todos os usuarios
app.get("/usuarios", async (res, req) =>{
    const usuarios = await db.selectCustumers();
    res.json(usuarios)
});

// colocar um usuario no banco de dados
app.post("/usuarios", async (res, req)=>{
    await db.insertCustumer(req.body);
    res.sendStatus(201);
});

// atualizar um usuario pelo id
app.patch("/usuarios/:id", async (res,req)=>{
    await db.upadateCustumer(req.params.id, req.body);
    res.sendStatus(200);
});

// deletar o usario pelo id
app.delete("/usuarios/:id", async (res,req)=>{
    await db.deleteCustumer(req.params.id);
    res.sendStatus(204); 
});

app.listen(port);
console.log("banco de dados criado!");
