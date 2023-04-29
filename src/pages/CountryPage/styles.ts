import styled from "styled-components";

export const CountryPage = styled.main`
    min-height: calc(100vh - 0px);
    background-color: ${props => props.theme === 'light' ? '' : 'rgb(32, 45, 54)'};
    transition: all ease 0.2s;
    .container {
        width: 1024px;
        margin: auto;
        padding: 40px 0px;
        
        .loading {
            min-height: 100vh;
            color: ${props => props.theme === 'light' ? '' : '#FFF'};
        }
    }
    
    .back--button {
        text-decoration: none;
        background-color: ${props => props.theme === 'light' ? '#FFF' : 'rgb(43, 55, 67)'};
        color: ${props => props.theme === 'light' ? '#000' : '#FFF'};
        margin-bottom: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 120px;
        height: 35px;
        border-radius: 3px;
        box-shadow: 1px 1px 0.2em rgba(0, 0, 0, 0.2)
    }

    @media(min-width: 768px) and (max-width: 1023px){
        & {
            padding: 20px;
        }
        .container {
            width: auto
        }
    }

    @media(max-width: 767px) {
        & {
            padding: 20px;
        }
        .container {
            width: auto;
            padding: 20px 0px;
        }
    }

`