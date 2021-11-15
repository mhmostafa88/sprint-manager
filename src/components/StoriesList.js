import React, { useContext } from "react";
import { StoriesListContext } from "../context/StoriesListContext";
import { StoriesListContainer, SummaryCard } from "./StoriesList.style";
import Story from "./Story";

const StoriesList = () => {
  const { stories } = useContext(StoriesListContext);

  const storyPoints = stories.reduce(function (acc, curr) {
    return acc + curr.points;
  }, 0);

  return (
    <StoriesListContainer>
      <h2>Sprint Summary</h2>
      <div className="sprint-summary">
        <SummaryCard color={""}>
          <h4>Total Points</h4>
          <span className="card-body">{storyPoints}</span>
        </SummaryCard>
        <SummaryCard color={"red"}>
          <h4>Sprint Risk</h4>
          <span className="card-body">{storyPoints}</span>
        </SummaryCard>
        <SummaryCard color={""}>
          <h4>Average Points/day</h4>
          <span className="card-body">{storyPoints}</span>
        </SummaryCard>
        <SummaryCard color={"green"}>
          <h4>Issues/Road blocks</h4>
          <span className="card-body">{storyPoints}</span>
        </SummaryCard>
      </div>
      <h2>Stories in this sprint</h2>

      {stories.length ? (
        <ul>
          {stories.map((story) => {
            return <Story story={story} key={story.id} />;
          })}
        </ul>
      ) : (
        <div>No Tasks</div>
      )}
    </StoriesListContainer>
  );
};

export default StoriesList;
