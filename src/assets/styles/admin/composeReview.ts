import styled from "styled-components";

const Div = styled.div`

    height: calc(100% - 30px);

    .choice-book {
        display: flex;
        margin-top: 25px;
        justify-content: center;
        align-items: center;
        margin-bottom: 0;

        .book {
            display: flex;
            align-items: center;
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
                width: 150px;
                text-align: center;
            }
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
                font-size: 2rem;
                line-height: 2.3rem;
                width: 150px;
                text-align: center;
            }
        }
    }

    .option-compose {
        height: calc(100% - 32px);

        div {
            height: calc(100% - 46px);
            display: flex;
            justify-content: center;
            align-items: center;

            h1 {
                font-size: 2.8rem;
                line-height: 3.1rem;
                cursor: pointer;
            }

            .option-auto {
                margin-right: 50px;
            }

            .option-manual {
                margin-left: 50px;
            }
        }
    }

    .load-wait {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        span {
            font-size: 2.8rem;
            line-height: 3.1rem;
            cursor: default;
        }
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