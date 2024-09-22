const express = require("express");
const app = express()
const mongoose = require("mongoose");
const path = require("path");
const chat = require("./models/chat.js");
const methodOverride = require('method-override');

app.use(express.urlencoded({extended:true}));

app.use(methodOverride('_method'))

app.set("views",path.join(__dirname ,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));


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

app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/chats",(req,res)=>{
    let {from , to , msg} = req.body;
    newChat = new chat({
        from:from,
        to:to,
        msg:msg,
        created_at: new Date()
    });
    newChat.save()
    .then((res)=>{
        console.log("chat saved");
    })
    .catch((err)=>console.log(err));
    res.redirect("/chats");
})

app.get("/chats/:id/edit", async (req,res)=>{
    let {id} = req.params;
    let Chat = await chat.findById(id);
    res.render("edit.ejs",{Chat});
    // res.send("working")
})


app.put("/chats/:id", async (req,res)=>{
    let { id } = req.params;
    let { newMsg } = req.body;
    let updatedChat = await chat.findByIdAndUpdate(
        id,
        { msg : newMsg},
        { runValidators : true , new : true}
    );
    console.log(updatedChat);
    res.redirect("/chats");
})   

app.delete("/chats/:id", async (req,res)=>{
    let { id } = req.params;
    let deletedChat = await chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});

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
