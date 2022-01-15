import React, { useContext, useEffect, useState } from 'react';
import { StoriesListContext } from '../context/StoriesListContext';
import Calender from './calender';
import moment from 'moment';
import { StoriesListContainer, SummaryCard } from './StoriesList.style';
import Story from './Story';
import { FaCalendar } from 'react-icons/fa';
import { StyledButton } from '../App.style';
import BurnDownChart from './BurnDownChart';
import {CategoryScale} from 'chart.js';
import Chart from 'chart.js/auto'

Chart.register(CategoryScale)

const StoriesList = () => {
  const { stories } = useContext(StoriesListContext);
  const [showSprintPeriodForm, setShowSprintPeriodForm] = useState(false);
  const today = moment();
  const [sprintStartDate, setSprintStartDate] = useState(moment(JSON.parse(localStorage.getItem('sprintStartDate')) || []));
  const [sprintEndDate, setSprintEndDate] = useState(moment(JSON.parse(localStorage.getItem('sprintEndDate')) || []));
  const [sprintDaysCount, setSprintDaysCount] = useState(sprintEndDate.diff(sprintStartDate, 'days'));
  
  const completedStoryPoints = stories.reduce(function (acc, curr) {
    return acc + curr.completedPoints;
  }, 0);

  const storyPoints = stories.reduce(function (acc, curr) {
    return acc + curr.points;
  }, 0);

  const toggleShowSprintPeriodForm = () => {
    setShowSprintPeriodForm(!showSprintPeriodForm);
  };

  useEffect(() => {
    setSprintDaysCount(sprintEndDate.diff(sprintStartDate, 'days'));
    // store the sprint start date and the end date
    localStorage.setItem('sprintStartDate', JSON.stringify(sprintStartDate));
    localStorage.setItem('sprintEndDate', JSON.stringify(sprintEndDate));
  },[sprintStartDate,sprintEndDate, storyPoints])
  
  const getAvgCompleted = () => {
    return completedStoryPoints / today.diff(sprintStartDate, 'days').toFixed(1)
  }

  const getReqCompleted = () => {
    return (storyPoints/sprintDaysCount).toFixed(1);
  }

  const getPercentageCompleted = () => {
    return Math.floor((completedStoryPoints / storyPoints)* 100)
  }

  var enumerateDaysBetweenDates = function(startDate, endDate) {
    var dates = [];

    var currDate = moment(startDate).startOf('day');
    var lastDate = moment(endDate).startOf('day');

    while(currDate.add(1, 'days').diff(lastDate) < 0) {
        dates.push(currDate.clone().format('MM/DD/YY'));
    }

    return dates;
};

var enumerateStoryPointsBetweenDates = function(startDate, endDate) {
  var currentPoints = storyPoints;
  var points = [];
  var currDate = moment(startDate).startOf('day');
    var lastDate = moment(endDate).startOf('day');
    
    const requiredPointsPerDay = getReqCompleted()
    while(currDate.add(1, 'days').diff(lastDate) < 0) {
      points.push(currentPoints);
      currentPoints = currentPoints - requiredPointsPerDay
  }
  return points;
}



  const labels = enumerateDaysBetweenDates(sprintStartDate, sprintEndDate);
  const dataset = enumerateStoryPointsBetweenDates(sprintStartDate, sprintEndDate);
  const data={
    // Name of the variables on x-axies for each bar
    labels: labels,
    datasets: [
      {
        // Data or value of your each variable
        data: dataset,
        backgroundColor:"red"
      },
    ],
  }

  return (
    <StoriesListContainer>
      <h2>Sprint Summary</h2>
      <div className='Sprint-Options'>
      <StyledButton onClick={toggleShowSprintPeriodForm}><FaCalendar />Set Sprint Date Range</StyledButton>
      </div>
      {showSprintPeriodForm && (
          <div className="CalenderSectionContainer">
            <div className="CalenderContainer">
              <div>Start Date: {sprintStartDate.format('MM/DD/YY')}</div>
              <Calender value={sprintStartDate} onChange={setSprintStartDate} />
            </div>
            <div className="CalenderContainer">
              <div>End Date: {sprintEndDate.format('MM/DD/YY')}</div>
              <Calender value={sprintEndDate} onChange={setSprintEndDate} />
            </div>
          </div>
      )}
      
      <div className="sprint-summary"> 
        <SummaryCard color={''}>
          <h4>Total Points</h4>
          <span className="card-body">
            {completedStoryPoints > 0
              ? `${completedStoryPoints}/${storyPoints}`
              : storyPoints}
          </span>
        </SummaryCard>
        <SummaryCard color={getPercentageCompleted() > 80 ? 'green' : 'white'}>
          <h4>Percentage Completed</h4>
          <span className="card-body">
            { getPercentageCompleted() }
            {'%'}
          </span>
        </SummaryCard>
        <SummaryCard color={''}>
          <h4>Required Points/day</h4>
          <span className="card-body">{getReqCompleted()}</span>
        </SummaryCard>
        <SummaryCard color={getAvgCompleted() > getReqCompleted() ? 'green' : 'red'}>
          <h4>Average Completed Points/day</h4>
          <span className="card-body">{getAvgCompleted()}</span>
        </SummaryCard>
      </div>
      
<BurnDownChart data={data} />
      <h2>Stories List</h2>

      {stories.length ? (
        <div>
          {stories.map((story) => {
            return <Story story={story} key={story.id} />;
          })}
        </div>
      ) : (
        <div>No Stories</div>
      )}
    </StoriesListContainer>
  );
};

export default StoriesList;
