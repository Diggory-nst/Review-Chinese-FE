
import { Div } from "../../assets/styles/admin/createVocal";

import IonIcon from "@reacticons/ionicons";
import axios from "axios";
import configDomain from "../../configs/config.domain";
import setHeadersRequest from "../../utils/setHeadersRequest";
import { useState, useRef, useEffect } from "react";
import getAxiosErrorMessage from '../../utils/getAxiosErrorMessage';

interface FormAddItem {
    tuonghinh: string,
    pinyin: string,
    type: string,
    meaning: string,
    audio: any,
    example: string
}

interface ChoiceBook {
    book: string,
    lesson: string
}

type FormAddItemKey = keyof FormAddItem;

const CreateVocal = () => {

    const domain = configDomain?.domain
    const headers = setHeadersRequest()

    const [isError, setIsError] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>('')

    const [arrItemVocal, setArrayItemVocal] = useState<FormAddItem[]>([{
        tuonghinh: '',
        pinyin: '',
        type: '',
        meaning: '',
        audio: null,
        example: ''
    }])

    const [choiceBook, setChoiceBook] = useState<ChoiceBook>({
        book: '',
        lesson: ''
    })

    // Mode selection state: Manual vs Excel
    const [inputMode, setInputMode] = useState<'manual' | 'excel'>('manual');
    const [excelFile, setExcelFile] = useState<File | null>(null);

    const tagAudioRef = useRef<HTMLInputElement | null>(null)
    const tagExcelRef = useRef<HTMLInputElement | null>(null)

    const handleRemoveItemVocal = (index: number) => {
        setArrayItemVocal(prev => prev.filter((_, i) => i !== index))
    }

    const handleAddItemVocal = () => {
        const newItemVocal = {
            tuonghinh: '',
            pinyin: '',
            type: '',
            meaning: '',
            audio: null,
            example: '',
        }
        setArrayItemVocal(prev => [...prev, newItemVocal])
    }

    const handleChange = (e: any, index: number) => {
        const newArrItemVocal = [...arrItemVocal]
        const { name, value } = e.target;
        const key = name as FormAddItemKey; // Type assertion
        newArrItemVocal[index][key] = value
        setArrayItemVocal(newArrItemVocal)
    }

    const handleFileChange = (index: number, field: FormAddItemKey, files: any) => {
        const newArrItemVocal = [...arrItemVocal]
        newArrItemVocal[index][field] = files[0]
        setArrayItemVocal(newArrItemVocal)
    }

    const handleExcelFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setExcelFile(e.target.files[0]);
        }
    }

    const handleChoiceBook = (e: any) => {
        setChoiceBook(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const submitForm = async () => {

        if (choiceBook.book == '' || choiceBook.lesson == '') {
            setIsError(true)
            setMessageError('Please Enter Book Name and Lesson')
            return
        } else {
            setIsError(false)
        }

        if (inputMode === 'excel') {
            if (!excelFile) {
                setIsError(true);
                setMessageError('Please select an Excel file');
                return;
            }

            const formData = new FormData();
            formData.append('book', choiceBook.book);
            formData.append('lesson', choiceBook.lesson);
            formData.append('file', excelFile);

            try {
                const url = `${domain}/admin/createVocabularyByExcel`;
                const response = await axios.post(url, formData, {
                    headers: {
                        ...headers,
                        "Content-Type": 'multipart/form-data'
                    }
                });

                alert(`Import successful! Imported ${response.data.metadata.importedCount} words.`);

                setChoiceBook({ book: '', lesson: '' });
                setExcelFile(null);
                if (tagExcelRef.current) tagExcelRef.current.value = '';

            } catch (error: any) {
                setIsError(true);
                setMessageError(getAxiosErrorMessage(error, 'Import failed'));
            }
            return;
        }

        // Manual Input Logic
        const url = `${domain}/admin/createVocabulary`
        const arrAudio: any[] = []
        arrItemVocal.map(item => {
            arrAudio.push(item.audio)
        })

        const formData = new FormData()

        formData.append('book', choiceBook.book);
        formData.append('lesson', choiceBook.lesson);

        arrItemVocal.forEach((elm, index) => {
            formData.append(`vocals[${index}][tuonghinh]`, elm.tuonghinh);
            formData.append(`vocals[${index}][pinyin]`, elm.pinyin);
            formData.append(`vocals[${index}][type]`, elm.type);
            formData.append(`vocals[${index}][meaning]`, elm.meaning);
            formData.append(`vocals[${index}][example]`, elm.example);
        })

        for (let i = 0; i < arrAudio.length; i++) {

            if (arrAudio[i] == null) {
                formData.append("audio", new Blob(), "emptyfile");
            } else {
                const fileName = encodeURIComponent(arrAudio[i].name); // Encode filename in UTF-8
                formData.append("audio", arrAudio[i], fileName);
            }
            // Append the file with the properly encoded filename
        }

        try {
            await axios.post(url, formData, {
                headers: {
                    ...headers,
                    "Content-Type": 'multipart/form-data'
                }
            })

            setChoiceBook({
                book: '',
                lesson: ''
            })
            setArrayItemVocal([{
                tuonghinh: '',
                pinyin: '',
                type: '',
                meaning: '',
                audio: null,
                example: ''
            }])

            if (!tagAudioRef.current) return

            tagAudioRef.current.value = ''

        } catch (error: any) {
            setIsError(true);
            setMessageError(getAxiosErrorMessage(error))
        }
    }

    // Navigate input text using arrow key

    const [active, setActive] = useState<number>(0)
    const [sectionNavigate, setSectionNavigate] = useState<string>('')
    const itemRef = useRef<HTMLDivElement | null>(null);

    const reCalculate = (e: KeyboardEvent, section: string) => {

        if (!itemRef.current) return;
        const columns = itemRef.current.querySelectorAll('.navigate').length;
        let temp = active;

        // Bản đã optimization
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            const direction = e.key === 'ArrowUp' ? -1 : 1;
            while (temp + direction >= 0 && temp + direction < columns) {
                temp += direction;
                const input = itemRef.current.querySelectorAll('.navigate')[temp].querySelector<HTMLInputElement | HTMLTextAreaElement>(`input[name="${section}"], textarea[name="${section}"]`);
                if (input) {
                    setActive(temp);
                    input.focus();
                    input.select();
                    break;
                }
            }
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
                reCalculate(e, sectionNavigate);
                e.preventDefault();
            }
        };

        document.addEventListener('keydown', handleKeyDown as unknown as EventListener);

        return () => {
            document.removeEventListener('keydown', handleKeyDown as unknown as EventListener);
        };
    }, [active, sectionNavigate]);

    const handleClickNavigate = (index: number, section: string) => {
        setSectionNavigate(section);
        setActive(index);
    };

    return (

        <Div className="create-vocal">
            <div className="choice-book">
                <div className="book">
                    <h1>Quyển : </h1>
                    <input type="text" name="book" value={choiceBook.book} onChange={handleChoiceBook} />
                </div>
                <div className="lesson">
                    <h1>Bài : </h1>
                    <input type="text" name="lesson" value={choiceBook.lesson} onChange={handleChoiceBook} />
                </div>
            </div>

            <div className="mode-switch" style={{ margin: '20px 0', display: 'flex', gap: '10px' }}>
                <button
                    onClick={() => setInputMode('manual')}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: inputMode === 'manual' ? '#007bff' : '#f0f0f0',
                        color: inputMode === 'manual' ? 'white' : 'black',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Nhập Thủ Công
                </button>
                <button
                    onClick={() => setInputMode('excel')}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: inputMode === 'excel' ? '#007bff' : '#f0f0f0',
                        color: inputMode === 'excel' ? 'white' : 'black',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Nhập Excel
                </button>
            </div>

            {inputMode === 'manual' ? (
                <div className="compose-lesson">
                    <div className="list-vocal" ref={itemRef}>
                        {arrItemVocal.map((item, index) => {
                            const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                handleChange(e, index);

                            const handleNavigateClick = (field: FormAddItemKey) => () =>
                                handleClickNavigate(index, field);

                            const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
                                handleFileChange(index, 'audio', e.target.files);
                            return (
                                <div className="item-vocal navigate" key={index}>
                                    <div className="tag-input">
                                        <input
                                            type="text"
                                            placeholder="Tượng Hình"
                                            value={item.tuonghinh}
                                            name="tuonghinh"
                                            onChange={handleInputChange}
                                            onClick={handleNavigateClick('tuonghinh')}
                                            autoComplete="off"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Pinyin"
                                            value={item.pinyin}
                                            name="pinyin"
                                            onChange={handleInputChange}
                                            onClick={handleNavigateClick('pinyin')}
                                            autoComplete="off"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Loại Từ"
                                            value={item.type}
                                            name="type"
                                            className="typeInput"
                                            onChange={handleInputChange}
                                            onClick={handleNavigateClick('type')}
                                            autoComplete="off"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Nghĩa"
                                            value={item.meaning}
                                            name="meaning"
                                            className="meaningInput"
                                            onChange={handleInputChange}
                                            onClick={handleNavigateClick('meaning')}
                                            autoComplete="off"
                                        />
                                        <input
                                            type="file"
                                            id="file-am-thanh"
                                            name="audio"
                                            placeholder="Âm Thanh"
                                            ref={tagAudioRef}
                                            onChange={handleFileInputChange}
                                            onClick={handleNavigateClick('audio')}
                                        />
                                        <IonIcon name="close-outline" id="icon-remove-item-vocal" onClick={() => handleRemoveItemVocal(index)}></IonIcon>
                                    </div>
                                    <div className="tag-area">
                                        <textarea
                                            placeholder="Ví Dụ"
                                            value={item.example}
                                            name="example"
                                            onChange={handleInputChange}
                                            onClick={handleNavigateClick('example')}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="add-new">
                        <IonIcon name="add-outline" id="icon-add" onClick={handleAddItemVocal}></IonIcon>
                    </div>
                </div>
            ) : (
                <div className="excel-import" style={{ padding: '20px', border: '2px dashed #ccc', borderRadius: '10px', textAlign: 'center' }}>
                    <h3>Chọn file Excel để nhập từ vựng</h3>
                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        style={{ marginTop: '10px' }}
                        onChange={handleExcelFileChange}
                        ref={tagExcelRef}
                    />
                    <p style={{ marginTop: '10px', color: '#666', fontSize: '0.9em' }}>
                        * Định dạng file: [Tượng Hình] [Pinyin] [Loại từ] [Nghĩa] [Ví dụ]
                    </p>
                </div>
            )}

            {isError &&
                <p className="error">{messageError}</p>
            }
            <div className="save">
                <h1 onClick={submitForm}>SAVE</h1>
            </div>
        </Div>
    )
}

export default CreateVocal;



