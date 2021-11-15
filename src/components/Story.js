import React, { useContext, useState} from 'react'
import { StyledButton } from '../App.style';
import { StoriesListContext } from '../context/StoriesListContext'
import { TasksListContext } from '../context/TasksListContext';
import StoriesForm from './StoriesForm';
import { StoryContainer } from './Story.style';
import { TasksForm } from './TasksForm';
import TasksList from './TasksList';

const Story = ({story}) => {
    const { removeStory, findEditStory } = useContext(StoriesListContext);
    const { removeTask, tasks, setTasks } = useContext(TasksListContext);
    const [ isTaskListOpen, setIsTaskListOpen ] = useState(false)
    const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);

    const handleDelete = (storyId) => {
        console.log("story id that should be deleted: " + storyId)
        removeStory(storyId);
        const tempTasks = tasks.filter((task) => 
            task.storyId !== storyId
        )
        setTasks(tempTasks);
    }
    const handleTasksForm = (isOpen) => {
        setIsTaskFormOpen(isOpen);
    };

    const handleTaskList = (isOpen) => {
        setIsTaskListOpen(isOpen);
    };

    const handleIsFormOpen = (IsFormOpen) => {
        setIsTaskFormOpen(IsFormOpen);
      }

    console.log({story});
    console.log("story id : " + story.id);

    return (
        <StoryContainer>
        <div className="header">
            <h3>{story.title} ({story.points} points)</h3> 
            
            <div className="action-btns-container">
            <StyledButton className="btn--small" color={'red'} onClick={() => handleDelete(story.id)}>Delete Story</StyledButton>
                <StyledButton className="btn--small" onClick={() => findEditStory(story.id)}>Edit Story</StyledButton>
                

                { !isTaskListOpen && 
                <StyledButton className="btn--small" onClick={() => handleTaskList(true)}> 
                Show Tasks
                </StyledButton>}
                
                { isTaskListOpen && 
                <StyledButton className="btn--small" onClick={() => handleTaskList(false)}> 
                Hide Tasks
                </StyledButton>}

                {!isTaskFormOpen && <StyledButton className="btn--small" color={'green'} onClick={() => handleIsFormOpen(true)}> 
                Add Tasks
                </StyledButton>
                }
                
            </div>
            </div>
            <p>{story.description}</p>
            
                { isTaskFormOpen && <TasksForm storyId={story.id} handleIsFormOpen={handleIsFormOpen}/> }
                { isTaskListOpen && <TasksList storyId={story.id} handleIsFormOpen={handleIsFormOpen}/> }
                
        </StoryContainer>
        
    )
}

export default Story
