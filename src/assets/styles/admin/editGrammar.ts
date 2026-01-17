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

        .endEditGrammar {
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

    .write-grammar {
        height: calc(100% - 138px);
    }

    .quill {
        height: calc(100% - 41.6px);
    }

    .ql-editor {
        height: 100%;
    }

    .ql-font-size.ql-picker{
        width: 98px;
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


    /* ---- Styles cho màn hình lớn hơn (laptop) ---- */
    /* Áp dụng khi chiều rộng màn hình từ 1024px trở lên */
    @media (min-width: 1024px) {
        .ql-font-size-normal {
            font-size: 24px; /* Kích thước bạn muốn cho laptop */
        }
        .ql-font-size-large {
            font-size: 26px;
        }
        .ql-font-size-huge {
            font-size: 28px;
        }
    }

    /* Gán nhãn cho các item trong dropdown */
    .ql-snow .ql-picker.ql-font-size .ql-picker-item[data-value="normal"]::before {
    content: 'Normal';
    }
    .ql-snow .ql-picker.ql-font-size .ql-picker-item[data-value="large"]::before {
    content: 'Large';
    }
    .ql-snow .ql-picker.ql-font-size .ql-picker-item[data-value="huge"]::before {
    content: 'Huge';
    }

    /* Gán nhãn cho nút hiển thị giá trị hiện tại */
    .ql-snow .ql-picker.ql-font-size .ql-picker-label[data-value="normal"]::before {
    content: 'Normal';
    }
    .ql-snow .ql-picker.ql-font-size .ql-picker-label[data-value="large"]::before {
    content: 'Large';
    }
    .ql-snow .ql-picker.ql-font-size .ql-picker-label[data-value="huge"]::before {
    content: 'Huge';
    }
`

export {
    Div
}