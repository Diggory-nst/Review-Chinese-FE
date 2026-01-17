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

        .name-book {
            font-size: 2.5rem;
            line-height: 2.8rem;
            margin-bottom: 25px;
            text-align: center;
            cursor: pointer;
            color: #527f4f;
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

        width: 84%;
        border: 1px solid #adadad;
        border-radius: 8px;
        padding: 15px 22px;

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
`
export {
    Div
}