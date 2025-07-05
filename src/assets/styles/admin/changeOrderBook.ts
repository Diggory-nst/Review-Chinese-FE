import styled from "styled-components";

const Div = styled.div`

    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .title {
        text-align: center;
        font-size: 3rem;
        line-height: 3.3rem;
        margin-bottom: 60px;
    }

    .enterChoiceBook {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        
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

    .enterChoiceLesson {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .choice-book {
        display: flex;
        margin-bottom: 45px;
        margin-top: 25px;
        justify-content: center;
        align-items: center;

        .book {
            display: flex;
            align-items: center;
            margin-right: 80px;
            cursor: default;

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

        .lesson {
            display: flex;
            align-items: center;
            margin-right: 80px;
            cursor: default;

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
                width: 150px;
                text-align: center;
            }
        }

        .numberSort {
            display: flex;
            align-items: center;
            cursor: default;

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
                width: 50px;
                text-align: center;
            }
        }
    }

    .submit-choice {
        text-align: end;
        font-size: 2.2rem;
        line-height: 2.5rem;
        color: #bf2c24;
        cursor: pointer;
    }

    .error {
        color: #bf2c24;
        font-size: 1.8rem;
        margin-top: 25px;
        text-align: center;
        line-height: 2.1rem;
    }

`

export {
    Div
}