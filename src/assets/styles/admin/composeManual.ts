import styled from "styled-components";

const Div = styled.div`

    .choice-book {
        display: flex;
        margin-top: 25px;
        justify-content: center;
        align-items: center;
        padding-bottom: 26px;
        border-bottom: 1px solid #436ab3;

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

    .prepare-lesson {

        display: flex;
        padding: 15px 10px;

        .show-prepare-lesson {
            width: 75%;
        }

        .main-word {
            display: flex;
            justify-content: center;
            align-items: center;
            padding-top: 34px;
        }

        .tuong-hinh {
            width: 32%;
            height: 42px;
            margin-right: 5%;
            font-size: 2.5rem;
            text-align: center;
            outline: none;
        }

        .list-means-word {
            margin-top: 82px;
            display: flex;
            flex-wrap: wrap;

            input {
                width: 38%;
                margin-bottom: 72px;
                text-align: center;
                height: 40px;
                font-size: 2.2rem;
                outline: none;
            }

            input:nth-of-type(1) {
                margin-right: 12%;
            }

            input:nth-of-type(2) {
                margin-left: 12%;
            }

            input:nth-of-type(3) {
                margin-right: 12%;
                margin-bottom: 0;
            }

            input:nth-of-type(4) {
                margin-left: 12%;
                margin-bottom: 0;
            }
        }
        
        .next-word {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 60px;

            img {
                width: 72px;
                cursor: pointer;
            }

            h1 {
                font-size: 2.8rem;
                line-height: 3.1rem;
                margin-left: 78px;
                cursor: pointer;
                color: #bf2c24;
            }
        }

        .show-list-word {
            width: 20%;
            border: 1px solid #adadad;
            padding: 10px;
            margin-left: 5%;
            height: 442px;
            overflow-y: auto;
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */

            .title {
                font-size: 2.6rem;
                line-height: 2.7rem;
                text-align: center;
                border-bottom: 1px solid #adadad;
                padding-bottom: 8px;
            }

            .item-word-added {
                margin-top: 18px;
                text-align: center;
                font-size: 2.2rem;
                line-height: 2.5rem;
            }
        }

        /* Hide scrollbar for Chrome, Safari and Opera */
        .show-list-word::-webkit-scrollbar {
            display: none;
        }
    }

    .error {
        color: #527f4f;
        margin-top: 14px;
    }

`

export {
    Div
}