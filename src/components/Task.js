import React, { useContext, useState} from 'react'
import { StyledButton } from '../App.style';
import { TasksListContext } from '../context/TasksListContext';
import { StoryContainer } from './Story.style';
import { TasksForm } from './TasksForm';
import { TaskContainer } from './TasksList.style';

const Task = ({ task, handleIsFormOpen }) => {
    const { removeTask, findEditTask } = useContext(TasksListContext);
    const taskPoints = parseInt(task.pointsEmp1) + parseInt(task.pointsEmp2) + parseInt(task.pointsEmp3) + parseInt(task.pointsEmp4);

const handleLocalIsFormOpen = (isOpen, taskId) => {
    handleIsFormOpen(isOpen);
    findEditTask(taskId);
    
}

    return (
        <>
        <TaskContainer>
        <div className="header">
            <div className="task__title">{task.title}</div>
            <StyledButton className="btn--small" color={'red'} onClick={() => removeTask(task.id)}>Delete Task</StyledButton>
            <StyledButton className="btn--small" onClick={() => handleLocalIsFormOpen(true, task.id)}>Edit Task</StyledButton>
            </div>
            <div className="task__description">{task.description}</div>
            <div className="task__points__Container">
                <div className="task__points__Card">
                <div>Ibrahim</div><div> {task.pointsEmp1} points</div>
                </div>
                <div className="task__points__Card">
                <div>Lorand</div><div>{task.pointsEmp2} points</div>
                </div>
                <div className="task__points__Card">
                <div>Mahmoud</div><div>{task.pointsEmp3} points</div>
                </div>
                <div className="task__points__Card">
                <div>Ahmad</div><div>{task.pointsEmp4} points</div>
                </div>
            </div>
            
        </TaskContainer>
        </>
    )
}

export default Task
