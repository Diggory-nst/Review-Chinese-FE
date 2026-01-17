import styled from "styled-components";

const Div = styled.div`

    display: flex;
    margin-bottom: 30px;
    height: calc(100vh - 183px);

    .books {
        width: 16%;
        border: 1px solid #adadad;
        border-radius: 8px;
        padding: 15px 15px;
        margin-right: 2%;
        overflow-y: auto;
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */

        .nameBook {
            font-size: 2.5rem;
            line-height: 2.8rem;
            margin-bottom: 25px;
            text-align: center;
            cursor: pointer;
            color: #527f4f;
            user-select: none;
        }

        .listLesson {
            text-align: center;
            cursor: pointer;
        }

        .nameLesson {
            font-size: 2.2rem;
            line-height: 2.5rem;
            margin-bottom: 15px;
        }
    }

    /* Hide scrollbar for Chrome, Safari and Opera */
    .table-of-content::-webkit-scrollbar {
        display: none;
    }

    .mainContent {
        width: 82%;
        border: 1px solid #adadad;
        border-radius: 8px;
        padding: 15px 30px;
        padding-right: 14px;
        overflow-y: scroll;
        scrollbar-width: thin;

        .itemContent {
            display: flex;
            align-items: center;
            margin-bottom: 30px;
            position: relative;
        }

        .tuongHinh {
            font-size: 2.5rem;
            line-height: 2.8rem;
            margin-right: 5%;
            width: 11%;
            font-family: "Noto Serif TC", serif !important;
            font-optical-sizing: auto;
            font-weight: 400;
            font-style: normal;
            cursor: pointer;
        }

        .pinyin {
            font-size: 2.5rem;
            line-height: 2.8rem;
            margin-right: 3%;
            width: 16%;
            cursor: default;
        }

        .type {
            font-size: 2.2rem;
            line-height: 2.8rem;
            margin-right: 2%;
            width: 6%;
            cursor: default;
            color: #b21d1db8;
        }

        .audio {
            margin-right: 2%;
            width: 3%;
            cursor: pointer;
            display: flex;
            align-items: center;

            #icon-audio {
                font-size: 2.4rem;
                color: #436ab3;
            }
        }

        .meaning {
            font-size: 2.5rem;
            line-height: 2.8rem;
            width: 26%;
            margin-right: 2%;
            cursor: default;
        }

        .example {
            font-size: 2.2rem;
            line-height: 2.8rem;
            width: 26%;
            cursor: default;
        }

        .titleStructure {
            font-size: 2.3rem;
            line-height: 2.6rem;
            margin-bottom: 10px;
        }

        .structureChinese {
            font-size: 2.1rem;
            line-height: 2.4rem;
            color: #000000;
        }

        .showStructure {
            position: absolute;
            padding: 10px 12px;
            border-radius: 2px;
            background-color: #c5c5c5;
            height: auto;
            width: 380px;
            left: 40px;
            top: 32px;
            z-index: 10;
        }

        .notChoiceLesson {
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            h1 {
                font-size: 3rem;
                line-height: 3.3rem;
                text-align: center;
            }
        }
    }
`

export {
    Div
}