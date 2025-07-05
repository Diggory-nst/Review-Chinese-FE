
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
    ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph,
    Undo, Alignment, FontColor, FontSize, Table, TableToolbar
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

import { Div } from "../../assets/styles/admin/editGrammar";
import configDomain from "../../configs/config.domain";
import setHeadersRequest from "../../utils/setHeadersRequest";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

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
    const [isEditorReady, setIsEditorReady] = useState<boolean>(false);

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

    useEffect(() => {
        editorRef.current?.setData(instanceGrammar.content)
    }, [isEditorReady])

    const submitData = async () => {
        const dataEditor = editorRef.current.getData()

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
        setIsEditorReady(false)
        setChoiceBook({
            book: '',
            lesson: ''
        })
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
                        {/* Import CKeditor 5 */}
                        <CKEditor
                            editor={ClassicEditor}
                            config={
                                {
                                    toolbar: {
                                        items: ['undo', 'redo', '|', 'bold', 'italic', '|', 'alignment', 'fontColor', 'fontSize', 'insertTable']
                                    },
                                    plugins: [
                                        Bold, Essentials, Italic, Mention, Paragraph, Undo, Alignment, FontColor, Table, TableToolbar, FontSize
                                    ],
                                    table: {
                                        contentToolbar: ['tableColumn', 'tableRow']
                                    },
                                    fontSize: {
                                        options: [18, 20, 22]
                                    }
                                }
                            }
                            onReady={(editor) => {
                                editorRef.current = editor
                                setIsEditorReady(true)
                            }}
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