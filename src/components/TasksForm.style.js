import styled from "styled-components";


export const TaskFormContainer = styled.div `
display: ${props => props.visibility === true ? 'block' : 'none'};
background-color: var(--primary-color-PurpleLight);
border-radius: 10px;
padding: 1px 5px 25px 10px;
margin-top: 12px;

.header {
    display:flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    margin-block-start: -5px !important;
    margin-block-end: -5px !important;
}

form {
    display:flex;
    flex-direction: column;
    gap: 10px;

    div {
        display:flex;
        flex-direction: row;
        gap: 25px;
        align-items: center;
        justify-content: center;
    }

    div:nth-of-type(1) {
        input:nth-of-type(1) {
        width: 250px;
    }
    input:nth-of-type(2) {
        width: 950px;
    }
    }


}


h4 {
    color: var(--Text-Color-Purple);
}

button svg {
    margin: 0;
}



`;