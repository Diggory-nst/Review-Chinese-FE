import styled from "styled-components";

const Div = styled.div`

    .section-laptop {
        display: flex;
        margin-bottom: 30px;
        height: calc(100vh - 183px);
    }

    .section-mobile {
        display: none;
    }

    .for-laptop {
        display: block;
    }

    .for-tablet {
        display: none;
    }

    .for-mobile {
        display: none;
    }

    .table-of-content {
        width: 16%;
        border: 1px solid #adadad;
        border-radius: 8px;
        padding: 15px 15px;
        margin-right: 2%;
        overflow-y: auto;
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */

        .name-book {
            font-size: 2.5rem;
            line-height: 2.8rem;
            margin-bottom: 25px;
            text-align: center;
            cursor: pointer;
            color: #527f4f;
            user-select: none;
        }

        .list-lesson {
            text-align: center;
            cursor: pointer;
        }

        .name-lesson {
            font-size: 2.2rem;
            line-height: 2.5rem;
            margin-bottom: 15px;
        }
    }

    /* Hide scrollbar for Chrome, Safari and Opera */
    .table-of-content::-webkit-scrollbar {
        display: none;
    }

    .main-content {
        width: 82%;
        border: 1px solid #adadad;
        border-radius: 8px;
        padding: 15px 30px;
        padding-right: 14px;
        overflow-y: scroll;
        scrollbar-width: thin;

        .item-content {
            display: flex;
            align-items: center;
            margin-bottom: 30px;
            position: relative;
        }

        .tuong-hinh {
            font-size: 2.5rem;
            line-height: 2.8rem;
            margin-right: 5%;
            width: 15%;
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
            width: 28%;
            margin-right: 2%;
            cursor: default;
        }

        .example {
            font-size: 2.5rem;
            line-height: 2.8rem;
            width: 26%;
            cursor: default;
        }

        .title-structure {
            font-size: 2.3rem;
            line-height: 2.6rem;
            margin-bottom: 10px;
        }

        .structure-chinese {
            font-size: 2.1rem;
            line-height: 2.4rem;
            color: #000000;
        }

        .show-structure {
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


    /* .main-content::-webkit-scrollbar {
        display: none;
    } */

    // Responsive for tablet

    @media (min-width:800px) and (max-width:1023px) {

        .for-laptop {
            display: none;
        }

        .for-tablet {
            display: block;
        }

        .for-mobile {
            display: none;
        }


        .table-of-content {

            width: 20%;
        }

        .main-content {

            width: 80%;
            padding-left: 22px;
            padding-right: 22px;

            .tuong-hinh {
                margin-right: 5%;
                width: 20%;
            }

            .pinyin {
                margin-right: 5%;
                width: 22%;
            }

            .audio {
                margin-right: 5%;
                width: 5%;
            }

            .meaning {
                margin-right: 0%;
                width: 38%;
            }

            .show-example-structure {
                position: absolute;
                padding: 10px 12px;
                border-radius: 2px;
                background-color: #c5c5c5;
                width: 380px;
                left: 40px;
                top: 32px;
                z-index: 10;
            }

            .contain-example {
                margin-top: 15px;

                .title-example {
                    font-size: 2.3rem;
                    line-height: 2.6rem;
                    margin-bottom: 10px;
                }

                .example {
                    font-size: 2.1rem;
                    line-height: 2.4rem;
                    color: #000000;
                    width: unset;
                }
            }
        }
    }

    // Responsive for mobile
    @media (max-width: 575px) {

        .section-mobile {
            display: block;
        }

        .section-laptop {
            display: none;
        }

        .for-tablet {
            display: none;
        }

        .for-mobile {
            display: block;
        }

        .table-of-content {
            width: unset;
            margin-right: 0;
            overflow-y: unset;
            padding: 15px 10px;
            margin-bottom: 16px;

            .books {
                display: block;
                white-space: nowrap;
                overflow: hidden;
                overflow-x: scroll;

                .item-book {
                    display: inline-block;
                    margin-right: 25px;

                    .name-book {
                        line-height: 3.2rem;
                        margin-bottom: 0;
                        user-select: none;
                    }

                    .list-lesson {
                        display: block;
                        position: absolute;
                        white-space: nowrap;
                        overflow: hidden;
                        overflow-x: scroll;

                        h2 {
                            display: inline-block;
                            margin-bottom: 0;
                        }
                    }
                }

                .item-book:last-child {
                    margin-right: 0;
                }
            }
        }

        .main-content {

            width: 100%;
            padding-left: 22px;
            padding-right: 22px;
            min-height: calc(100vh - 324px);

            .tuong-hinh {
                margin-right: 5%;
                width: 20%;
            }

            .pinyin {
                margin-right: 5%;
                width: 22%;
            }

            .audio {
                margin-right: 5%;
                width: 5%;
            }

            .meaning {
                margin-right: 0%;
                width: 38%;
            }

            .show-example-structure {
                position: absolute;
                padding: 10px 12px;
                border-radius: 2px;
                background-color: #c5c5c5;
                width: 380px;
                left: 40px;
                top: 32px;
                z-index: 10;
            }

            .contain-example {
                margin-top: 15px;

                .title-example {
                    font-size: 2.3rem;
                    line-height: 2.6rem;
                    margin-bottom: 10px;
                }

                .example {
                    font-size: 2.1rem;
                    line-height: 2.4rem;
                    color: #000000;
                    width: unset;
                }
            }
        }
    }
`

export {
    Div
}