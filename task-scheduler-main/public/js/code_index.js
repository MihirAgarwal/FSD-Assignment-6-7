var tasks_div = document.getElementById("tasks_div");

function fill_tasks()  
{
    axios.get("http://localhost:3005/api/v1/tasks")
    .then((response)=>
    {
        let tasks = response.data.tasks;
        console.log(tasks);

        for(i=0;i<tasks.length;i++)
        {
            make_divs(tasks[i]);
        }
    })
    .catch((err)=>
    {
        console.log(err);
    })
    
}


function make_divs(task)
{
    console.log(task);
    const div_class_name = "single_task"
    const right_class = "right_class"
    const id = task._id;
    console.log(id);
    tasks_div.innerHTML += "<div class="+div_class_name+" id="+id+">"
                            +task.name+
                            "<button class=" + right_class + " id="+ id +" onclick=update_task(this.id)>UPDATE</button>"+
                            "<button class=" + right_class + " id="+ id +" onclick=delete_task(this.id)>DELETE</button>"+
                            "</div>";
    if(task.completed==true)
    {
        const div = document.getElementById(id);
        div.style.backgroundColor="#ADFF2F";
    }
}


$(document).ready(()=>{
    fill_tasks();
})

function post_task()
{
    const name = document.getElementsByClassName("task_bar")[0].value;
    console.log(name);
    const obj =  {"name": name,"completed": false};

    axios.post('http://localhost:3005/api/v1/tasks',obj)
      .then(function (response) {
          console.log(response);
          make_divs(response.data.new_task);
          document.getElementsByClassName("task_bar")[0].value="";
      })
      .catch(function (error) {
        console.log(error);
      });

}

function delete_task(id)
{
    console.log(id);
    const element = document.getElementById(id);
    console.log(element);
    
    axios.delete("http://localhost:3005/api/v1/tasks/"+id)
    .then((response) => {
        console.log(response);
        element.remove();
      })
      .catch((err)=>{
        console.log(err);
      })
      
  

}

function update_task(id)
{
    localStorage.clear();
    console.log(id);
    localStorage.setItem('task_id',id);
    url = 'http://127.0.0.1:5500/public/page_2.html';
    window.document.location = url;
}