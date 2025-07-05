
import { Div } from "../../assets/styles/admin/createVocal";

import IonIcon from "@reacticons/ionicons";
import axios from "axios";
import configDomain from "../../configs/config.domain";
import setHeadersRequest from "../../utils/setHeadersRequest";
import { useState, useRef, useEffect } from "react";

interface FormAddItem {
    tuonghinh: string,
    pinyin: string,
    meaning: string,
    audio: any,
    example: string,
    structureChinese: string
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
        meaning: '',
        audio: null,
        example: '',
        structureChinese: ''
    }])

    const [choiceBook, setChoiceBook] = useState<ChoiceBook>({
        book: '',
        lesson: ''
    })

    const tagAudioRef = useRef<HTMLInputElement | null>(null)

    const handleRemoveItemVocal = (index: number) => {
        setArrayItemVocal(prev => prev.filter((_, i) => i !== index))
    }

    const handleAddItemVocal = () => {
        const newItemVocal = {
            tuonghinh: '',
            pinyin: '',
            meaning: '',
            audio: null,
            example: '',
            structureChinese: ''
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

        const url = `${domain}/admin/createVocabulary`
        const arrAudio: any[] = []
        arrItemVocal.map(item => {
            arrAudio.push(item.audio)
        })

        const formData = new FormData()

        formData.append('book', choiceBook.book);
        formData.append('lesson', choiceBook.lesson);

        arrItemVocal.forEach(elm => {
            formData.append('tuonghinh', elm.tuonghinh);
            formData.append('pinyin', elm.pinyin);
            formData.append('meaning', elm.meaning);
            formData.append('example', elm.example);
            formData.append('structureChinese', elm.structureChinese);
        })

        for (let i = 0; i < arrAudio.length; i++) {
            const fileName = encodeURIComponent(arrAudio[i].name); // Encode filename in UTF-8
            // Append the file with the properly encoded filename
            formData.append("audio", arrAudio[i], fileName);
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
                meaning: '',
                audio: null,
                example: '',
                structureChinese: ''
            }])
            if (!tagAudioRef.current) return
            tagAudioRef.current.value = ''
        } catch (error: any) {
            setIsError(true);
            setMessageError(error.response.data.message)
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

        // Bản gốc

        // if (e.key === 'ArrowUp') { // move up
        //     while (temp > 0) {
        //         temp -= 1;
        //         const input = itemRef.current.querySelectorAll('.navigate')[temp].querySelector<HTMLInputElement>(`input[name="${section}"], textarea[name="${section}"]`)
        //         if (input) {
        //             setActive(temp);
        //             input.focus();
        //             input.select();
        //             break;
        //         }
        //     }
        // } else if (e.key === 'ArrowDown') { // move down
        //     while (temp < columns - 1) {
        //         temp += 1;
        //         const input = itemRef.current.querySelectorAll('.navigate')[temp].querySelector<HTMLInputElement>(`input[name="${section}"], textarea[name="${section}"]`)
        //         if (input) {
        //             setActive(temp);
        //             input.focus();
        //             input.select();
        //             break;
        //         }
        //     }
        // }
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
                                    />
                                    <input
                                        type="text"
                                        placeholder="Pinyin"
                                        value={item.pinyin}
                                        name="pinyin"
                                        onChange={handleInputChange}
                                        onClick={handleNavigateClick('pinyin')}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Nghĩa"
                                        value={item.meaning}
                                        name="meaning"
                                        onChange={handleInputChange}
                                        onClick={handleNavigateClick('meaning')}
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
                                    <textarea
                                        placeholder="Cấu Tạo Từ"
                                        value={item.structureChinese}
                                        name="structureChinese"
                                        onChange={handleInputChange}
                                        onClick={handleNavigateClick('structureChinese')}
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