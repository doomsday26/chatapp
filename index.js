const express= require('express');
const app = express();
const fs= require('fs')
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended:false}))
app.get('/',(req,res,next)=>{
res.send('<form action="/chat" method="GET" onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" ><input type="text" id="username"  name="username" placeholder="username"><button type="submit">LOGIN</button></form>');
})
app.get('/chat',(req,res,next)=>{
let chats;
fs.readFile('file.txt','utf8',(err,data)=>{
    chats=data;
    console.log(chats+"6");
    res.send(`${data}<br /><form action="/chat" onsubmit="document.getElementById('user').value=localStorage.getItem('username') " method="POST"><input type="text" name="message" placeholder="write message here"><input type="hidden" id="user" name="user" value= /><button type="submit">SEND</button></form>`)
})
})
app.post('/chat',(req,res,next)=>{
let name;
console.log(req.body);
if(req.body.message!==undefined){
    console.log("message: "+ req.body.message);
    if (fs.existsSync('file.txt')) {
        fs.readFile('file.txt','utf8',(err,data)=>{
         console.log(data);
         fs.appendFile('file.txt', " "+req.body.user+ " : "+ req.body.message+" " ,(err=>{if(err){console.log(err);}else{console.log("message appended"); }}))
        })
        }else{
            fs.writeFile('file.txt'," "+ req.body.user+ " : "+req.body.message + " ",(err=>{if(err){console.log(err);}else{console.log("message written");}}))
        } 
}
    res.redirect('/chat')
})
app.listen(5000)