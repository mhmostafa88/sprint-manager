import styled from 'styled-components';

export const CalenderContainer = styled.div`
  padding-top: 10px;
  z-index: 1;
  font-size: 13px;
  color: var(--Text-Color-Purple);
  width: 270px;
  height: 300px;
  height: auto;
  .Container {
    border-radius: 20px;
    border-color: red;
    padding: 5px;
    z-index: 1;
    background-color: white;
  }

  .calender-arrow {
    color: var(--primary-color-Purple);
    cursor: pointer;
    &:hover {
      color: var(--Text-Color-DarkPurple);
    }
  }

  .header {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    margin: 15px;
  }
  .day {
    position: relative;
    width: calc(100% / 7);
    height: 34px;
    display: inline-block;
    background-color: white;
    margin: 1px;
    box-sizing: border-box;
    z-index: 1;
    text-align: center;
    line-height: 34px;
    cursor: pointer;
    border-radius: 50%;

    .selected {
      background-color: var(--primary-color-Purple) !important;
      color: white;
      background-color: white;
      cursor: pointer;
      font-size: 15px;
      border-radius: 50%;
    }

    .today {
      color: var(--Text-Color-DarkPurple) !important;
      background-color: white;
      cursor: pointer;
      font-size: 15px;
      border-width: 1px;
      border-style: solid;
      border-color: var(--Text-Color-DarkPurple);
      border-radius: 50%;
    }

    .before {
      background-color: var(--Text-Color-Grey) !important;
      color: var(--Text-Color-DarkGrey) !important;
      background-color: white;
      cursor: pointer;
      border-radius: 50%;
    }

    &:hover {
      background-color: var(--primary-color-PurpleLight);
      color: var(--primary-color-Dark);
      font-size: 15px;

      transition: all 0.2s;
    }
  }

  .week {
    display: flex;
    height: auto;
    align-items: center;
    z-index: 1;
  }

  .day-names {
    display: flex;
    width: 100%;
    gap:30px;
    padding: 10px 0px 10px 13px;
  }
`;
