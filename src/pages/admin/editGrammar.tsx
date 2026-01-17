import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { Div } from "../../assets/styles/admin/editGrammar";
import configDomain from "../../configs/config.domain";
import setHeadersRequest from "../../utils/setHeadersRequest";
import axios from "axios";
import { useRef, useState } from "react";

interface ChoiceBook {
    book: string,
    lesson: string
}

interface InstanceGrammar {
    _id: string,
    content: string
}

const EditGrammar = () => {

    const domain = configDomain?.domain
    const headers = setHeadersRequest()

    const editorRef = useRef<any>(null)

    const [isError, setIsError] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>('')
    const [completeChoiceBook, setCompleteChoiceBook] = useState<boolean>(false)

    const [choiceBook, setChoiceBook] = useState<ChoiceBook>({
        book: '',
        lesson: ''
    })
    const [instanceGrammar, setInstanceGrammar] = useState<InstanceGrammar>({
        _id: '',
        content: ''
    })

    const handleChoiceBook = (e: any) => {
        setChoiceBook(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    // Get All Information Grammar
    const handleSubmitChoiceBook = () => {

        if (choiceBook.book == '' || choiceBook.lesson == '') {
            setIsError(true)
            setMessageError('Please Enter Book Name and Lesson')
            return
        } else {
            setIsError(false)
        }

        const getContentGrammar = async () => {

            const url = `${domain}/admin/getContentGrammar`

            try {
                const res = await axios.post(url, choiceBook, { headers })
                const { _id, content } = res.data.metadata

                setCompleteChoiceBook(true)
                setInstanceGrammar({
                    _id,
                    content
                })

            } catch (error: any) {
                setIsError(true)
                setMessageError(error.response?.data.message)
            }
        }

        getContentGrammar()
    }

    // useEffect(() => {
    //     editorRef.current?.getEditor().clipboard.dangerouslyPasteHTML(instanceGrammar.content);
    // }, [instanceGrammar])

    const submitData = async () => {
        const dataEditor = editorRef.current.getEditor().root.innerHTML;

        const url = `${domain}/admin/updateGrammar`
        const data = {
            _id: instanceGrammar._id,
            content: dataEditor
        }

        try {
            await axios.patch(url, data, { headers })
        } catch (error: any) {
            setIsError(true)
            setMessageError(error.response.data.message)
        }
    }

    const endEditGrammar = () => {
        setCompleteChoiceBook(false)
        setChoiceBook({
            book: '',
            lesson: ''
        })
    }

    // Setup React Quill

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
        <Div className="edit-grammar">
            {!completeChoiceBook ?
                <div className="enterChoiceBook">
                    <h1 className="title">Vui Lòng Chọn Bài Cần Chỉnh Sửa</h1>
                    <div className="choice-book">
                        <div className="book">
                            <h1>Quyển : </h1>
                            <input type="text" name="book" onChange={handleChoiceBook} />
                        </div>
                        <div className="lesson">
                            <h1>Bài : </h1>
                            <input type="text" name="lesson" onChange={handleChoiceBook} />
                        </div>
                    </div>
                    {isError &&
                        <p className="error" style={{ color: '#527f4f', marginTop: '0', marginBottom: '22px' }}>{messageError}</p>
                    }
                    <h1 className="submit-choice" onClick={handleSubmitChoiceBook}>Gửi</h1>
                </div>
                :
                <>
                    <div className="infor-book">
                        <div className="book">
                            <h1>Quyển : {choiceBook.book}</h1>
                        </div>
                        <div className="lesson">
                            <h1>Bài : {choiceBook.lesson}</h1>
                        </div>
                    </div>
                    <div className="write-grammar">
                        <ReactQuill
                            theme="snow"
                            ref={editorRef}
                            modules={modules}
                            value={instanceGrammar.content}
                        />
                    </div>
                    {isError &&
                        <p className="error">{messageError}</p>
                    }
                    <div className="save" >
                        <h1 className="endEditGrammar" onClick={endEditGrammar}>Kết Thúc</h1>
                        <h1 onClick={submitData}>SAVE</h1>
                    </div>
                </>
            }
        </Div>
    )
}

export default EditGrammar;