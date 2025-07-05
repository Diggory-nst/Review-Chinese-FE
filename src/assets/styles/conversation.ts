import styled from "styled-components";

const Div = styled.div`

    display: flex;
    margin-bottom: 30px;
    height: calc(100vh - 183px);

    .table-of-content {
        width: 16%;
        border: 1px solid #adadad;
        border-radius: 8px;
        padding: 15px 15px;
        margin-right: 2%;
        overflow-y: auto;
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */

        h1 {
            font-size: 2.2rem;
            line-height: 2.5rem;
            margin-bottom: 15px;
            text-align: center;
            cursor: pointer;
        }
    }

    /* Hide scrollbar for Chrome, Safari and Opera */
    .table-of-content::-webkit-scrollbar {
        display: none;
    }

    .main-content {
        width: 84%;
        border: 1px solid #adadad;
        border-radius: 8px;
        padding: 15px 10px;

        .notChoiceLesson {
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            h1 {
                font-size: 3rem;
                line-height: 3.3rem;
            }
        }
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