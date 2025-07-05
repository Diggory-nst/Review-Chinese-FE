import styled from "styled-components";

const Div = styled.div`

    width: 28%;
    border: 1px solid #adadad;
    border-radius: 8px;
    padding: 15px 12px;
    overflow-y: auto;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */

    .title {
        font-size: 2.5rem;
        line-height: 2.8rem;
        text-align: center;
        margin-bottom: 25px;
        color: #bf2c24;
        cursor: default;
    }

    .item-contribute {
        padding-bottom: 16px;
        border-bottom: 1px solid #adadad;
        margin-bottom: 12px;
    }

    .content-contribute {
        font-size: 2rem;
        line-height: 2.3rem;
        margin-bottom: 20px;
        color: #717171;
    }

    .infor-contribute {
        display: flex;
    }

    .infor-like {
        display: flex;
        align-items: center;
        margin-right: 24px;
        cursor: pointer;

        .icon-like {
            font-size: 1.6rem;
            margin-right: 10px;
        }
    }

    .infor-dislike {
        display: flex;
        align-items: center;
        margin-right: 24px;
        cursor: pointer;

        .icon-dislike {
            font-size: 1.6rem;
            margin-right: 10px;
        }
    }

    .infor-person {
        display: flex;
        align-items: center;
        cursor: default;

        img {
            width: 18px;
            margin-right: 10px;
            border-radius: 50%;
        }

        span {
            font-size: 2rem;
            margin-right: 10px;
        }

        h2 {
            font-size: 1.7rem;
            line-height: 2rem;
            color: #717171;
        }
    }

    .form-new-contribute {
        display: flex;
        align-items: center;
        margin-bottom: 25px;

        div {
            cursor: pointer;
            height: 40px;
            margin-left: 10px;
            border: 1px solid #527f4f;
            color: #527f4f;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 76px;
            font-size: 1.8rem;
            border-radius: 4px;
        }
    }


    textarea {
        outline: none;
        width: 100%;
        height: 40px;
        padding: 8px;
        font-size: 1.8rem;
        line-height: 2.1rem;
        resize: none;
        border-color: #adadad;
        border-radius: 4px;
    }

    .no-contribute {
        height: calc(100% - 118px);
        display: flex;
        justify-content: center;
        align-items: center;

        h1 {
            font-size: 2.4rem;
            line-height: 2.7rem;
        }
    }


    /* Hide scrollbar for Chrome, Safari and Opera */
    .contribute::-webkit-scrollbar {
        display: none;
    }

`

export {
    Div
}