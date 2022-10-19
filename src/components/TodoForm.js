import React from "react";
import { nanoid } from "nanoid";

export default function TodoForm(props) {

    const [todo, setTodo] = React.useState(
        {
            id: "",
            text: "",
            completed: false
        }
    )

    function handleChangeOnInput(e) {
        setTodo({...todo, text: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault()
        if(todo.text.trim()) {
            props.addTodo({...todo, id: nanoid()})
            setTodo({...todo, text: ""})
            
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <label
                ><input
                        type="text"
                        placeholder="Create a new todo..."
                        className="todo-input"
                        autoFocus
                        value={todo.text}
                        onChange={handleChangeOnInput}
                />
            </label>
        </form>
    )
}