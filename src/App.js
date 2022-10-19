import React from "react";
import { nanoid } from "nanoid";

//import style
import "./components/scss_components/todo.scss"

//importing Components
import TodoForm from "./components/TodoForm"
import Header from "./components/Header"
import Footer from "./components/Footer"
import TodoContainer from "./components/TodoContainer"



const initialTodoItems = [{
  id: nanoid(),
  text: "take out trash",
  completed: false
},
{
  id: nanoid(),
  text: "schedule a business lunch",
  completed: false
},
{
  id: nanoid(),
  text: "wash the car",
  completed: true
}]



export default function App() {
  const [todos, setTodos] = React.useState(JSON.parse(localStorage.getItem("todos")) || initialTodoItems)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
    setCount(todos.length)
  }, [todos])

  function addTodo(todo) {
    setTodos([todo, ...todos])
  }

  function toggleTodo(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed }
        }
        return todo;
      })
    )
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function clearCompletedTodos() {
    setTodos(todos.filter(todo => todo.completed !== true))
  }

  return (
    <div>
      <Header />
      <main className="main">
        <TodoForm addTodo={addTodo} />
        <TodoContainer
          todos={todos}
          setTodos={setTodos}
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
          clearCompletedTodos={clearCompletedTodos}
          count={count}
        />
        <Footer />
      </main>
    </div>
  );
}

