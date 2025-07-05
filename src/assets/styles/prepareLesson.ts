import styled from "styled-components";

const Div = styled.div`

    display: flex;
    margin-bottom: 30px;
    min-height: calc(100vh - 183px);

    .table-of-content {

        width: 16%;
        border: 1px solid #adadad;
        border-radius: 8px;
        padding: 25px 15px;
        margin-right: 2%;
        overflow-y: auto;
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */

        .addPrepareLesson, .titleEdit {
            font-size: 2.5rem;
            line-height: 2.8rem;
            margin-bottom: 25px;
            text-align: center;
            cursor: pointer;
            color: #527f4f;
        }

        .item-prepare {
            margin-bottom: 18px;

            h1 {
                font-size: 2.2rem;
                line-height: 2.5rem;
                text-align: center;
                cursor: pointer;
            }
        }

        .item-prepare:last-child {
            margin-bottom: 0;
        }
    }

    .table-of-content::-webkit-scrollbar {
        display: none;
    }

    .main-content {

        width: 82%;
        border: 1px solid #adadad;
        border-radius: 8px;
        padding: 15px 30px;

        .compose-manual {

            height: 100%;

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
                        width: 200px;
                        text-align: center;
                    }
                }
            }

            .prepare-lesson {

                height: calc(100% - 119px);
                display: flex;
                justify-content: center;
                align-items: center;
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
                    margin-top: 12px;
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
                text-align: center;
            }
        }

        .list-vocal {
            display: flex;
            flex-wrap: wrap;
            min-height: calc(100% - 45px);

            h1 {
                width: 18%;
                height: fit-content;
                text-align: center;
                border: 1px solid #adadad;
                padding: 8px 10px;
                border-radius: 4px;
                margin-right: 2.5%;
                margin-bottom: 20px; 
                font-size: 2.2rem;
                line-height: 2.5rem;
                cursor: pointer;
            }

            .no-margin {
                margin-right: 0;
            }
        }

        .end {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            user-select: none;

            h1 {
                font-size: 2.2rem;
                line-height: 2.5rem;
                color: #bf2c24;
                cursor: pointer;
            }
        }

        .popup-vocal {
            display: none; // flex
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;

            .modal {
                position: absolute;
                width: 100%;
                height: 100%;
                background-color: #00000057;
            }

            .info-vocal {
                display: block;
                width: 395px;
                padding: 15px 30px;
                padding-top: 12px;
                margin: auto;
                background-color: #ffffff;
                border-radius: 6px;
                z-index: 2;
            }

            .close {
                display: flex;
                justify-content: end;

                #icon-close {
                    font-size: 2.4rem;
                    cursor: pointer;
                }

                #icon-close:hover {
                    color: #b90000;
                }
            }

            .vocal {
                text-align: center;
                margin-bottom: 25px;
                font-size: 3rem;
                line-height: 3.3rem;
                cursor: default;
            }

            .infor-edit {
                display: flex;
                flex-direction: column;

                label {
                    margin-bottom: 12px;
                    font-size: 2.4rem;
                    line-height: 2.7rem;
                }

                input {
                    margin-bottom: 20px;
                    height: 44px;
                    text-align: center;
                    font-size: 2.4rem;
                    line-height: 2.7rem;
                    outline: none;
                }
            }

            .save-edit {
                display: flex;
                justify-content: end;
                align-items: center;

                h1 {
                    font-size: 2.6rem;
                    line-height: 2.9rem;
                    color: #527f4f;
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

        .removeCompose {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .enterCompose {
                display: flex;
                align-items: center;

                h1 {
                    font-size: 2.6rem;
                    line-height: 2.9rem;
                    margin-right: 30px;
                }

                input {
                    height: 38px;
                    width: 200px;
                    font-size: 2.4rem;
                    line-height: 2.7rem;
                    padding: 0px 10px;
                    outline: none;
                }
            }

            .btnRemove {
                margin-top: 50px;
                font-size: 2.4rem;
                line-height: 2.7rem;
                background-color: #bf2c24;
                color: white;
                padding: 5px 28px;
                border-radius: 4px;
            }

            .error {
                color: #527f4f;
                font-size: 2rem;
                margin-top: 54px;
                text-align: center;
                line-height: 2.3rem;
            }
        }

    }
`

export {
    Div
}