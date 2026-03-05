import styled from "styled-components";

const Div = styled.div`

    position: relative;

    .mainContent {

        border: 1px solid #adadad;
        border-radius: 8px;
        padding: 15px 10px;
        min-height: calc(100vh - 249.2px);
        overflow-y: auto;

        .mainWord {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 24px;
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
            margin-top: 14px;
            display: flex;
            justify-content: center;
            align-items: center;

            h1 {
                font-size: 2rem;
                line-height: 2.2rem;
                margin-right: 16px;
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
            font-size: 2.8rem;
            line-height: 3.1rem;
        }

        .listMeansWord {
            margin-top: 24px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
        }

        .itemMeansWord {
            text-align: center;
            font-size: 2rem;
            line-height: 2.4rem;
            padding: 10px 8px;
            border: 1px solid #adadad;
            border-radius: 4px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
        }

        .endWord {
            text-align: center;
            margin-top: 24px;
            margin-bottom: 10px;
            font-size: 2.6rem;
            line-height: 2.8rem;
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