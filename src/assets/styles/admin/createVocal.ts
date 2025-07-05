import styled from "styled-components";

const Div = styled.div`

    .choice-book {
        display: flex;
        margin-bottom: 45px;
        margin-top: 25px;
        justify-content: center;
        align-items: center;
    }

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

    .list-vocal {
        margin-bottom: 36px;
    }

    .tag-input {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;

        input {
            outline: none;
            margin-right: 10px;
            width: 168px;
            height: 32px;
            text-align: center;
            font-size: 2rem;
            line-height: 2.3rem;
        }

        input:last-child {
            margin-right: 0;
        }

        input[type="file"]::file-selector-button {
            height: 100%;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 2px;
            cursor: pointer;
        }

        #icon-remove-item-vocal {
            font-size: 2.5rem;
            line-height: 2.8rem;
            margin-left: 30px;
            cursor: pointer;
        }

        #icon-remove-item-vocal:hover {
            color: #bf2c24;
        }
    }

    .tag-area {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;

        textarea {
            outline: none;
            width: 310px;
            height: 80px;
            padding: 2px 0;
            padding-left: 10px;
            font-size: 1.8rem;
            line-height: 2.3rem;
            font-family: "Noto Serif TC", serif !important;
            font-optical-sizing: auto;
            font-weight: 400;
            font-style: normal;
            resize: none;
        }

        textarea:nth-child(2) {
            margin-left: 30px;
        }
    }

    .add-new {
        display: flex;
        justify-content: center;
        align-items: center;

        #icon-add {
            font-size: 2.2rem;
            line-height: 2.5rem;
            border: 1px solid #3f5a93;
            padding: 2px 25px;
            border-radius: 4px;
            color: #3f5a93;
            cursor: pointer;
        }
    }

    .save {
        margin-top: 15px;
        display: flex;
        justify-content: end;
        align-items: center;

        h1 {
            border: 1px solid #758774;
            padding: 8px 22px;
            border-radius: 8px;
            color: #527f4f;
            cursor: pointer;
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