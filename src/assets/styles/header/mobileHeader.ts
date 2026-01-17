import styled from "styled-components";

const Div = styled.header`

    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        padding: 16px 16px;
        background-color: #3c3c3c;
    }

    .logo {
        h1 {
            font-size: 2.6rem;
            color: white;
        }
    }

    .account {
        display: flex;
        align-items: center;
        user-select: none;

        .iconAvatar {
            font-size: 2.2rem;
            color: white;
        }

        .nameAccount {
            margin-left: 10px;
            font-size: 2.2rem;
            color: white;
        }
    }

    .auth {
        display: flex;
        align-items: center;

        .signIn {
            margin-right: 14px;

            a {
                font-size: 2rem;
                color: white;
            }
        }

        .register {
            
            a {
                font-size: 2rem;
                color: white;
            }
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(15px); /* Hiệu ứng trượt lên nhẹ nhàng */
        }
    }

    .optionChange {

        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 12px;
        margin-bottom: 12px;
        padding: 10px 0;
        background-color: #383839d4;
        border-radius: 22px;

        .changePassword {

            margin-right: 14px;

            h1 {
                font-size: 1.8rem;
                color: white;
                line-height: 2.1rem;
                cursor: pointer;
            }
        }

        .changeAvatar {

            h1 {
                font-size: 1.8rem;
                color: white;
                line-height: 2.1rem;
                cursor: pointer;
            }
        }

        .logOut {
            margin-left: 14px;

            h1 {
                font-size: 1.8rem;
                color: white;
                line-height: 2.1rem;
                cursor: pointer;
            }
        }
    }

    /* Áp dụng animation cho class khi xuất hiện */
    .optionChange.fade-in {
    animation: fadeIn 0.5s ease-in-out forwards; /* 'forwards' để giữ trạng thái cuối cùng */
    }

    /* Áp dụng animation cho class khi biến mất */
    .optionChange.fade-out {
    animation: fadeOut 0.5s ease-in-out forwards; /* 'forwards' để giữ trạng thái cuối cùng */
    }
    
    .popups {
        display: flex; // flex: ;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2;

        .modal {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: #00000057;
        }

        .changeAvatar {
            display: block;
            width: 450px;
            padding: 15px 20px;
            padding-top: 10px;
            margin: auto;
            background-color: #ffffff;
            border-radius: 6px;
            z-index: 3;

            .close {
                display: flex;
                justify-content: end;

                #icon-close {
                    font-size: 2.2rem;
                    cursor: pointer;
                }

                #icon-close:hover {
                    color: #b90000;
                }
            }

            h1 {
                text-align: center;
                font-size: 2.2rem;
                line-height: 2.5rem;
                margin-bottom: 30px;
                cursor: default;
            }

            .saveAvatar {
                display: flex;
                justify-content: end;
                margin-top: 22px;
    
                h1 {
                    font-size: 1.7rem;
                    line-height: 2rem;
                    margin-bottom: 0;
                    cursor: pointer;
                    border: 1px solid #527f4f;
                    color: #527f4f;
                    border-radius: 4px;
                    padding: 2px 18px;
                }
            }
        }

        .changePassword {
            display: block;
            width: 410px;
            padding: 15px 20px;
            padding-top: 10px;
            margin: auto;
            background-color: #ffffff;
            border-radius: 6px;
            z-index: 3;

            .close {
                display: flex;
                justify-content: end;

                #icon-close {
                    font-size: 2.2rem;
                    cursor: pointer;
                }

                #icon-close:hover {
                    color: #b90000;
                }
            }

            h1 {
                text-align: center;
                font-size: 2.2rem;
                line-height: 2.5rem;
                margin-bottom: 30px;
                cursor: default;
            }

            .formChangePassword {
                display: flex;
                flex-direction: column;
                justify-content: center;

                input {
                    margin-bottom: 20px;
                    height: 30px;
                    font-size: 1.8rem;
                    line-height: 2.1rem;
                    padding: 20px;
                    outline: none;
                }

                input:last-child {
                    margin-bottom: 0;
                }
            }

            .savePassword {
                display: flex;
                justify-content: end;
                margin-top: 22px;
    
                h1 {
                    font-size: 1.7rem;
                    line-height: 2rem;
                    margin-bottom: 0;
                    cursor: pointer;
                    border: 1px solid #527f4f;
                    color: #527f4f;
                    border-radius: 4px;
                    padding: 2px 18px;
                }
            }
        }

        .errorChange {
            font-size: 1.6rem !important;
            line-height: 1.8rem !important;
            text-align: center !important;
            margin-top: 20px !important;
            color: #003fc3 !important;
            margin-bottom: 0 !important;
        }

    }
`

export {
    Div
}