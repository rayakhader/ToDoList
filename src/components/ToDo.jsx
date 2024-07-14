import { useEffect, useRef, useState } from 'react'
import toDoIcon from '../assets/todo_icon.png'
import ToDoItems from './ToDoItems'
const ToDo = () => {
    const[todoList,setTodoList]=useState(localStorage.getItem("todos")?JSON.parse(localStorage.getItem("todos")):[])
    const inputRef = useRef()
    const add =()=>{
        const inputText = inputRef.current.value.trim()
        if(inputText===""){
            return null;
        }
        const newToDo ={
            id : Date.now(),
            text :inputText,
            isComplete:false,
        }
        setTodoList((prev)=>[...prev,newToDo]);
        inputRef.current.value="";
    }
    const deleteTodo =(id)=>{
        setTodoList((prevTodos)=>{
           return prevTodos.filter((todo)=> todo.id !== id)
        })
    }
    const toggle =(id)=>{
        setTodoList((prevTodos)=>{
           return prevTodos.map((todo)=>{
                if(todo.id===id){
                    return {...todo, isComplete: !todo.isComplete}
                }
                return todo;
            })
        })
    }
    useEffect(()=>{
        localStorage.setItem("todos",JSON.stringify(todoList))
    },[todoList])
  return (
    <div className="bg-pink-100 place-self-auto w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
        <div className="flex items-center mt-7 gap-2 ">
            <img src={toDoIcon} alt="" className='w-8' />
            <h1 className="text-3xl font-semibold">To-Do List</h1>
        </div>

        <div className='flex items-center my-7 bg-gray-200 rounded-full'>
            <input className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" ref={inputRef} placeholder='Add your task'  />
            <button onClick={add} className='border-none rounded-full bg-pink-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'>ADD +</button>
        </div>

        <div>
            {todoList.map((item,index)=>{
                return <ToDoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle} />
            })}
        </div>
      
    </div>
  )
}

export default ToDo
