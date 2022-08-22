import { useState, useEffect, useRef } from "react";
import "./index.css";
import getTodoData from "./lib/getTodoData";

let testData = { done: false, content: "WOW" };

interface item {
    content: string;
    done: boolean;
}

export default function MainScreen() {
    let [todoItems, setTodoItems] = useState<item[]>([]);
    const addTodoRef = useRef(null);
    useEffect(() => {
        setTodoItems(getTodoData());
        setTodoItems([testData, ...todoItems]);
    }, []);

    const todoCompletation = (e: any) => {
        let index: number = e.target.value;
        const tmpTodoData = todoItems;
        tmpTodoData[index].done = !tmpTodoData[index].done;
        e.target.checked = tmpTodoData[index].done;
        setTodoItems(tmpTodoData);
    };

    const handleDelete = (index: number) => {
        setTodoItems(todoItems.filter((o, i) => index !== i));
    };

    const ShowTodo = () => {
        return (
            <>
                {todoItems.map(function (item, index) {
                    return (
                        <h1>
                            <input
                                value={index}
                                onChange={todoCompletation}
                                type="checkbox"
                            />
                            {item.content}{" "}
                            <button
                                value={index}
                                onClick={() => handleDelete(index)}
                            >
                                delete
                            </button>
                        </h1>
                    );
                })}
            </>
        );
    };

    const handleAdd = (e: any) => {
        e.preventDefault();
        if (addTodoRef.current == null) {
            console.log("ITS NULL");
            return;
        }
        if (addTodoRef.current["value"] == "") {
            return;
        }
        setTodoItems([
            ...todoItems,
            { content: addTodoRef.current["value"], done: false },
        ]);
    };
    const AddItem = () => {
        return (
            <>
                <form onSubmit={handleAdd}>
                    <input type="Text" ref={addTodoRef} />{" "}
                    <input value="Add name" type="submit" />
                </form>
            </>
        );
    };

    return (
        <>
            <h1>Todo List</h1>
            <AddItem />
            <ShowTodo />
        </>
    );
}
