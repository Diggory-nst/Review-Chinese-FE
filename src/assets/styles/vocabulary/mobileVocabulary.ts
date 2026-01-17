import styled from "styled-components";

const Div = styled.div`

    position: relative;
    min-height: calc(100vh - 199.6px);

    .mainContent{

        display: flex;
        flex-wrap: wrap;
        width: 100%;
        gap: 4%;

        .itemContent{
            display: flex;
            flex-direction: column;
            align-items: center;
            flex-basis: 48%;
            padding: 14px 12px;
            margin-bottom: 12px;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .tuongHinh{
            font-size: 2.6rem;
            line-height: 2.8rem;
            margin-bottom: 8px;
            color: #172b4d;
            font-weight: 700;
        }

        .vocabPronounce{
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
            user-select: none;

            .pinyin{
                font-size: 1.8rem;
                line-height: 2rem;
                color: #5e6c84;
            }

            .audio{
                font-size: 2rem;
                color: #4c9aff;
                cursor: pointer;
            }

            #iconAudio{
                transition: transform 0.3s ease;
            }
        }

        .toggleExample.active #iconChevron{
            transform: rotate(180deg);
        }

        .type{
            font-size: 1.6rem;
            line-height: 2rem;
            margin-top: 8px;
            color: #b21d1db8;
        }

        .meaning{
            font-size: 1.7rem;
            line-height: 2.2rem;
            margin-top: 10px;
            text-align: center;
            flex: 1;
        }

        .toggleExample{
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            margin-top: 18px;
            padding-top: 12px;
            border-top: 1px solid #ebecf0;
            cursor: pointer;
            font-weight: 600;
            color: #0065ff;
            user-select: none;
            
            span {
                font-size: 1.4rem;
                line-height: 1.6rem;
            }
        }

        .exampleContainer {
            overflow: hidden;
            max-height: 100px; /* Chiều cao tối đa khi ẩn */
            transition: max-height 0.4s ease-in-out;

            .example {
                margin-top: 16px;
                padding: 8px;
                background-color: #fafbfc;
                border-radius: 6px;
                color: #333;
                text-align: left;
                border: 1px solid #ebecf0;

                p {
                    font-size: 1.6rem;
                    line-height: 2rem;
                }
            }
        }

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

    .pagination{
        justify-content: center;
        margin-bottom: 0;
        margin-top: 12px;
    }
`

export {
    Div
}