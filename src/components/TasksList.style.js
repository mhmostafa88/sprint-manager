import styled from "styled-components";


export const TaskListContainer = styled.div `
margin-top: 20px;

`;

export const TaskContainer = styled.div `
background-color:var(--primary-color-BlackAccent);
border-radius: 10px;
padding: 10px 15px;
margin-bottom: 20px;
.task__description {
    font-size: 18px;
}

.task__points__Container {
    display: flex;
    gap: 20px;
    margin:7px 0px;
}

.task__points__Card {
    background-color:var(--primary-color-PurpleLight);
    width: 100px;
    color:var(--Text-Color-Purple);
    padding: 8px;
    border-radius: 6px;
    display: flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
}
`;