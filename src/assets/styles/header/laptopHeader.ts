import styled from "styled-components";

const Div = styled.header`

    background-color: #3c3c3c;
    margin-bottom: 30px;

    .container {
        padding-top: 20px;
        padding-bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .logo {

        h1 {
            font-size: 3.5rem;
            line-height: 3.8rem;
            color: white;
            cursor: pointer;
        }
    }

    nav {

        display: flex;
        color: white;
        align-items: center;
        
        h1 {
            font-size: 2.5rem;
            line-height: 2.8rem;
            margin-right: 30px;
            cursor: pointer;
            color: white;
        }

        h1:last-child {
            margin-right: 0;
        }

        .expand {
            position: relative;

            .expand-function {
                position: absolute;
                top: 38px;
                left: 5px;
                background-color: #3c3c3c;
                width: 224px;
                height: 90px;
                padding-left: 12px;
                padding-top: 8px;
                border-radius: 4px;
                z-index: 10;

                .conversation {
                    margin-right: 0;
                    margin-bottom: 12px;
                }
            }
        }

        .icon-expand {
            transform: translateY(5px);
            font-size: 2.5rem;
            cursor: pointer;
        }
    }

    .account {

        display: flex;
        align-items: center;
        position: relative;
        cursor: pointer;

        .icon-avatar {
            width: 30px !important;
            height: 30px !important;
            margin-right: 16px;
            color: white;
        }

        img {
            width: 30px !important;
            height: 30px !important;
            border-radius: 50%;
            margin-right: 16px;
        }

        .nameAccount {
            font-size: 2rem;
            line-height: 2.3rem;
            color: white;
            user-select: none;
        }

        .optionChange {
            display: block;
            position: absolute;
            top: 40px;
            left: 48px;
            padding: 5px 10px;
            /* background-color: #3c3c3c; */
            background-color: #44494e;
            border-radius: 4px;
            min-width: 160px;
            box-shadow: 2px 2px 4px #414141;
            z-index: 10;

            .changePassword {

                h1 {
                    font-size: 1.8rem;
                    color: white;
                    line-height: 2.1rem;
                    margin-bottom: 14px;
                    margin-top: 5px;
                    cursor: pointer;
                }
            }

            .changeAvatar {

                h1 {
                    font-size: 1.8rem;
                    color: white;
                    line-height: 2.1rem;
                    margin-bottom:14px;
                    cursor: pointer;
                }
            }

            .logOut {
                
                h1 {
                    font-size: 1.8rem;
                    color: white;
                    line-height: 2.1rem;
                    margin-bottom:5px;
                    cursor: pointer;
                }
            }
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

    // Popups

    .popups {
        display: flex;
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

    .active {
        transform: translateY(-5px);
        transition: transform 0.3s ease-in-out;
    }
`

export {
    Div
}