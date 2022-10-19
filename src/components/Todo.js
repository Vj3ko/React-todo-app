import React from "react";
import { motion } from "framer-motion"
import { Draggable } from "react-beautiful-dnd";

import crossImg from "../images/icon-cross.svg"

const child = {
    hidden: { height: 0, opacity: 0 },
    visible: {
        height: 52,
        opacity: 1,
        transition: {
            duration: .5
        }
    }
}


export default function Todo(props) {

    function handleCheckbox() {
        props.toggleComplete(props.todo.id)
    }

    function handleRemove() {
        props.toggleRemove(props.todo.id)
    }

    return (
        <Draggable key={props.todo.id} draggableId={props.todo.id} index={props.index}>
            {(provided, snapshot) => (
                <motion.li
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    style={{
                        userSelect: "none",
                        backgroundColor: snapshot.isDragging ? "rgba(58, 123, 253, 0.3)" : "",
                        ...provided.draggableProps.style
                    }}

                    value={props.todo}
                    variants={child}
                    exit={{ height: 0, opacity: 0, transition: { duration: .5 } }}
                    className={`todo-item ${props.todo.completed ? "completed" : ""}`}>
                    < input
                        type="checkbox"
                        className="todo-item-input"
                        onChange={handleCheckbox}
                        id={props.todo.id}
                        checked={props.todo.completed}
                    />
                    <label className="todo-label" htmlFor={props.todo.id}>
                        <span className="todo-check"></span>
                        <p className="todo-text">{props.todo.text}</p>
                    </label>
                    <button className="todo-delete-button" onClick={handleRemove}>
                        <img
                            className="todo-delete-button-image"
                            src={crossImg}
                            alt="cross icon"
                        />
                    </button>
                </motion.li>
            )}

        </Draggable>
    )
}