import { useState } from 'react';

function TodoInput(props : any) {
    const { handleAddTodo } = props;
    const [input, setInput] = useState('');
  return (
    <div className='input-container'>
        <input 
            value={input} 
            onChange={(e)=> {setInput(e.target.value)}}
            placeholder='Add task'/>
        <button onClick={ () => {
            if (!input) {return} handleAddTodo(input)
            setInput('')
        }}>
            <i className="fa-solid fa-plus" ></i>
        </button>
    </div>
  )
}


export default TodoInput
