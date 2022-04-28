import React, { useEffect, useState } from "react";

const TodoItem = (props) => {
    const { emitDeleteTodoItem } = props;
    const [todoItem, setTodoItem] = useState(props.data);
    const [isDirty, setDirty] = useState(false);

    useEffect(() => {
        if (isDirty) {
            fetch(`http://localhost:8080/api/todoItems/${todoItem.id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(todoItem),
            })
                .then((response) => response.json())
                .then((data) => {
                    setDirty(false);
                    setTodoItem(data);
                });
        }
    }, [todoItem, isDirty]);

    useEffect(() => {

    }, [todoItem])

    function deleteTodoItem() {
        fetch(`http://localhost:8080/api/todoItems/${todoItem.id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((response) => {
                emitDeleteTodoItem(todoItem);
            });
    }

    return (
        <div>
            <input
                type="checkbox"
                checked={todoItem.isDone}
                onChange={() => {
                    setDirty(true);
                    setTodoItem({ ...todoItem, isDone: !todoItem.isDone });
                }}
            />
            {
                todoItem.isDone ? <span style={{ textDecoration: "line-through" }}>{todoItem.task}</span>
                    :
                    <input
                        type="text"
                        value={todoItem.task}
                        onChange={(e) => {
                            setDirty(true);
                            setTodoItem({ ...todoItem, task: e.target.value });
                        }} />
            }
            <span style={{ marginLeft: "1rem", cursor: "pointer" }} onClick={() => deleteTodoItem(todoItem)}>❌</span>
        </div>
    );
};

export default TodoItem;