import styled from "styled-components";

const Div = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .title {
        font-size: 2.6rem;
        line-height: 2.9rem;
        margin-bottom: 42px;
        text-align: center;
    }

    .submit-choice {
        text-align: end;
        font-size: 2.2rem;
        line-height: 2.5rem;
        color: #bf2c24;
        cursor: pointer;
        transform: translateX(-40px);
    }

    .translate {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 65px;

        h1 {
            font-size: 2.6rem;
            line-height: 2.9rem;
            margin-right: 12px;
        }

        input {
            outline: none;
            height: 32px;
            font-size: 2rem;
            line-height: 2.3rem;
            width: 200px;
            text-align: center;
        }
    }

    .error {
        color: #527f4f;
        font-size: 1.8rem;
        margin-top: 25px;
        text-align: center;
        line-height: 2.1rem;
    }
`

export {
    Div
}