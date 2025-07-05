import styled from "styled-components";

const Div = styled.div`

    display: flex;
    margin-bottom: 30px;

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

        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 52%;
        border: 1px solid #adadad;
        border-radius: 8px;
        padding: 15px 30px;
        margin-right: 2%;

        .main-word {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 72px;
        }

        .tuong-hinh {
            font-size: 3.6rem;
            line-height: 3.9rem;
            font-family: "Noto Serif TC", serif !important;
            font-optical-sizing: auto;
            font-weight: 400;
            font-style: normal;
        }

        .pinyin {
            font-size: 3.2rem;
            line-height: 3.5rem;
        }

        .list-means-word {
            margin-top: 72px;
            display: flex;
            flex-wrap: wrap;
        }

        .item-means-word {

            flex-basis: 45%;
            margin-bottom: 75px;
            text-align: center;
            font-size: 3.2rem;
            line-height: 3.5rem;
            padding: 5px 10px;
            border: 1px solid #adadad;
            border-radius: 4px;
            margin-right: 10%;
            cursor: pointer;
        }

        .item-means-word:nth-of-type(2) {
            margin-right: 0;
        }

        .item-means-word:nth-of-type(3) {
            margin-bottom: 0;
        }

        .item-means-word:nth-of-type(4) {
            margin-right: 0;
            margin-bottom: 0;
        }

        .end-word {
            text-align: center;
            margin-top: 60px;
            font-size: 2.8rem;
            line-height: 3.1rem;
            cursor: pointer;
            color: #bf2c24;
        }

        .chose-lesson {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;

            h1 {
                font-size: 3.5rem;
                line-height: 3.8rem;
                text-align: center;
                cursor: default;
            }
        }
    }

    .beauty-image {
        width: 28%;
        min-height: calc(100vh - 183px);
        background-repeat: no-repeat;
        background-position: center;
        border-radius: 8px;
    }

    // Responsive for tablet
    @media (min-width:800px) and (max-width:1023px) {
        .main-content {
            width: 82%;
            margin-right: 0;
            min-height: calc(100vh - 180px);
        }

        .beauty-image {
            display: none;
        }
    }

    // Responsive for mobile
    @media (max-width: 575px) {

        .main-content {
            width: 82%;
            margin-right: 0;
            min-height: calc(100vh - 180px);
        }

        .beauty-image {
            display: none;
        }
    }
`

export {
    Div
}