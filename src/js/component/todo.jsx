import React, { useState, useEffect } from "react";

const ToDo = () => {
    let [tarea, setTarea] = useState("");
    let [listaTareas, setListaTareas] = useState([]);
    let [username, setUsername] = useState("juanelissalde");
    const url = "https://playground.4geeks.com/todo";

    const [opened, setOpened] = useState(true);

    function agregarTarea(e) {
        if (tarea !== "") {
            if ((e.key === "Enter" || e.key === "Tab") || e.type === "click") {
                const newTask = { label: tarea, done: false };
                fetch(`${url}/todos/${username}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newTask)
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("Failed to add task");
                        }
                        return response.json();
                    })
                    .then((createdTask) => {
                        setListaTareas([...listaTareas, createdTask]);
                        setTarea("");
                    })
                    .catch(error => console.log(error));
            }
        }
    }

    function eliminarTarea(taskId, index) {
        fetch(`${url}/todos/${taskId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(() => {
                const updatedTasks = listaTareas.filter((_, i) => i !== index);
                setListaTareas(updatedTasks);
            })
            .catch(error => console.log(error));
    }

    function limpiarTareas() {
        fetch(`${url}/users/${username}`, {
            method: "DELETE"
        })
            .then(() => {
                setListaTareas([]);
                getData();
            })
            .catch(error => console.log(error));
    }

    const createUser = () => {
        fetch(`${url}/users/${username}`, {
            method: "POST"
        })
            .then((response) => response.json())
            .then((response) => console.log(response))
            .catch(error => console.log(error));
    };

    const getData = () => {
        fetch(`${url}/users/${username}`)
            .then((response) => {
                if (response.status === 404) {
                    createUser();
                    return false;
                }
                return response.json();
            })
            .then(data => {
                if (data && data.todos) {
                    setListaTareas(data.todos);
                }
            })
            .catch(error => console.log(error));
        setOpened(false);
    };

    useEffect(() => {
        getData();
    }, []);

    return opened ? (
        <>
            <div className="show">
                <h1 className="text-center">Enter username</h1>
                <form className="d-flex justify-content-center flex-column" onSubmit={(e) => {
                    e.preventDefault();
                    getData();
                }}>
                    <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" className="form-control mt-3 mb-2" placeholder="Type here..." />
                    <button type="submit" className="btn btn-primary my-4">Change</button>
                </form>
            </div>
        </>
    ) : (
        <>
            <div className="show">
                <h3 className="welcome">Welcome {username}!</h3>
                <h1 className="text-center fw-light">To-Do</h1>
                <div className="card w-12">
                    <ul className="list-group list-group-flush">
                        <div className="input-group d-flex">
                            <input className="list-group-item" type="text" placeholder="Type here..." value={tarea} onKeyDown={agregarTarea} onChange={(e) => setTarea(e.target.value)} />
                            <button className="btn list-group-item" type="button" onClick={agregarTarea}>Add</button>
                        </div>
                        {listaTareas && listaTareas.length > 0 ? listaTareas.map((tarea, index) => (
                            <div className="input-group border border-0 rounded-0" key={tarea.id}>
                                <div className="input-group-text rounded-0">
                                    <input className="form-check-input" type="checkbox" />
                                </div>
                                <li className="list-group-item todo-item form-control rounded-0">{tarea.label}
                                    <button
                                        type="button" className="btn-close remove-btn" aria-label="Close"
                                        onClick={() => eliminarTarea(tarea.id, index)}>
                                    </button>
                                </li>
                            </div>
                        )) : (
                            <label className="list-group-item m-auto text-secondary">No pending tasks</label>
                        )}
                        <label className="list-group-item m-auto text-secondary">{`${listaTareas.length} tasks left`}</label>
                    </ul>
                </div>
                <button className="btn btn-danger my-2 mt-4" type="button" onClick={limpiarTareas}>Clean all tasks</button>
                <button className="btn btn-secondary my-3" type="button" onClick={() => setOpened(true)}>Change user</button>
            </div>
        </>
    );
};

export default ToDo;
