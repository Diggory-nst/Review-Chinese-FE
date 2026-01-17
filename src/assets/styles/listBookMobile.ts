import styled from "styled-components";

const Div = styled.div`

    margin-bottom: 16px;

    .btnChose {

        display: flex;
        width: 42%;
        justify-content: center;
        border: 1px solid #0000006e;
        border-radius: 28px;
        padding: 8px 0px;
        user-select: none;

        h2 {
            font-size: 1.8rem;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateX(-10px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(10px); /* Hiệu ứng trượt lên nhẹ nhàng */
        }
    }

    .books {
        
        width: 52%;
        max-height: 60vh;
        margin-right: 0;
        padding: 15px 10px;
        border-radius: 4px;
        background-color: #e2e5ea;
        position: absolute;
        top: 2px;
        left: 50%;
        z-index: 3;
        overflow-y: auto;
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
        box-shadow: -2px 5px 9px -3px #202020b0;

        .nameBook {
            font-size: 2rem;
            line-height: 2.4rem;
            margin-bottom: 16px;
            text-align: center;
            cursor: pointer;
            color: #527f4f;
            user-select: none;
        }

        .listLesson {
            text-align: center;
            cursor: pointer;
        }

        .nameLesson {
            font-size: 1.8rem;
            line-height: 2.2rem;
            margin-bottom: 12px;
        }
    }

    /* Áp dụng animation cho class khi xuất hiện */
    .books.fade-in {
        animation: fadeIn 0.5s ease-in-out forwards; /* 'forwards' để giữ trạng thái cuối cùng */
    }

    /* Áp dụng animation cho class khi biến mất */
    .books.fade-out {
        animation: fadeOut 0.5s ease-in-out forwards; /* 'forwards' để giữ trạng thái cuối cùng */
    }
`

export default Div;