// src/components/ExcelImporter.tsx
import React, { useState } from 'react';
import * as XLSX from 'xlsx';

// 1. Định nghĩa cấu trúc cho một item từ vựng
// Thêm hoặc sửa các trường này để khớp với các cột trong file Excel của bạn
interface VocabularyItem {
    tuonghinh: string;
    pinyin: string;
    nghia: string;
    vidu?: string; // Dấu ? cho biết trường này là tùy chọn
    [key: string]: string | undefined; // Cho phép các cột khác không xác định trước
}

const ExcelImporter: React.FC = () => {
    // 2. Áp dụng kiểu dữ liệu cho state
    const [vocabularyData, setVocabularyData] = useState<VocabularyItem[]>([]);
    const [fileName, setFileName] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // 3. Áp dụng kiểu cho tham số 'event'
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Dùng optional chaining an toàn hơn
        if (!file) {
            return;
        }

        setFileName(file.name);

        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];

            // Ép kiểu kết quả sang mảng VocabularyItem[]
            const jsonData = XLSX.utils.sheet_to_json<VocabularyItem>(worksheet);

            setVocabularyData(jsonData);
        };
        reader.readAsArrayBuffer(file);
    };

    const handleSubmit = async (): Promise<void> => {
        if (vocabularyData.length === 0) {
            alert("Vui lòng chọn file Excel có dữ liệu.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/words/bulk-create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    book: "id_sach_abc",
                    lesson: "id_bai_hoc_xyz",
                    vocabulary: vocabularyData,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                alert(`Thành công! Đã thêm từ vựng.`);
                setVocabularyData([]);
                setFileName('');
                // Reset file input
                const fileInput = document.getElementById('excel-file-input') as HTMLInputElement;
                if (fileInput) {
                    fileInput.value = '';
                }
            } else {
                alert(`Lỗi từ server: ${result.message}`);
            }
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu:", error);
            alert("Không thể kết nối đến server. Vui lòng kiểm tra lại.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ fontFamily: 'sans-serif', maxWidth: '600px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Import Từ Vựng Bằng Excel (TypeScript)</h2>

            <label htmlFor="excel-file-input" style={{
                display: 'inline-block', padding: '10px 15px', backgroundColor: '#28a745',
                color: 'white', borderRadius: '5px', cursor: 'pointer'
            }}>
                Chọn File Excel
            </label>
            <input
                id="excel-file-input" type="file" accept=".xlsx, .xls"
                onChange={handleFileChange} style={{ display: 'none' }}
            />
            {fileName && <p style={{ marginLeft: '10px', display: 'inline' }}>File đã chọn: <strong>{fileName}</strong></p>}

            <button
                onClick={handleSubmit} disabled={vocabularyData.length === 0 || isLoading}
                style={{
                    display: 'block', width: '100%', padding: '12px', fontSize: '16px',
                    backgroundColor: isLoading ? '#6c757d' : '#007bff', color: 'white',
                    border: 'none', borderRadius: '5px', marginTop: '20px', cursor: 'pointer'
                }}
            >
                {isLoading ? 'Đang gửi...' : 'Gửi Dữ Liệu Lên Server'}
            </button>

            {vocabularyData.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                    <h4>Xem trước dữ liệu ({vocabularyData.length} dòng):</h4>
                    <pre style={{
                        backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', padding: '10px',
                        maxHeight: '300px', overflowY: 'auto'
                    }}>
                        {JSON.stringify(vocabularyData, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
};

export default ExcelImporter;