import React, { useContext } from 'react'
import { TasksListContext } from '../context/TasksListContext';
import Task from './Task';


const TasksList = () => {
    const { tasks } = useContext(TasksListContext);
    console.log(tasks);
    return (
        <div>
        {tasks.length ? (
            <ul>
                {tasks.map((task) => {
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
