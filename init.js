const mongoose = require("mongoose");
const chat = require("./models/chat.js");

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
};

main()
 .then(()=>{
    console.log("connection successful");
 })
 .catch((err)=>console.log(err));

 let allChat = [
    {
        from:"john",
        to:"nic",
        msg:"how's going on",
        created_at: new Date(),
    },
    {
        from:"shukla",
        to:"bhashkar",
        msg:"where are u",
        created_at: new Date(),
    },
    {
        from:"sunny",
        to:"bunny",
        msg:"lets drink!",
        created_at: new Date(),
    },
    {
        from:"ayush",
        to:"piyush",
        msg:"someone is calling you",
        created_at: new Date(),
    },
    {
        from:"rohan",
        to:"mohan",
        msg:"well! i'm going",
        created_at: new Date(),
    },
 ];

chat.insertMany(allChat);