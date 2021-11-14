import React, { useContext, useState} from 'react'
import { TasksListContext } from '../context/TasksListContext';
import { TasksForm } from './TasksForm';

const Task = ({ task }) => {
    const { removeTask, findEditTask } = useContext(TasksListContext);
    

    return (
        <>
        <div>
            Task Points: {parseInt(task.pointsEmp1) + parseInt(task.pointsEmp2) + parseInt(task.pointsEmp3) + parseInt(task.pointsEmp4)}
        </div>
        <li>
            <span>{task.title} : </span>  
            <span>{task.description} : </span>
            <span>{task.pointsEmp1} :</span>
            <span>{task.pointsEmp2} :</span>
            <span>{task.pointsEmp3} :</span>
            <span>{task.pointsEmp4} :</span>
            <div>
                <button onClick={() => removeTask(task.id)}>Delete</button>
                <button onClick={() => findEditTask(task.id)}>Edit</button>
            </div>
        </li>
        </>
    )
}

export default Task
