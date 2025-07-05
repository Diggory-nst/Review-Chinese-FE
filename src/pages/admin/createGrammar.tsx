
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
    ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph,
    Undo, Alignment, FontColor, FontSize, Table, TableToolbar
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

import { Div } from "../../assets/styles/admin/createGrammar";
import { useRef, useState } from "react";
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
        const dataEditor = editorRef.current.getData()

        if (choiceBook.book == '' || choiceBook.lesson == '') {
            setIsError(true)
            setMessageError('Please Enter Book Name and Lesson')
            return
        } else {
            setIsError(false)
        }

        const url = `${domain}/admin/createGrammar`
        const data = {
            book: choiceBook.book,
            lesson: choiceBook.lesson,
            dataEditor,
        }

        try {
            await axios.post(url, data, { headers })
            editorRef.current.setData('')
            setChoiceBook({
                book: '',
                lesson: ''
            })
        } catch (error: any) {
            setIsError(true)
            setMessageError(error.response.data.message)
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
                    }}
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