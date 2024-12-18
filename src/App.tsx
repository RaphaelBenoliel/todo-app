import { useEffect, useState } from 'react'
import Header from './components/Header'
import Tabs from './components/Tabs'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

function App() {
  const [todos, setTodos] = useState([
    { input: 'First task to do', completed: true },
  ])
  const [selectedTab, setSelectedTab] = useState('Active');

  const handleAddTodo = (input: string) => {
    const newTodos = [...todos, { input, completed: false }]
    setTodos(newTodos) 
    handleSaveData(newTodos)

  }

  const handleCompleteTodo = (index: number) => {
    const newTodoList = [...todos]
    const completedTodo = todos[index]
    completedTodo['completed'] = true
    newTodoList[index] = completedTodo
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }

  const handleIncompleteTodo = (index: number) => {
    const newTodoList = [...todos]
    const incompleteTodo = todos[index]
    incompleteTodo['completed'] = false
    newTodoList[index] = incompleteTodo
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }

  const handleClearCompleted = () => {
    const newTodoList = todos.filter(todo => !todo.completed)
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }

  const handleDeleteTodo = (index: number) => {
    const newTodoList = todos.filter((_val, valIndex) => {
      return valIndex !== index
    })
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }
  
  const handleEditTodo = (index: number, newInput: string) => {
    const newTodoList = [...todos]
    newTodoList[index].input = newInput
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }
  const handleSaveData = (currTodos: { input: string; completed: boolean }[]) => {
    localStorage.setItem('todo-app', JSON.stringify({ todos: currTodos }))  }

    useEffect(() => {
      if (!localStorage || !localStorage.getItem('todo-app')) { return }
      const item = localStorage.getItem('todo-app');
      if (!item) return;
      const db: { todos: { input: string; completed: boolean }[] } = JSON.parse(item);
      setTodos(db.todos)
    }, [])
  

  return (
    <>
    <Header todos={todos}/>
    <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab}  todos={todos}/>
    <TodoList handleEditTodo={handleEditTodo} handleCompleteTodo={handleCompleteTodo} handleIncompleteTodo={handleIncompleteTodo} handleDeleteTodo={handleDeleteTodo} handleClearCompleted={handleClearCompleted} selectedTab={selectedTab} todos={todos}/>
    <TodoInput handleAddTodo={handleAddTodo}/>

    </>
  )
}

export default App