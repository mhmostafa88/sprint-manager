import styled from "styled-components";


export const StoryContainer = styled.div `
width: 100%;
padding: 1px 30px 25px 30px;
border-radius:20px;
background-color: var(--primary-color-Purple);
height: auto;
color: var(--Text-Color-WhiteGrey);
margin-bottom: 25px;

.header {
    display:flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    margin-block-start: 0px !important;
    margin-block-end: 0px !important;

    h3 {
        display:flex;
        align-items: center;
        svg {
            margin-right: 10px;
        }
        svg:hover{
            color:var(--Text-Color-DarkPurple);
        }
    }
}

p {
    margin-left: 15px;
}

.action-btns-container { 
    display: flex;
    flex-direction: row;
    gap: 10px;
}

button {
    width: 140px;
}

`;