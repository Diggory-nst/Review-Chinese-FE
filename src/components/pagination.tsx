import { useState } from "react";
import { Div } from "../assets/styles/pagination";

interface Props {
    totalDc: number,
    limitPage: number,
    shareCurrentPage: (currentPage: number) => void
}

const Pagination: React.FC<Props> = ({ totalDc, limitPage, shareCurrentPage }) => {

    const totalPage = Math.ceil(totalDc / limitPage);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [startPage, setStartPage] = useState<number>(1);
    const [midPage, setMidPage] = useState<number>(2);
    const [endPage, setEndPage] = useState<number>(3);
    const [fastPage, setFastPage] = useState<string>('');

    const arrPages = Array.from({ length: totalPage }, (_, index) => index + 1);

    const updatePageRange = (page: number) => {
        const conditionA = (page === endPage || (page === startPage && page > 1));
        const conditionB = ((page + 1) < (totalPage - 2));
        if (conditionA && conditionB) {
            setStartPage(page - 1);
            setMidPage(page);
            setEndPage(page + 1);
        }
    };

    const handlePageChange = (page: number) => {
        // dispatch(shareCurrentPage({ currentPage: page }));
        shareCurrentPage(page)
        setCurrentPage(page);
        updatePageRange(page);
    };

    const handleNextPage = () => {
        if (currentPage < totalPage) {
            handlePageChange(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    const handleFastPage = () => {
        if (!fastPage) return;
        const page = Number(fastPage);
        handlePageChange(page);
        setFastPage('');
    };

    return (
        <Div className="pagination">
            <p className="control prev" onClick={handlePrevPage}>&lt;</p>
            <div className="number-page">
                {totalPage > 6 ?
                    <>
                        <p className={currentPage === startPage ? 'act' : 'inact'} onClick={() => handlePageChange(startPage)}>{startPage}</p>
                        <p className={currentPage === midPage ? 'act' : 'inact'} onClick={() => handlePageChange(midPage)}>{midPage}</p>
                        <p className={currentPage === endPage ? 'act' : 'inact'} onClick={() => handlePageChange(endPage)}>{endPage}</p>
                        {endPage < (totalPage - 3) && <p>...</p>}
                        <p className={currentPage === (totalPage - 2) ? 'act' : 'inact'} onClick={() => handlePageChange(totalPage - 2)}>{totalPage - 2}</p>
                        <p className={currentPage === (totalPage - 1) ? 'act' : 'inact'} onClick={() => handlePageChange(totalPage - 1)}>{totalPage - 1}</p>
                        <p className={currentPage === totalPage ? 'act' : 'inact'} onClick={() => handlePageChange(totalPage)}>{totalPage}</p>
                    </>
                    :
                    arrPages.map(pageNumber => (
                        <p key={pageNumber} className={currentPage === pageNumber ? 'act' : 'inact'} onClick={() => handlePageChange(pageNumber)}>{pageNumber}</p>
                    ))
                }
            </div>
            <p className="control next" onClick={handleNextPage}>&gt;</p>
            <div className="custom-page">
                <input type="text" value={fastPage} onChange={e => setFastPage(e.target.value)} />
                <p onClick={handleFastPage}>Đi</p>
            </div>
        </Div>
    );
};

export default Pagination;
