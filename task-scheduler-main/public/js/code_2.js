
const id_field = document.getElementsByClassName("ID")[0];
const enter_task_name = document.getElementsByClassName("enter_task_name")[0];
const completed = document.getElementsByClassName("check")[0];

function fetch_and_set()
{
    let id = localStorage.getItem('task_id')
    axios.get("http://localhost:3005/api/v1/tasks/"+id)
    .then((response)=>
    {
        task = response.data.document[0];
        
        id_field.innerHTML+=task._id;
        enter_task_name.value=task.name;

        if(task.completed==true) completed.checked=true;
        else completed.checked=false;

        console.log(task);
    })
    .catch((err)=>
    {
        console.log(err);
    })
}

$(document).ready(()=>{
    fetch_and_set();
})


function home_screen()
{
    url = "http://127.0.0.1:5500/public/index.html";
    window.document.location = url;
}

function update_data()
{
    let id = localStorage.getItem('task_id')
    axios.patch("http://localhost:3005/api/v1/tasks/"+id,{"_id":id,"name":enter_task_name.value,"completed":completed.checked})
    .then((response)=>
    {
        console.log(response.data);
    })
    .catch((err)=>
    {
        console.log(err);
    })
}