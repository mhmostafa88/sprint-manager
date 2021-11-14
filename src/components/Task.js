import React, { useContext, useState} from 'react'
import { TasksListContext } from '../context/TasksListContext';
import { TasksForm } from './TasksForm';

const Task = ({task}) => {
    const { removetask, findEdittask } = useContext(TasksListContext);
    const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);

    const handleTasksForm = (isOpen) => {
        setIsTaskFormOpen(isOpen);
    };

    return (
        <li>
            <span>{task.title} : </span>  
            <span>{task.description} : </span>
            <span>{task.pointsEmp1} :</span>
            <span>{task.pointsEmp2} :</span>
            <span>{task.pointsEmp3} :</span>
            <span>{task.pointsEmp4} :</span>
            <div>
                <button onClick={() => removetask(task.id)}>Delete</button>
                <button onClick={() => findEdittask(task.id)}>Edit</button>
            </div>
        </li>
    )
}

export default Task
