import React, { useContext } from 'react'
import { TasksListContext } from '../context/TasksListContext';
import Task from './Task';


const TasksList = ({storyId}) => {
    const { tasks } = useContext(TasksListContext);
    const storyTasks = tasks.filter((task) => task.storyId === storyId)
    
    return (
        <div>
        {tasks.length && 
        <div>
            {storyTasks.map(storyTask => (parseInt(storyTask.pointsEmp1) + parseInt(storyTask.pointsEmp2) + parseInt(storyTask.pointsEmp3) + parseInt(storyTask.pointsEmp4)))}
        </div>
        }
        {tasks.length ? (
            <ul>
                {storyTasks.map((task) => {
                    return <Task task={task} key={task.id}/>;
                })}
            </ul>
        ) : (
            <div>No Tasks</div>
        )}
            
        </div>
    );
};

export default TasksList
