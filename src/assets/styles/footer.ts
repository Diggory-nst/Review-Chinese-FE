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
    @media (max-width: 575px) {

        margin-top: 20px;
        

        .support {
            display: flex;
            flex-direction: column;

            .info-support {
                margin-bottom: 12px;
            }

            .link-facebook {
                margin-bottom: 12px;
            }

            .copyright {
                h1 {
                    margin-bottom: 0;
                }
            }
        }
    }
`

export {
    Div
}