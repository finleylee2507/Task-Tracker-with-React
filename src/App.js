import { useState, useEffect } from "react"; //hook stuff
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
function App() {

  const [showAddTask, setShowAddTask] = useState(false) //initialize as false 

  const [tasks, setTasks] = useState(
    [
    ]
  )

  useEffect(() => { //fire when the page is loaded 


    getTasks()
  }, [])


  const getTasks = async () => {
    const tasksFromServer = await fetchTasks() //await unwraps a promise 
    setTasks(tasksFromServer) //populate the task array with items returned 

  }


  //fetch all of the tasks from 'backend' server 
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  //fetch a single task from the server 
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }


  //Add task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    // const id=Math.floor(Math.random()*100000)+1 //generate a random id 
    // const newTask={id,...task} //add the id as a new property 
    // console.log(newTask)
    setTasks([...tasks, data])

  }

  //Delete Task
  const deleteTask = async (id) => {

    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'Delete' })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  //toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json();
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } //spread notation
      : task))

  }

  return (
    <Router>

      <div className="container">
        <Header title="Task Tracker" onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />

        {/* only render the addtask form and the tasks when the route is / */}
        <Route path='/' exact render={(props) => (<>
          {/* toggle the onAdd component  */}
          {showAddTask && <AddTask onAdd={addTask} />}
          {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No task to show'}
        </>)

        }></Route>
        <Route path='/about' component={About}></Route>

        {/* display the footer component  */}
        <Footer /> 
      </div>

    </Router>

  );
}



export default App;
