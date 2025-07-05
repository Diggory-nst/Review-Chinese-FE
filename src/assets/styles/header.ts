import styled from "styled-components";

const Div = styled.header`

    background-color: black;
    margin-bottom: 30px;

    /* responsive for desktop */

    .container-for-desktop {
        padding-top: 20px;
        padding-bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .container-for-tablet {
        display: none;
    }
    
    .container-for-mobile {
        display: none;
    }

    .dark-mode {

        display: flex;
        align-items: center;

        .icon-light {
            width: 25px !important;
            height: 25px !important;
            margin-right: 15px;
            color: white;
            cursor: pointer;
        }

        .icon-dark {
            width: 25px !important;
            height: 25px !important;
            color: white;
            cursor: pointer;
        }
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

    .login {

        display: flex;
        align-items: center;

        .dark-mode {
            margin-right: 30px;
        }

        .signin {
            margin-right: 25px;

            a {
                font-size: 2rem;
                color: white;
                cursor: pointer;
            }
        }

        .register {
            a {
                font-size: 2rem;
                color: white;
                cursor: pointer;
            }
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

        .name-account {
            font-size: 2rem;
            line-height: 2.3rem;
            color: white;
            user-select: none;
        }

        .option-change {
            display: none; // block
            /* opacity: 0; */
            position: absolute;
            top: 40px;
            left: 48px;
            padding: 5px 10px;
            background-color: #3c3c3c;
            border-radius: 4px;
            width: 138px;
            box-shadow: 2px 2px 4px #414141;
            /* transition: opacity 0.8s, display 0.8s; */
            z-index: 10;

            .change-password {
                
                h1 {
                    font-size: 1.8rem;
                    color: white;
                    line-height: 2.1rem;
                    margin-bottom: 14px;
                    margin-top: 5px;
                    cursor: pointer;
                }
            }

            .change-avatar {
                
                h1 {
                    font-size: 1.8rem;
                    color: white;
                    line-height: 2.1rem;
                    margin-bottom:14px;
                    cursor: pointer;
                }
            }

            .log-out {
                
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

    /* .account:hover {
        .option-change {
            opacity: 1;
            display: block;
        }
    }

    @starting-style {
        .account:hover {
            .option-change {
                opacity: 0;
            }
        }
    } */

    .popup-change-avatar {
        display: none; // flex: ;
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

        .change-avatar {
            display: none;
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

            .save-avatar {
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

        .change-password {
            display: none;
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

            .form-change-password {
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

            .save-password {
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

        .error-change {
            font-size: 1.6rem !important;
            line-height: 1.8rem !important;
            text-align: center !important;
            margin-top: 20px !important;
            color: #003fc3 !important;
            margin-bottom: 0 !important;
        }

    }

    /* resposive for mobile */

    /* responsive for tablet */
    @media (min-width:800px) and (max-width:1023px) {
        .container-for-desktop {
            display: none;
        }

        .container-for-tablet {
            padding-top: 20px;
            padding-bottom: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .container-for-mobile {
            display: none;
        }

        .navigation {
            display: flex;
            align-items: center;
            position: relative;
            
            #icon-navbar {
                font-size: 3.5rem;
                color: white;
            }

            .category {
                display: none; // block
                /* opacity: 0; */
                position: absolute;
                top: 40px;
                left: 12px;
                /* top: 120.5%;
                left: 42.5%; */
                padding: 15px 12px;
                background-color: #4c4c4c;
                border-radius: 4px;
                width: 168px;
                box-shadow: 2px 2px 4px #505050;
                /* transition: opacity 0.8s, display 0.8s; */

                .dark-mode {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 15px;
                    padding-bottom: 12px;
                    border-bottom: 1px solid white;

                    .icon-light {
                        margin-right: 20px;
                    }
                }

                .navbar {
                    
                    h1 {
                        font-size: 2.2rem;
                        line-height: 2.5rem;
                        margin-bottom: 15px;
                        color: white;
                        user-select: none;
                    }

                    h1:nth-child(5) {
                        margin-bottom: 0;
                    }
                }
            }
        }

        .logo {

            h1 {
                font-size: 3.2rem;
                line-height: 3.5rem;
            }
        }

        .account {

            .icon-avatar {
                width: 26px !important;
                height: 26px !important;
                margin-right: 14px;
            }

            img {
                width: 26px !important;
                height: 26px !important;
            }

            .name-account {
                font-size: 2rem;
                line-height: 2.3rem;
                user-select: none;
            }

            .option-change {
                left: 0;
            }
        }
    }

    /* responsive for mobile */

    @media (max-width: 575px) {
        .container-for-desktop {
            display: none;
        }

        .container-for-tablet {
            display: none;
        }

        .container-for-mobile {
            padding-top: 20px;
            padding-bottom: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .navigation {
            display: flex;
            align-items: center;
            width: 100%;
            position: relative;
            
            #icon-navbar {
                font-size: 3.5rem;
                color: white;
                flex-shrink: 0;
            }

            .category {
                display: none; // block
                /* opacity: 0; */
                position: absolute;
                top: 110%;
                left: 4%;
                padding: 15px 12px;
                background-color: #4c4c4c;
                border-radius: 4px;
                width: 168px;
                box-shadow: 2px 2px 4px #505050;
                z-index: 10;
                /* transition: opacity 0.8s, display 0.8s; */

                .login {
                    flex-direction: column;
                    padding-bottom: 16px;
                    margin-bottom: 12px;
                    border-bottom: 1px solid white;

                    .signin {
                        margin-right: 0;
                        margin-bottom: 14px;
                    }
                }

                .dark-mode {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 15px;
                    padding-bottom: 12px;
                    border-bottom: 1px solid white;

                    .icon-light {
                        margin-right: 20px;
                    }
                }

                .navbar {
                    
                    h1 {
                        font-size: 2.2rem;
                        line-height: 2.5rem;
                        margin-bottom: 15px;
                        color: white;
                        user-select: none;
                    }

                    h1:nth-child(5) {
                        margin-bottom: 0;
                    }
                }
            }
        }

        .logo {

            position: absolute;
            left: 50%;
            transform: translateX(-50%);

            h1 {
                font-size: 3.2rem;
                line-height: 3.5rem;
            }
        }

        .account {

            .icon-avatar {
                width: 26px !important;
                height: 26px !important;
                margin-right: 14px;
            }

            img {
                width: 26px !important;
                height: 26px !important;
            }

            .name-account {
                font-size: 2rem;
                line-height: 2.3rem;
                user-select: none;
            }

            .option-change {
                top: 106%;
                left: 100%;
            }
        }
    }
`

export {
    Div
}