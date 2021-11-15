import styled from "styled-components";



export const StoryForm = styled.div `

display: flex;
flex-direction: column;
position: relative;
width: 100%;

form {
    position: relative;
    display:flex;
    flex-direction:row;
    gap: 20px;
    height: 55px;
    width:100%;
}

textarea {
    width:800px;
    height:100%;
}

input {
    width: 250px;
    height:100% !important;
}

button {
    width: 150px;
}
`;