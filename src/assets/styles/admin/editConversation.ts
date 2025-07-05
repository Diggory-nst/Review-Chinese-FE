import styled from "styled-components";

const Div = styled.div`
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

    .infor-book {
        display: flex;
        margin-bottom: 45px;
        margin-top: 10px;
        justify-content: center;
        align-items: center;
    }

    .conversation {
        display: flex;
        align-items: center;
        justify-content: center;
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

        .endEditConver {
            margin-right: 30px;
            border-color: #527f4f;
            color: #527f4f;
        }
    }

    .error {
        color: #527f4f;
        font-size: 1.8rem;
        margin-top: 25px;
        text-align: center;
        line-height: 2.1rem;
    }

    .write-conversation {
        height: calc(100% - 138px);
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