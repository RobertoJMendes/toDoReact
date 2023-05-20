/* eslint-disable react/prop-types */

const Todo = ({ todo, removeTodo, completeTodo }) => {
return (
  <div  className='todo'
        style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
              >
              <div className='content conteudo'>
                <p>{todo.text}</p>
                <p className='category'>{todo.category}</p>
              </div>
              <div className="botoes">
                <button className="complete" onClick={()=>completeTodo(todo.id)}>Completar!</button>
                <button className ="remove" onClick={()=>removeTodo(todo.id)} >Deletar!</button>
              </div>
            </div>
  )
}

export default Todo;