const express = require("express");
const app = express()
const mongoose = require("mongoose");
const path = require("path");
const chat = require("./models/chat.js");

app.set("views",path.join(__dirname ,"views"));
app.set("view engine","ejs");

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

main()
 .then(()=>{
    console.log("connection successful");
 })
 .catch((err)=>console.log(err));



app.listen(8080,()=>{
    console.log("app is listening on port 8080");
 })

app.get("/",(req,res)=>{
    res.send("working");
})

app.get("/chats", async (req,res)=>{
    let chats = await chat.find();
    // console.log(chats);
    res.render("index.ejs",{chats});
})





// let chat1 = new chat({
//     from:"mak",
//     to:"ram",
//     msg:"this is an auto generated message",
//     created_at: new Date(),
// })
// chat1.save()
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>console.log(err));
