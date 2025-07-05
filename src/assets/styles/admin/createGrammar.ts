import styled from "styled-components";

const Div = styled.div`

    height: 100%;

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

    .save {
        margin-top: 24px;
        display: flex;
        justify-content: end;
        align-items: center;

        h1 {
            border: 1px solid #bf2c24;
            color: #bf2c24;
            padding: 6px 20px;
            border-radius: 4px;
            cursor: pointer;
        }
    }

    .error {
        color: #527f4f;
        font-size: 1.8rem;
        margin-top: 25px;
        text-align: center;
        line-height: 2.1rem;
    }

    .write-grammar {
        height: calc(100% - 156px);
    }

    .ck.ck-editor {
        height: 100%;
    }

    .ck .ck-editor__main {
        height: calc(100% - 40px);
    }

    .ck-editor__editable_inline {
        height: 100%;
    }
`

export {
    Div
}