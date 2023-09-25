const express=require("express")
const socket=require("socket.io")

const app=express()
const port=8000;
const server=app.listen(port,()=>{
    console.log(`server connected to ${port}`)
})
const io=socket(server,{
    cors:{
        origin:"*"
    }
})

io.on("connection",(clientsocket)=>{
    console.log(clientsocket.id)
    clientsocket.on("MSG",(clientdata)=>{
        console.log(clientdata);
        clientsocket.emit("client","server is sending to client")
        clientsocket.on("BRDCST",(clientdatabroadcast)=>{
            console.log(clientdatabroadcast)
            io.emit("sendmsgtoall","player 1 won the match")
        })
    })
    clientsocket.on("EXC BROADCAST",(clientexclsvbroadcast)=>{
        console.log(clientexclsvbroadcast)
        clientsocket.broadcast.emit("exclusivemsg","send to brdsct persons")
    })
    clientsocket.on("JOIN ROOM",(clientroom)=>{
        console.log(clientroom)
        clientsocket.join(clientroom)
        clientsocket.emit("sendmsgtogrp","new participant has joined in grpA")

    })
})

app.get("/",(req,res)=>{
    res.send("home page");
});
