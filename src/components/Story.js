import React, { useContext, useState} from 'react'
import { StoriesListContext } from '../context/StoriesListContext'
import StoriesForm from './StoriesForm';
import { TasksForm } from './TasksForm';

const Story = ({story}) => {
    const { removeStory, findEditStory } = useContext(StoriesListContext);
    const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);

    const handleTasksForm = (isOpen) => {
        setIsTaskFormOpen(isOpen);
    };

    return (
        <li>
            <span>{story.title} : </span>  
            <span>{story.description} : </span>
            <span>{story.points}</span>
            <div>
                <button onClick={() => removeStory(story.id)}>Delete</button>
                <button onClick={() => findEditStory(story.id)}>Edit</button>
                { !isTaskFormOpen && 
                <button onClick={() => handleTasksForm(true)}> 
                Show Tasks
                </button>}
                { isTaskFormOpen && 
                <button onClick={() => handleTasksForm(false)}> 
                Hide Tasks
                </button>}
                { isTaskFormOpen && <TasksForm storyId={story.id}/> }
                
            </div>
        </li>
    )
}

export default Story