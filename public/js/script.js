const newtask =document.querySelector('#newtask');
const addtask = document.querySelector('#addtask');
const tasklist = document.querySelector('.tasklist');


function addToDom(todos)
{
    tasklist.innerText='';
    console.log(todos)
    todos.forEach(element => {
        // 1. create the element
        let li= document.createElement('li');
        //2.update the text inisde the li
        li.innerHTML  = 
        `
        <span class="taskname">${element.name}</span>
        <button  atrid=${element.id} class="upbtn">⬆️</button>
        <button  atrid=${element.id} class="dwnbtn">⬇️</button>
        <button  atrid=${element.id} class="delbtn">❌</button>
        `
        //3.simply append this to the task list
         tasklist.appendChild(li);
        
    });
}

axios.get('/gettodos')
.then((res)=>{
  let todos=res.data;
  addToDom(todos);
})
.catch((err)=>
{
    console.log(err);
})


addtask.addEventListener('click',(ev)=>{
    ev.preventDefault();

    // console.log("you tried to submit the form");  
    axios.post('/addtodo',{
        name: newtask.value
    })
    .then((res)=>{
        let todos = res.data;
         newtask.value='';
        console.log(todos);
        addToDom(todos);
    })
    .catch((err)=>{
        console.log(err);
    })
})





axios.get('/gettodos')
    .then((todos)=>{
        console.log(todos);
    })
    .catch((err)=>{
        console.log(err);
    })
  function deleteTodo(atrid){
    axios.post('/deletetodo',{id:atrid})
    .then((res)=>{
        let todos = res.data;
        console.log(todos)
        addToDom(todos);
    })
    .catch(err=>{
        console.log(err)
    })
  }
    tasklist.addEventListener('click',(ev)=>{
        // console.log(ev);
        // console.log(ev.target);
        let atrid=ev.target.getAttribute('atrid');
        let btnName =ev.target.className;
        console.log(atrid);
        console.log(btnName);
        if(btnName== 'delbtn'){
       deleteTodo(atrid);
    }  
    else if(btnName=='upbtn')
    {
        //increase priority
        axios.get(`/increasepriority?id=${atrid}`)
    .then((res)=>{
        let todos = res.data;
        // console.log(todos)
        addToDom(todos);
    })
    .catch(err=>{
        console.log(err)
    })

    }
    else if(btnName=='dwn btn')
    {
      //decrease priority
      axios.get(`/decreasepriority?id=${atrid}`)
      .then((res)=>{
          let todos = res.data;
          // console.log(todos)
          addToDom(todos);
      })
      .catch(err=>{
          console.log(err)
      })
    }
        })