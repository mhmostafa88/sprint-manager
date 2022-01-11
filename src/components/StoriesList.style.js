import styled from "styled-components";

export const StoriesListContainer = styled.div `

height: auto;

.sprint-summary {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 30px;
}

.Sprint-Options{
    button {
        color:var(--Text-Color-Purple);
    }
    svg {
        margin-right: 10px;
        color: var(--Text-Color-Purple);
    }
}

.CalenderContainer {
    display: flex;
    flex-direction: column;
    align-items:center;
    height: auto;
}

.CalenderSectionContainer {
    display: flex;
    gap: 20px;
    margin: 20px 0px;
    height: auto;
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

