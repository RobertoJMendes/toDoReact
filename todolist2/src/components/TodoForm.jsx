
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const TodoForm = ({ addTodo }) => {
    const [value, setValue] = useState ("")
    const [category, setCategory] = useState("")

    const handleSubmit = (e) => {
      e.preventDefault()
      if(!value || !category)
      return;
      addTodo(value, category);
      setValue("");
      setCategory("");
    }

  return (
    <div className='todo-form'> 
    <h2> Criar Tarefa: </h2>
    <form className='form' onSubmit={handleSubmit}>
      <input 
      type='text' 
      placeholder='Digite o título' 
      value={value}
      onChange={(e) => setValue(e.target.value)} />

      <select 
      onChange={(e => setCategory(e.target.value))} 
      value={category}
      >
        <option value=""> Selecione uma Categoria</option>
        <option value="trabalho"> trabalho </option>
        <option value="pessoal"> pessoal </option>
        <option value="estudos"> estudar </option>
      </select>
      <button type='submit'>Criar Tarefa!</button>
    </form>
    </div>
  )
}

export default TodoForm;