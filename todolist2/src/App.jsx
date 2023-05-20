
import { useState } from 'react'
import Todo from './components/Todo';
import './App.css'
import TodoForm from './components/TodoForm';
import Search from './components/Search';
import Filter from './components/Filter';

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "ganhar",
      category: "trabalho",
      isCompleted: false,
    },
    {
      id: 2,
      text:"gastar",
      category: "pessoal",
      isCompleted: false,
    },
    {
      id: 3,
      text: "economizar",
      category: "pessoal",
      isCompleted: false,
    }
    ,{
      id: 4,
      text: "investir",
      category: "pessoal",
      isCompleted: false
    },{
      id: 5,
      text: "javascript",
      category: "estudar",
      isCompleted: false
    }
  ]);

  const [search, setSearch] = useState("")

  const [filter, setFilter] = useState("All")

  const [sort, setSort] = useState("Asc")

  const addTodo = (text, category) => {
    const newTodos = [...todos, {
          id: Math.floor(Math.random()*100),
          text, 
          category, 
          isCompleted: false
        }]
        setTodos(newTodos);
      };

      const removeTodo = (id) => {
        const newTodos = [...todos];
        const filteredTodos = newTodos.filter((todo)=>
          todo.id !== id ? todo : null
          );
          setTodos(filteredTodos);
      };

      const completeTodo = (id) => {
        const newTodos = [...todos]
        newTodos.map((todo) => todo.id === id ? todo.isCompleted = !todo.isCompleted : todo
        )
        setTodos(newTodos)
      }
      
  return (
    <>
      <div className='app'>
        <h1>Outra lista de tarefas </h1>
        <Search search={search} setSearch={setSearch} />
        <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
        <div className='todo-list'>
          {todos
          .filter((todo) => filter === "All" 
          ? true 
          : filter === "Completed" 
          ? todo.isCompleted 
          : !todo.isCompleted)

          .filter((todo) => todo.text.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
          
          .sort((a,b) =>
          sort === "Asc"
          ? a.text.localeCompare(b.text)
          : b.text.localeCompare(a.text)
          )
          .map((todo) => (
            <Todo key={todo.id} todo={todo} removeTodo={removeTodo} completeTodo={completeTodo} />
            ))}
        </div>
        <TodoForm addTodo={addTodo} />
      </div>
    </>
  )
}

export default App
