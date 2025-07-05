import styled from "styled-components";

const Div = styled.div`

    header {
        background-color: black;
        margin-bottom: 50px;

        .account {
            display: flex;
            align-items: center;
            position: relative;
            padding: 18px 0;
            justify-content: end;
            cursor: default;
            user-select: none;

            .icon-avatar {
                width: 30px !important;
                height: 30px !important;
                margin-right: 16px;
                color: white;
            }

            .name-account {
                color: white;
                font-size: 2.4rem;
                line-height: 2.7rem;
            }

            img {
                width: 30px !important;
                height: 30px !important;
                border-radius: 50%;
                margin-right: 16px;
            }
        }
    }

    .container {

        display: flex;
        min-height: calc(100vh - 205px);
        margin-bottom: 30px;

        .table-of-content {
            width: 25%;
            margin-right: 3%;

            .cssChung {
                border: 1px solid #adadad;
                padding: 10px;
                border-radius: 8px;
                margin-bottom: 30px;
                
                h1 {
                    font-size: 2.5rem;
                    line-height: 2.8rem;
                    text-align: center;
                    margin-bottom: 18px;
                    cursor: pointer;
                }

                h1:last-child {
                    margin-bottom: 0;
                }
            }

            .title {
                color: #bf2c24;
                cursor: default !important;
            }

            .moveToManageUser {
                margin-top: 30px;
                display: flex;
                justify-content: center;

                a {
                    font-size: 2.2rem;
                    line-height: 2.5rem;
                    background-color: #527f4f;
                    color: white;
                    padding: 8px 25px;
                    border-radius: 4px;
                    cursor: pointer;
                }
            }
        }

        .main {
            width: 72%;
            border: 1px solid #adadad;
            border-radius: 8px;
            padding: 15px 15px;

            .wait-page {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;

                h1 {
                    font-size: 3rem;
                    line-height: 3.3rem;
                }
            }
        }
    }

`

export {
    Div
}