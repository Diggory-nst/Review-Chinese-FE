import styled from "styled-components";

const Div = styled.div`

    position: relative;

    .mainContent {

        border: 1px solid #adadad;
        border-radius: 8px;
        padding: 15px 10px;
        height: calc(100vh - 249.2px);

        .mainWord {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 72px;
        }

        .tuongHinh {
            font-size: 3.6rem;
            line-height: 3.9rem;
            font-family: "Noto Serif TC", serif !important;
            font-optical-sizing: auto;
            font-weight: 400;
            font-style: normal;
        }

        .inforMainWorld {
            margin-top: 18px;
            display: flex;
            justify-content: center;
            align-items: center;

            h1 {
                font-size: 2.2rem;
                line-height: 2.4rem;
                margin-right: 20px;
            }

            #type {
                color: #b21d1db8;
                cursor: default;
            }

            #iconAudio {
                font-size: 2.2rem;
                color: #436ab3;
                cursor: pointer;
            }
        }

        .pinyin {
            font-size: 3.2rem;
            line-height: 3.5rem;
        }

        .listMeansWord {
            margin-top: 56px;
            display: flex;
            flex-wrap: wrap;
        }

        .itemMeansWord {

            flex-basis: 45%;
            margin-bottom: 75px;
            text-align: center;
            font-size: 2.4rem;
            line-height: 2.6rem;
            padding: 5px 10px;
            border: 1px solid #adadad;
            border-radius: 4px;
            margin-right: 10%;
            cursor: pointer;
        }

        .itemMeansWord:nth-of-type(2) {
            margin-right: 0;
        }

        .itemMeansWord:nth-of-type(3) {
            margin-bottom: 0;
        }

        .itemMeansWord:nth-of-type(4) {
            margin-right: 0;
            margin-bottom: 0;
        }

        .endWord {
            text-align: center;
            margin-top: 60px;
            font-size: 2.8rem;
            line-height: 3.1rem;
            cursor: pointer;
            color: #bf2c24;
        }

        .choseLesson {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;

            h1 {
                font-size: 2.6rem;
                line-height: 2.8rem;
                text-align: center;
                cursor: default;
            }
        }
    }
`

export {
    Div
}