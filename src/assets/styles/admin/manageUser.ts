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

        min-height: calc(100vh - 176px);
        
        .sectionOption {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 80px;

            .showNumberUser {
                font-size: 2.4rem;
                line-height: 2.7rem;
            }

            .optionUser {

                span {
                    font-size: 2rem;
                    line-height: 2.3rem;
                    padding: 8px 18px;
                    border-radius: 4px;
                    color: black;
                    border: 1px solid #adadad;
                    cursor: pointer;
                }

                .active {
                    background-color: #527f4f;
                    border-color: #527f4f;
                    color: white;
                }

                .userActive {
                    margin-right: 15px;
                }

                .userInactive {
                    margin-right: 15px;
                }

                .admin {
                    margin-right: 25px;
                }

                .deleteAllUser {
                    background-color: #f19c00e0;
                    color: white;
                    border-color: #f19c00e0;
                }
            }
        }

        .sectionShowInforUser {

            display: flex;
            flex-wrap: wrap;

            .itemUser {

                display: flex;
                width: calc(91% / 4);
                align-items: center;
                margin-bottom: 40px;
                margin-right: 3%;

                .infor {

                    width: 80%;
                    margin-right: 5%;
                    cursor: default;

                    h1 {
                        text-align: center;
                        font-size: 2.2rem;
                        line-height: 2.5rem;
                    }

                    .username {
                        margin-bottom: 10px;
                    }
                }

                .deleteUser {
                    width: 15%;
                    display: flex;
                    justify-content: center;
                    
                    span {
                        font-size: 3rem;
                        color: #bf2c24;
                        cursor: pointer;
                    }
                }
            }

            .no-margin {
                margin-right: 0;
            }
        }

        .noUser {
            min-height: calc(100vh - 223px);
            display: flex;
            justify-content: center;
            align-items: center;

            h1 {
                font-size: 3.4rem;
                line-height: 3.7rem;
            }
        }
    }
`

export {
    Div
}