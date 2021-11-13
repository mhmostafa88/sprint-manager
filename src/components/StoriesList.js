import React, { useContext } from 'react'
import { StoriesListContext } from '../context/StoriesListContext'
import Story from './Story';

const StoriesList = () => {
    const { stories } = useContext(StoriesListContext);
    return (
        <div>
        {stories.length ? (
            <ul>
                {stories.map((story) => {
                    return <Story story={story} key={story.id}/>;
                })}
            </ul>
        ) : (
            <div>No Tasks</div>
        )}
            
        </div>
    );
};

export default StoriesList
