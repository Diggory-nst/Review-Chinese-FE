import styled from "styled-components";

const Div = styled.div`

    padding: 0 19px;
    height: 100%;

    .enterChoiceBook {
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
        }
    }

    .choice-book {
        display: flex;
        margin-bottom: 45px;
        margin-top: 25px;
        justify-content: center;
        align-items: center;
    }

    .infor-book {
        display: flex;
        margin-bottom: 45px;
        margin-top: 10px;
        justify-content: center;
        align-items: center;
        user-select: none;
    }

    .book {
        display: flex;
        align-items: center;
        margin-right: 65px;
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

    .lesson {
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
            width: 150px;
            text-align: center;
        }
    }

    .list-volca {
        display: flex;
        flex-wrap: wrap;

        h1 {
            width: 20%;
            text-align: center;
            border: 1px solid #adadad;
            padding: 8px 10px;
            border-radius: 4px;
            margin-right: 6.66%;
            margin-bottom: 20px; 
            cursor: pointer;
        }

        .no-margin {
            margin-right: 0;
        }
    }

    .emptyVocal {
        height: 200px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 3rem;
        line-height: 3.3rem;
    }

    .end {
        display: flex;
        justify-content: end;
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
            width: 578px;
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
            margin-bottom: 20px;

            label {
                margin-bottom: 12px;
                font-size: 2.2rem;
                line-height: 2.5rem;
            }

            input {
                margin-bottom: 20px;
                height: 44px;
                text-align: center;
                font-size: 2.2rem;
                line-height: 2.5rem;
                outline: none;
            }

            textarea {
                margin-bottom: 20px;
                height: 80px;
                padding-left: 10px;
                font-size: 2rem;
                line-height: 2.3rem;
                outline: none;
                resize: none;
            }
        }
        
        .infor-edit .rowEdit {
            display: flex;
            gap: 16px; /* Khoảng cách giữa các thẻ */
            /* margin-bottom: 16px; */
        }

        .field {
            flex: 1; /* Đảm bảo các thẻ cùng chia đều không gian */
        }

        .field label {
            display: block;
            /* margin-bottom: 4px; */
        }

        .field input[type="text"],
        .field textarea,
        .field input[type="file"] {
            width: 100%;
            padding: 8px;
            box-sizing: border-box;
        }

        .save-edit {
            display: flex;
            justify-content: space-between;
            align-items: center;

            h1 {
                font-size: 2.6rem;
                line-height: 2.9rem;
                cursor: pointer;
            }

            h1:first-child {
                color: #9d4040;
            }

            h1:last-child {
                color: #527f4f;
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