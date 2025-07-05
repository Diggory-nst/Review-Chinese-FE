import styled from "styled-components";

const Div = styled.div`

    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .choice-book {
        display: flex;
        flex-direction: column;
        align-items: center;

        .book {
            display: flex;
            align-items: center;
            margin-bottom: 38px;

            h1 {
                font-size: 2.6rem;
                line-height: 2.9rem;
                margin-right: 12px;
            }

            input {
                outline: none;
                height: 32px;
                width: 100px;
                font-size: 2rem;
                line-height: 2.3rem;
                text-align: center;
            }

            input:nth-of-type(1) {
                margin-right: 40px;
            }

            h1:nth-of-type(2) {
                margin-left: 40px;
            }
        }

        p {
            font-size: 2rem;
            line-height: 2.3rem;
            margin-bottom: 20px;
        }

        .lesson {
            display: flex;
            align-items: center;

            h1 {
                font-size: 2.6rem;
                line-height: 2.9rem;
                margin-right: 12px;
            }

            input {
                outline: none;
                height: 32px;
                width: 344px;
                font-size: 2rem;
                line-height: 2.3rem;
                text-align: center;
            }

            
        }
    }

    .compose-auto {
        margin-top: 94px;

        h1 {
            font-size: 3rem;
            line-height: 3.3rem;
            cursor: pointer;
        }
    }

    .error {
        color: #bf2c24;
        font-size: 1.8rem;
        margin-top: 80px;
        text-align: center;
        line-height: 2.1rem;
    }

    .success-compose {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        div:first-child {
            height: 80%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            span {
                font-size: 2.8rem;
                line-height: 3.1rem;
                cursor: default;
            }
        }

        div:last-child {
            height: 20%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            h1 {
                font-size: 2.8rem;
                line-height: 3.1rem;
                color: #bf2c24;
                cursor: pointer;
            }
        }
    }

`

export {
    Div
}