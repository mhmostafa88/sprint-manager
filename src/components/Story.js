import React, { useContext, useState} from 'react'
import { StoriesListContext } from '../context/StoriesListContext'
import StoriesForm from './StoriesForm';
import { TasksForm } from './TasksForm';

const Story = ({story}) => {
    const { removeStory, findEditStory } = useContext(StoriesListContext);
    const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);

    const openTasksForm = () => {
        setIsTaskFormOpen(true);
    };

    return (
        <li>
            <span>{story.title} : </span>  
            <span>{story.description} : </span>
            <span>{story.points}</span>
            <div>
                <button onClick={() => removeStory(story.id)}>Delete</button>
                <button onClick={() => findEditStory(story.id)}>Edit</button>
                <button onClick={openTasksForm}>Add Task</button>
                { isTaskFormOpen && <TasksForm /> }
            </div>
        </li>
    )
}

export default Story
