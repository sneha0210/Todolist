const express = require("express");
const bodyParser = require("body-parser");
var app= express();
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));


const mongoose= require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/todo").then(res=>console.log("database connected")).catch(err=>console.log("error"))
   
const trySchema = new mongoose.Schema({
   name: String 
})
const item = mongoose.model("tasks",trySchema);
const todo = new item({
    name: "Create some videos"
});
const todo2 = new item({
    name: "Learn DSA"
});
const todo3 = new item({
    name: "Learn React"
});
const todo4 = new item({
    name: "Take some rest"
});
//todo.save();
//todo2.save();
//todo3.save();
//todo4.save();
app.get("/", function (req, res) {
    item.find().then(function (foundItems,err) {
      if (err) {
        console.log(err);
      }
      else {
        res.render("list", { ejes: foundItems });
      }
    });
});
app.post("/",function(req,res){
   const itemName = req.body.ele1; 
   const todo4 = new item({
      name:itemName
   });
   todo4.save();
   res.redirect("/");
});
app.post("/delete",function(req,res){
   const checked= req.body.checkbox1;
   item.findByIdAndRemove(checked).then(function(err){
      if(!err){
        console.log("deleted");
        res.redirect("/");
      }
   });
});
app.listen("3000",function(){
    console.log("server is running")
});
