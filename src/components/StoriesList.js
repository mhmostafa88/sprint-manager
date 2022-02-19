import React, { useCallback, useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Calender from "./calender";
import moment from "moment";
import { StoriesListContainer, SummaryCard } from "./StoriesList.style";
import Story from "./Story";
import { FaCalendar } from "react-icons/fa";
import { StyledButton } from "../App.style";
import BurnDownChart from "./BurnDownChart";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import StoriesForm from "./StoriesForm";
import { styled } from "@mui/material/styles";
// import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Tooltip from "./tooltip/Tooltip";

Chart.register(CategoryScale);

const StoriesList = () => {
  const { stories, storyToEdit } = useContext(GlobalContext);
  const [showSprintPeriodForm, setShowSprintPeriodForm] = useState(false);
  const today = moment();
  const [sprintStartDate, setSprintStartDate] = useState(
    moment(JSON.parse(localStorage.getItem("sprintStartDate")) || "")
  );
  const [sprintEndDate, setSprintEndDate] = useState(
    moment(JSON.parse(localStorage.getItem("sprintEndDate")) || "")
  );
  const [sprintDaysCount, setSprintDaysCount] = useState(
    sprintEndDate.diff(sprintStartDate, "days")
  );

  const completedStoryPoints = stories.reduce(function (acc, curr) {
    return acc + curr.completedPoints;
  }, 0);

  const storyPoints = useCallback(
    stories.reduce(function (acc, curr) {
      return acc + curr.points;
    }, 0),
    [stories]
  );

  const toggleShowSprintPeriodForm = () => {
    setShowSprintPeriodForm(!showSprintPeriodForm);
  };

  useEffect(() => {
    setSprintDaysCount(sprintEndDate.diff(sprintStartDate, "days"));
    // store the sprint start date and the end date
    localStorage.setItem("sprintStartDate", JSON.stringify(sprintStartDate));
    localStorage.setItem("sprintEndDate", JSON.stringify(sprintEndDate));
  }, [sprintStartDate, sprintEndDate, storyPoints]);

  const getAvgCompleted = () => {
    return (
      completedStoryPoints /
      today.diff(sprintStartDate, "days").toFixed(1)
    );
  };

  const getReqCompleted = () => {
    return (storyPoints / sprintDaysCount).toFixed(1);
  };

  const getPercentageCompleted = () => {
    return Math.floor((completedStoryPoints / storyPoints) * 100);
  };

  var enumerateDaysBetweenDates = function (startDate, endDate) {
    var dates = [];

    var currDate = moment(startDate).startOf("day");
    var lastDate = moment(endDate).startOf("day");

    currDate.subtract(1,"days")

    while (currDate.add(1, "days").diff(lastDate,"days") < 1) {
      dates.push(currDate.clone().format("MM/DD/YY"));
    }

    return dates;
  };

  var enumerateStoryPointsBetweenDates = function () {
    var currentPoints = storyPoints;
    var points = [];

    const requiredPointsPerDay = getReqCompleted();
    while (currentPoints > 0) {
      points.push(currentPoints);
      currentPoints = currentPoints - requiredPointsPerDay;
    }
    return points;
  };

  var enumerateCompletedStoryPointsBetweenDates = function (startDate) {
    

    var points = [];
    
    const requiredPointsPerDay =
      completedStoryPoints / (today.diff(startDate, "days").toFixed(1) - 1);
    var currentPoints = storyPoints;
    var currDate = moment(startDate);

    while (currentPoints > 0 && today.diff(currDate, "days") > 0) {
      points.push(currentPoints);
      currentPoints = currentPoints - requiredPointsPerDay;
      currDate = currDate.add(1, "days");
    }
    return points;
  };

  const labels = enumerateDaysBetweenDates(sprintStartDate, sprintEndDate);
  const datasetBar = enumerateStoryPointsBetweenDates();
  const datasetLine =
    enumerateCompletedStoryPointsBetweenDates(sprintStartDate);
    
  const data = {
    labels: labels,
    datasets: [
      {
        type: "line",
        label: "Actual remaining points",
        borderColor: "hsl(250, 56%, 92%)",
        borderWidth: 1,
        fill: true,
        data: datasetLine,
      },
      {
        type: "bar",
        label: "Expected Remaining points",
        backgroundColor: "hsl(250, 24%, 48%)",
        data: datasetBar,
        borderWidth: 2,
      },
    ],
  };

  return (
    <StoriesListContainer>
      <h2>Sprint Summary</h2>

      <div className="Sprint-Options">
        <Tooltip
          content="click to specify the start date and end date of the sprint"
          direction="right"
        >
          <StyledButton onClick={toggleShowSprintPeriodForm}>
            <FaCalendar />
            Set Sprint Date Range
          </StyledButton>
        </Tooltip>
      </div>
      {showSprintPeriodForm && (
        <div className="CalenderSectionContainer">
          <div className="CalenderContainer">
            <div>Start Date: {sprintStartDate.format("MM/DD/YY")}</div>
            <Calender value={sprintStartDate} onChange={setSprintStartDate} />
          </div>
          <div className="CalenderContainer">
            <div>End Date: {sprintEndDate.format("MM/DD/YY")}</div>
            <Calender value={sprintEndDate} onChange={setSprintEndDate} />
          </div>
        </div>
      )}

      <div className="sprint-summary">
        <SummaryCard color={""}>
          <h4>Total Points</h4>
          <span className="card-body">
            {completedStoryPoints > 0
              ? `${completedStoryPoints}/${storyPoints}`
              : storyPoints}
          </span>
        </SummaryCard>
        <SummaryCard color={getPercentageCompleted() > 80 ? "green" : "white"}>
          <h4>Percentage Completed</h4>
          <span className="card-body">
            {getPercentageCompleted()}
            {"%"}
          </span>
        </SummaryCard>
        <SummaryCard color={""}>
          <h4>Required Points/day</h4>
          <span className="card-body">{getReqCompleted()}</span>
        </SummaryCard>
        <SummaryCard
          color={getAvgCompleted() > getReqCompleted() ? "green" : "red"}
        >
          <h4>Average Completed Points/day</h4>
          <span className="card-body">{getAvgCompleted()}</span>
        </SummaryCard>
      </div>

      <BurnDownChart data={data} />

      <h2>Stories List</h2>

      <StoriesForm isVisibleFoEdit={!!storyToEdit} />

      {stories.length ? (
        <div>
          {stories.map((story) => {
            return <Story story={story} key={story._id} />;
          })}
        </div>
      ) : (
        <div>No Stories</div>
      )}
    </StoriesListContainer>
  );
};

export default StoriesList;
