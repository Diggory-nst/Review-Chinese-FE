import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { Div } from "../../assets/styles/admin/createGrammar";
import { useEffect, useRef, useState } from "react";
import configDomain from "../../configs/config.domain";
import setHeadersRequest from "../../utils/setHeadersRequest";
import axios from "axios";

interface ChoiceBook {
    book: string,
    lesson: string
}

const CreateGrammar = () => {

    const domain = configDomain?.domain
    const headers = setHeadersRequest()

    const [isError, setIsError] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>('')

    const editorRef = useRef<any>(null)
    const [choiceBook, setChoiceBook] = useState<ChoiceBook>({
        book: '',
        lesson: ''
    })

    const handleChange = (e: any) => {
        setChoiceBook(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const submitData = async () => {
        const dataEditor = editorRef.current.getEditor().root.innerHTML;

        if (choiceBook.book == '' || choiceBook.lesson == '') {
            setIsError(true)
            setMessageError('Please Enter Book Name and Lesson')
            return
        } else {
            setIsError(false)
        }

        console.log(dataEditor)

        const url = `${domain}/admin/createGrammar`
        const data = {
            book: choiceBook.book,
            lesson: choiceBook.lesson,
            dataEditor,
        }

        try {
            await axios.post(url, data, { headers })
            editorRef.current.getEditor().setText('');
            setChoiceBook({
                book: '',
                lesson: ''
            })
        } catch (error: any) {
            setIsError(true)
            setMessageError(error.response.data.message)
        }
    }

    // Setup React Quill

    useEffect(() => {
        const quill = editorRef.current?.getEditor();
        if (quill) {
            // Tất cả text mới sẽ là 'normal'
            quill.format('font-size', 'normal');

            // Nếu muốn, gắn luôn class cho root
            quill.root.classList.add('ql-font-size-normal');
        }
    }, []);

    // Import Parchment từ Quill
    const Parchment = Quill.import('parchment');
    const ClassAttributor = Parchment.Attributor.Class;

    // Tạo một class Attributor mới cho font size
    // 'font-size' là tên class, ví dụ: ql-font-size-large
    // Sau đó sử dụng nó để tạo instance mới
    let SizeClass = new ClassAttributor('font-size', 'ql-font-size', {
        scope: Parchment.Scope.INLINE,
        whitelist: ['normal', 'large', 'huge'],
        defaultValue: 'normal'
    });

    Quill.register(SizeClass, true);

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'font-size': ['normal', 'large', 'huge'] }],
            [{ align: [] }, { color: [] }, { background: [] }],
            [{ indent: '-1' }, { indent: '+1' }],
        ],
        clipboard: {
            matchVisual: false
        }
    }

    return (
        <Div className="create-grammar">
            <div className="choice-book">
                <div className="book">
                    <h1>Quyển : </h1>
                    <input type="text" name="book" value={choiceBook.book} onChange={handleChange} />
                </div>
                <div className="lesson">
                    <h1>Bài : </h1>
                    <input type="text" name="lesson" value={choiceBook.lesson} onChange={handleChange} />
                </div>
            </div>
            <div className="write-grammar">
                <ReactQuill
                    theme="snow"
                    ref={editorRef}
                    modules={modules}
                />
            </div>
            {isError &&
                <p className="error">{messageError}</p>
            }
            <div className="save">
                <h1 onClick={submitData}>SAVE</h1>
            </div>
        </Div>
    )
}

export default CreateGrammar;