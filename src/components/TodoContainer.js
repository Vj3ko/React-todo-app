import React from "react";
import Todo from "./Todo";
import FilterButton from "./FilterButton"

import { motion, AnimatePresence } from "framer-motion"

import { DragDropContext, Droppable} from "react-beautiful-dnd";

const FILTER_MAP = {
    All: () => true,
    Active: (todo) => !todo.completed,
    Completed: (todo) => todo.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

const container = {
    visible: {
        opacity: 1,
        transition: {
            delayChildren: .25,
            staggerChildren: 0.2,
            when: "beforeChildren"
        }
    },
    hidden: {
        opacity: 0,
        transition: {
            when: "afterChildren"
        }
    }
}

const child = {
    hidden: {height: 0, opacity: 0},
    visible: {
        height: 35,
        opacity: 1,
        transition: {
            delay: .5,
            duration: .5
        }
    }
}

export default function TodoContainer(props) {
    const [filter, setFilter] = React.useState("All")

    const todos = props.todos
        .filter(FILTER_MAP[filter])
        .map((todo, index) => {
            return <Todo
                key={todo.id}
                index={index}
                todo={todo}
                toggleComplete={props.toggleTodo}
                toggleRemove={props.removeTodo}
            />

        })


    const filterList = FILTER_NAMES.map(name => {
        return <FilterButton
            key={name}
            name={name}
            isPressed={name === filter}
            setFilter={setFilter}
        />
    })

    function handleOnDragEnd(result) {
        if(!result.destination) return;
        const items = Array.from(props.todos)
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem)

        props.setTodos(items)
    }

    return (

        <motion.div
            className="todo-container"
        >
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="todos">
                    {(provided)=> (
                        <motion.ul 
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        variants={container}
                        initial="hidden"
                        animate="visible"
                        className="todo-list">

                            <AnimatePresence>
                                {/* displaying rendered Todos  */}
                                {todos}
                            </AnimatePresence>
                            {provided.placeholder}
                        </motion.ul>
                    )}

                </Droppable>
            </DragDropContext>


            <AnimatePresence>
                    {todos.length === 0 && 
                    <motion.span
                    className="todo-none"
                    variants={child}
                    initial="hidden"
                    animate="visible"
                    exit={{opacity: 0,transition: {duration: 1},transitionEnd: {height: 0}}}
                    >You have no {filter === "Completed" ? "completed" : "active"} todos!
                    </motion.span>}
            </AnimatePresence>


            <div className="counter-clear">
                <span className="todo-counter" data-counter>{props.count === 1 ? "1 item left" : props.count + " items left"}</span>
                <div className="filter-btns">
                    {/* displaying rendered filter buttons */}
                    {filterList}
                </div>
                <button
                    className="clear-completed"
                    data-clear
                    onClick={props.clearCompletedTodos}
                >Clear completed</button>
            </div>
        </motion.div>
    )
}