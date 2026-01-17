import { useCallback, useEffect, useState } from "react";
import Div from "../assets/styles/listBookMobile";

interface Props {
    dataBook: Array<{
        book: {
            _id: string;
            name: string;
        };
        lesson: Array<{
            _id: string;
            name: string;
        }>;
    }>;
    endLessonReview?: boolean; // Biến Optional
    onLessonClick: (bookId: string, lessonId: string) => void;
}

const ListBookMobile: React.FC<Props> = ({ dataBook, endLessonReview, onLessonClick }) => {

    const [expandedBookId, setExpandedBookId] = useState<string | null>(null);
    const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

    const [showBooks, setShowBooks] = useState<boolean>(false)
    const [shouldRender, setShouldRender] = useState(false); // State để kiểm soát việc render thực tế
    const [isAnimatingOut, setIsAnimatingOut] = useState(false); // State để kích hoạt fadeOut

    // Effect để quản lý quá trình vào/ra
    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;

        if (showBooks) { // Nếu showBooks là true, bắt đầu hiển thị
            setShouldRender(true);
            setIsAnimatingOut(false); // Đảm bảo không có animation fadeOut
        } else if (shouldRender) { // Nếu showBooks là false VÀ phần tử đang hiển thị, bắt đầu fadeOut
            setIsAnimatingOut(true);
            // Đặt timeout để đợi animation fadeOut hoàn thành (phải khớp với thời gian animation fadeOut trong CSS)
            timeoutId = setTimeout(() => {
                setShouldRender(false); // Sau khi fadeOut, xóa khỏi DOM
                setIsAnimatingOut(false); // Đặt lại state
            }, 500); // Đặt thời gian này bằng thời gian của animation fadeOut (ví dụ: 0.5s = 500ms)
        }

        return () => {
            // Dọn dẹp timeout nếu component unmount hoặc showBooks thay đổi nhanh
            clearTimeout(timeoutId);
        };
    }, [showBooks, shouldRender]);

    // Logic Click Outside

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const btnChoseElement = document.querySelector('.btnChose');
            const booksElement = document.querySelector('.books');
            if (btnChoseElement && !btnChoseElement.contains(event.target as Node) && booksElement && !booksElement.contains(event.target as Node)) {
                setShowBooks(false);
            }
        };

        if (showBooks) {
            window.addEventListener('click', handleClickOutside);
        }

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [showBooks]);

    const handleShowBooks = () => {
        setShowBooks(prev => !prev);
        if (endLessonReview) {
            setActiveLessonId(null)
        }
    }

    const handleExpandBook = useCallback((bookId: string) => {
        setExpandedBookId(prevId => (prevId === bookId ? null : bookId));
    }, []);

    const handleLessonClick = (bookId: string, lessonId: string) => {
        onLessonClick(bookId, lessonId);
        setActiveLessonId(lessonId);
        setShowBooks(false);
    };

    return (
        <Div>
            <div className="btnChose" onClick={handleShowBooks}>
                <h2>Danh Sách</h2>
            </div>
            {shouldRender && ( // Chỉ render khi shouldRender là true
                <div className={`books ${isAnimatingOut ? 'fade-out' : 'fade-in'}`}>
                    {dataBook.map((item, indexBook) => {
                        const isExpanded = expandedBookId === item.book._id;
                        return (
                            <div className="itemBook" key={indexBook}>
                                <h1 className="nameBook" onClick={() => handleExpandBook(item.book._id)}>{item.book.name}</h1>
                                {isExpanded && (
                                    <div className="listLesson">
                                        {item.lesson.map((lesson) => (
                                            <h2
                                                style={{ color: activeLessonId === lesson._id ? '#5184bb' : 'black' }}
                                                className="nameLesson"
                                                key={lesson._id}
                                                onClick={() => handleLessonClick(item.book._id, lesson._id)}
                                            >
                                                {lesson.name}
                                            </h2>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            )}
        </Div>
    );
};

export default ListBookMobile;