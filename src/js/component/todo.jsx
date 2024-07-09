import React, { useState } from "react";

const ToDo = () => {

    let [tarea, setTarea] = useState("");
    let [listaTareas, setListaTareas] = useState([]);

    function addTask() {
        let newArr = listaTareas.concat(tarea);
        setListaTareas(newArr);
        setTarea("");
    }

    function agregarTarea(e) {
        if (tarea !== "") {
            if (e.key === "Enter" || e.key === "Tab") {
                addTask();
            }
        }
    }

    function agregarTareaB() {
        if (tarea !== "") {
            addTask();
        }
    }

    return (
        <>
            <h1 className="text-center fw-light">To-Do</h1>
            <div className="card w-12">
                <ul className="list-group list-group-flush">
                    <div className="input-group d-flex">
                        <input className="list-group-item" type="text" placeholder="Type here..." value={tarea} onKeyDown={agregarTarea} onChange={(e) => setTarea(e.target.value)} />
                        <button className="btn list-group-item" type="button" onClick={agregarTareaB} >Add</button>
                    </div>
                    {listaTareas.map((tarea, index) => (
                        <div class="input-group border border-0 rounded-0">
                            <div class="input-group-text rounded-0">
                                <input className="form-check-input" type="checkbox"></input>
                            </div>
                            <li className="list-group-item todo-item form-control rounded-0" key={index}>{tarea}
                                <button
                                    type="button" className="btn-close remove-btn" aria-label="Close"
                                    onClick={() => setListaTareas(listaTareas.filter((t, currentIndex) => index !== currentIndex))}>
                                </button>
                            </li>
                        </div>
                    ))}

                    {listaTareas.length == 0 ?
                        (<label className="list-group-item m-auto text-secondary">No pending tasks</label>) :
                        (<label className="list-group-item m-auto text-secondary">{`${listaTareas.length} task left`}</label>)}
                </ul>
            </div >
        </>
    );
};

export default ToDo;