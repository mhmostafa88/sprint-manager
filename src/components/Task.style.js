import styled from "styled-components";

export const TaskPointsCard = styled.div `
background-color: ${props => props.isComplete === true ? 'var(--secondary-color-Green)' : 'var(--primary-color-PurpleLight)'};
color: ${props => props.isComplete === true ? 'white' : 'var(--Text-Color-Purple)'};
padding: 8px;
border-radius: 6px;
display: flex;
flex-direction:column;
align-items:center;
justify-content:center;
cursor: pointer;

`;