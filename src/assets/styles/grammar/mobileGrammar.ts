import styled from "styled-components";

const Div = styled.div`

    position: relative;

    .mainContent {

        border: 1px solid #adadad;
        border-radius: 8px;
        padding: 15px 22px;
        height: calc(100vh - 249.2px);

        .notChoiceLesson {
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            h1 {
                font-size: 2.6rem;
                line-height: 2.8rem;
            }
        }
    }

    /* ---- Default styles (cho mobile) ---- */
    .ql-font-size-normal {
        font-size: 16px; /* Kích thước bạn muốn cho mobile */
    }
    .ql-font-size-large {
        font-size: 18px;
    }
    .ql-font-size-huge {
        font-size: 20px;
    }
`
export {
    Div
}