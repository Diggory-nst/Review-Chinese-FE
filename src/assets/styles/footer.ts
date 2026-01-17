import styled from "styled-components";

const Div = styled.footer`

    margin-bottom: 20px;

    .support {
        display: flex;
        align-items: center;
        justify-content: space-around;

        a, h1 {
            font-size: 2.2rem;
            line-height: 2.5rem;
        }
    }

    .copyright {
        cursor: default;
    }

    // Responsive for mobile
    @media (max-width: 768px) {

        margin-top: 18px;
        margin-bottom: 0px;
        background-color: #3c3c3c;
        

        .support {
            display: flex;
            align-items: center;
            justify-content: space-around;
            padding: 10px 0;

            .info-support {
                display: none;
            }

            .copyright {
                h1 {
                    margin-bottom: 0;
                }
            }

            h1, a{
                color: white;
                font-size: 1.8rem;
                line-height: 2.2rem;
            }
        }
    }
`

export {
    Div
}