import React, { useState, useEffect } from "react";

const ToDo = () => {

    let [tarea, setTarea] = useState("");
    let [listaTareas, setListaTareas] = useState([]);
    let [username, setUsername] = useState("juanelissalde");
    const url = "https://playground.4geeks.com/todo";


    // Inicio fincionalidad Cambio modal -----------------------------------
    const [opened, setOpened] = useState(true);

    // Inicio fincionalidad To-Do -----------------------------------

    function agregarTarea(e) {
        if (tarea !== "") {
            if ((e.key === "Enter" || e.key === "Tab") || e.type == "click") {
                // let newArr = listaTareas.concat(tarea);
                // setListaTareas(newArr);
                // setTarea("");
                fetch(`${url}/todos/${username}`, {
                    method: "POST"
                })
            }
        }
    }

    // Inicio fincionalidades crear usuario -----------------------------------
    const createUser = () => {
        fetch(`${url}/users/${username}`, {
            method: "POST"
        })
            .then((response) => response.json())
            .then((response) => console.log(response))
            .catch(error => console.log(error))
    };

    const getData = () => {
        fetch(`${url}/users/${username}`)
            .then((response) => {
                console.log(response);

                if (response.status == 404) {
                    createUser()
                    return false
                }
                return response.json()
            })
            .then(data => {
                if (data) {
                    setListaTareas(data.todos)
                }
            })
            .catch(error => console.log(error))
        setOpened(false)
    }

    useEffect(() => {
        getData();
    }, []);

    return opened ? (
        <>
            <div className="show">
                <h1 className="text-center">Enter username</h1>
                <form className="d-flex justify-content-center flex-column" onSubmit={(e) => {
                    e.preventDefault()
                    getData()
                }}>
                    <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" className="form-control mt-3 mb-2" placeholder="Type here..." />
                    <button onClick={() => getData()} type="submit" className="btn btn-primary my-4">Change</button>
                </form>
            </div>
        </>
    )
        :
        (
            <>

                <div className="show">
                    <h3 className="wellcome">Wellcome {username}!</h3>
                    <h1 className="text-center fw-light">To-Do</h1>
                    <div className="card w-12">
                        <ul className="list-group list-group-flush">
                            <div className="input-group d-flex">
                                <input className="list-group-item" type="text" placeholder="Type here..." value={tarea} onKeyDown={agregarTarea} onChange={(e) => setTarea(e.target.value)} />
                                <button className="btn list-group-item" type="button" onClick={agregarTarea} >Add</button>
                            </div>
                            {listaTareas && listaTareas.length > 0 ? listaTareas.map((tarea, index) => (
                                <div className="input-group border border-0 rounded-0" key={index}>
                                    <div className="input-group-text rounded-0">
                                        <input className="form-check-input" type="checkbox"></input>
                                    </div>
                                    <li className="list-group-item todo-item form-control rounded-0" key={index}>{tarea.label}
                                        <button
                                            type="button" className="btn-close remove-btn" aria-label="Close"
                                            onClick={() => setListaTareas(listaTareas.filter((t, currentIndex) => index !== currentIndex))}>
                                        </button>
                                    </li>
                                </div>
                            )) :
                            <label className="list-group-item m-auto text-secondary">No pending tasks</label>
                            }
                            <label className="list-group-item m-auto text-secondary">{`${listaTareas.length} task left`}</label>
                        </ul>
                    </div>
                <button className="btn btn-secondary my-5" type="button" onClick={() => setOpened(true)}>Change user</button>
                </div>
            </>
        );
    };

export default ToDo;