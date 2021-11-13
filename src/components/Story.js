import React, { useContext} from 'react'
import { StoriesListContext } from '../context/StoriesListContext'

const Story = ({story}) => {
    const { removeStory, findEditStory } = useContext(StoriesListContext)

    

    return (
        <li>
            <span>{story.title} : </span>  
            <span>{story.description} : </span>
            <span>{story.points}</span>
            <div>
                <button onClick={() => removeStory(story.id)}>Delete</button>
                <button onClick={() => findEditStory(story.id)}>Edit</button>
            </div>
        </li>
    )
}

export default Story
