import styled from "styled-components";

export const StoriesListContainer = styled.div `
margin-top: 30px;

.sprint-summary {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
`;


export const SummaryCard = styled.div `
background-color: ${props => props.color === 'green' ? 'var(--secondary-color-Green)' : props.color === 'red' ? 'var(--secondary-color-Red)' : 'white'};
color: ${props => props.color === 'green' ? 'white' : props.color === 'red' ? 'white' : 'grey'};
height: 150px;
width: 300px;
border: transparent;
border-radius: 10px;
padding: 20px 15px;
display: flex;
flex-direction: column;
align-items:center;
justify-content: center;


.card-body {
    font-size: 60px;
    line-height:75px;
}


`;

