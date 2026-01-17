import styled from "styled-components";

const Nav = styled.nav`

    margin-top: 18px;
    display: flex;
    justify-content: center;

    ul {
        display: flex;
        padding: 9px 7px;
        border-radius: 12px;
        background-color: #4d4d4dde;

        li {
            border: 1px solid #4e4e4e;
            padding: 6px 10px;
            border-radius: 8px;
            background-color: #3e3e3ea6;
        }

        .isActive{
            border-color: #ffffffcf;
        }

        li:nth-child(2) {
            margin-left: 12px;
            margin-right: 12px;
        }

        li>h1{
            font-size: 1.6rem;
            line-height: 2rem;
            color: white;
            user-select: none;
        }
    }

`

export {
    Nav
}