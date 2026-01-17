import { useState, useEffect } from 'react';

/**
 * Custom hook để theo dõi kích thước của cửa sổ trình duyệt.
 * @returns {object} Một object chứa `width` và `height` của cửa sổ.
 * Ví dụ: { width: 1920, height: 1080 }
 */
interface WindowSize {
    width: number | undefined;
    height: number | undefined;
}

function useWindowSize(): WindowSize {
    // 1. Khởi tạo state với width và height ban đầu
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        // 2. Định nghĩa một hàm để xử lý sự kiện resize
        function handleResize() {
            // Cập nhật state với kích thước mới của cửa sổ
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // 3. Thêm một Event Listener để lắng nghe sự kiện 'resize'
        window.addEventListener('resize', handleResize);

        // Gọi handleResize ngay lần đầu để lấy kích thước ban đầu
        handleResize();

        // 4. Dọn dẹp: Gỡ bỏ Event Listener khi component bị unmount
        // Điều này rất quan trọng để tránh rò rỉ bộ nhớ (memory leak)
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Mảng rỗng [] đảm bảo effect này chỉ chạy một lần lúc mount và unmount

    return windowSize;
}

export default useWindowSize;
