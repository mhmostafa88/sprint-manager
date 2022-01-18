import styled from "styled-components";

export const AppContainer = styled.div`
  padding: 20px 30px;
  font-family: Poppins;
  color: var(--Text-Color-White);

  h1 {
    font-weight: 600;
    font-size: 34px;
  }

  h2 {
    font-weight: 600;
    font-size: 30px;
  }

  h3, .task__title {
    font-weight: 500;
    font-size: 27px;

    span {
      color: var(--primary-color-Purple);
      font-weight: bold;
    }
  }

  h4 {
    font-weight: 500;
    font-size: 17px;

    span {
      color: var(--primary-color-Purple);
      font-weight: bold;
    }
  }

  input {
    border-radius: 6px;
    height: 38px;
    padding-left: 15px;
    border: none;
  }

  input:focus {
    outline: none;
  }

  input::placeholder,
  textarea::placeholder {
    font-size: 15px;
    color: var(--Text-Color-Grey);
  }

  textarea {
    border-radius: 6px;
    padding: 15px;
  }

  .Big-Title {
    font-weight: 600;
    font-size: 52px;
  }

  button {
    height: 100%;
    border-radius: 9px;
    border: none;
    padding: 8px 15px;
    cursor: pointer;
    display: flex;
align-items: center;
  }
.btn-svg-text svg {
  margin-right: 10px;
}

  background-color: var(--primary-color-BlackAccent);


  .btn--small {
    padding: 4px 8px;
    width: auto;
    font-size: 15px;
    display:inline;
    line-height: 10px;
    height: 30px;
  }

  .btn--med {
    padding: 10px 15px;
    width: auto;
    font-size: 18px;
    display:inline;
  }


`;

export const StyledButton = styled.button `

  background-color: ${(props) =>
    props.color === "green"
      ? "var(--secondary-color-Green)"
      : props.color === "red"
      ? "var(--secondary-color-Red)"
      : "var(--Text-Color-WhiteGrey)"};
  color: ${(props) =>
    props.color === "green"
      ? "var(--Text-Color-White)"
      : props.color === "red"
      ? "var(--Text-Color-White)"
      : "var(--Text-Color-DarkGrey)"};

`;
