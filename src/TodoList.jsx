import React, { useEffect, useState } from 'react'

function TodoList() {

    function getStoredTodos(){
        let data = localStorage.getItem("todos")
        let json = JSON.parse(data)
        if(json){
            return json
        }
        return []
    }

    const [todos, setTodos] = useState(getStoredTodos());

    useEffect(() => {
        localStorage.setItem("todos", JSON. stringify(todos))
    }, [todos])

    const handleSubmit = (e) => {
        e.preventDefault();

        let task = e.target.task.value

        if(!task){
            alert ("Please provide a valid task")
            return
        }

        setTodos([...todos , {task: task, completed:false }])

        e.target.reset();
    }

        const changeTaskStatus = (index) => {
            let newTodos = [...todos]
            newTodos[index].completed = !newTodos[index].completed
            setTodos(newTodos);
        }

        const deleteTask = (index) => {
            let newTodos = [...todos]
            newTodos.splice(index, 1)
            setTodos(newTodos);
        }


  return (
    <div className='container-1 my-5 d-flex '>
        <div className='mx-auto rounded border p-4' style={{width:"600px", backgroundColor:"#08618d"}}>
            <h2 className='text-white text-center mb-5'>My Todo List</h2>
       
            <form className="container-2 d-flex" onSubmit={handleSubmit}>
                <input className="form-control me-2"  placeholder="New Task" name='task'/>
                <button className="btn btn-outline-light" type="submit">Add</button>
            </form>

            {todos.map((todo, index) => {
                return(
                        <div key={index} className='rounded mt-4 p-2 d-flex' 
                        style={{backgroundColor: todo.completed ? "#87FC68" : "LightGray"}}> 

                            <div className='me-auto'>
                                { todo.task}
                            </div>

                            <div>
                                <i className={ "h5 me-2 " + (todo.completed ? 'bi bi-check-square' : "bi bi-square") }
                                style={{cursor: "pointer"}} onClick={() => changeTaskStatus(index)}></i>
                                <i className='bi bi-trash text-danger h5'
                                style={{cursor: "pointer"}} onClick={() => deleteTask (index)}></i>
                            </div>
                        </div>
                )})}
        </div>
    </div>
  )
}

export default TodoList