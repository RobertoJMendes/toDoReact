import './App.css';

import { useState, useEffect } from "react";
import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill } from "react-icons/bs";

const API = "http://localhost:5000";

function App() {

  const [title, setTitle] = useState("")
  const [time, setTime] = useState("")
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)

  // carregar - todos - no carregamento da página
  useEffect(() => {

    const loadData = async() => {
      setLoading(true)

      const res = await fetch(API+"/todos")
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err))

        setLoading(false)

        setTodos(res)
    }
    loadData()
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const todo = {
      id: Math.random(),
      title,
      time,
      done: false
    }

    await fetch(API+"/todos",{
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json"
      }
    })
    console.log("enviou!")
    console.log(title)
    console.log(todo)

    setTodos((prevState) => [...prevState, todo])
    // quando se esta trabalhando com useState, temos a opção de utilizar o
    // prevState que é o estado anterior do elemento que se esta trabalhando
    // esta "função" neste caso ajuda no carregamento dos - todos -
    
    setTitle("");
    setTime("");
  }

  const handleDelete = async (id) => {
    await fetch (API+ "/todos/" + id, {
      method: "DELETE",
  });
  // essa parte do código é para "limpar" o front-end, como se ele fizesse uma segunda leitura!
  setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
};

const handleEdit = async (todo) => {  
  todo.done = !todo.done;

  const data = await fetch(API + "/todos/" + todo.id, {
    method: "PUT",
    body: JSON.stringify(todo),
    headers: {
    "Content-Type": "application/json",
  }
  });
  setTodos((prevState) => prevState.map((t) => (t.id === data.id ? (t = data) : t)))
};

  if(loading){
    return <p>carregando!!!</p>
  }

  return (
    <div className="App">
      <div className='todo-header'>
        <h1>React Todo List</h1>
      </div>
      <div className='form-todo'>
        <h2> Insira sua próxima tarefa: </h2>
        <form onSubmit={handleSubmit} className='form'>

          <div className='form-control'>
          <label htmlFor='title'> o que vc vai fazer? </label>
          <input 
          className='input-title'
          type='text' 
          name='title' 
          placeholder='Titulo da tarefa'
          onChange={(e) => setTitle(e.target.value)}
          value={title || ""}
          required /* este required é obrigatório*/ />
          </div>

          <div className='form-control'>
          <label htmlFor='time'> Duração: </label>
          <input 
          className='input-time'
          type='text' 
          name='time' 
          placeholder='tempo estimado!'
          onChange={(e) => setTime(e.target.value)}
          value={time || ""}
          required /* este required é obrigatório*/ />
          </div>

          <input type='submit' value="enviar tarefa!" />
        </form>
      </div>
      <div className='list-todo'>
        <h2>Listas</h2>
        {todos.length === 0 && <p> Não existem tarefas! </p>}
        {todos.map((todo) => (
          <div className='todo' key={todo.id}>
            <h3 className={todo.done ? "todo-done" : ""} > {todo.title} </ h3>
            <p> Duração: {todo.time} </p> 
            <div className='actions'>
            <span onClick={() => handleEdit(todo)}>
            {!todo.done ? <BsBookmarkCheck /> : <BsBookmarkCheckFill />}
            </span>
            <BsTrash onClick={()=>handleDelete(todo.id)} />  
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
