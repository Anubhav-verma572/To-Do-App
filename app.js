const path = require  ('path');
const express = require('express');
const app = express();
const PORT = 5555;
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({extended:true}));
app.use(express.json());   // if we dont write express.json() than we will not get axios post (only post request) part  otherwise axios request could not be read
app.use(express.static(path.join(__dirname,'public')));

let todos=[
];

app.get('/gettodos',(req,res,next)=>{
       res.send(todos);
})

app.post('/addtodo',(req,res,next)=>{
     const {name} = req.body;
     console.log(name); 
     todos.push({
        id:uuidv4(),
        name
     })

     res.redirect('/gettodos');
})

app.post('/deletetodo',(req,res,next)=>{
      const {id} = req.body; 
      todos = todos.filter((task)=>{
        if(task.id==id) return false;
        return true;
      })
      res .redirect('gettodos');
})

app.get('/increasepriority',(req,res)=>
{
   const {id} = req.query;
   console.log(id);
   let indx;
   todos.forEach((e,i)=>{
     if(e.id==id){
      indx = i; 
     }
   })
   console.log( indx);
  let temp = todos[indx];
  todos[indx]=todos[indx-1];
  todos[indx-1]=temp;
res.redirect('/gettodos');
})
app.get('/decreasepriority',(req,res)=>
{
   const {id} = req.query;
   console.log(id);
   let indx;
   todos.foreach((e,i)=>{
     if(e.id==id){
      indx = i; 
     }
   })
   console.log( indx);
  let temp = todos[indx];
  todos[indx]=todos[indx+1];
  todos[indx+1]=temp;
res.redirect('/gettodos');
})

app.listen(PORT,()=>{
    console.log(`http://localhost:`+PORT);
})
