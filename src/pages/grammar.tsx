
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
    ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph,
    Undo, Alignment, FontColor, FontSize, Table, TableToolbar
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

import { Div } from '../assets/styles/grammar'
import { useCallback, useEffect, useRef, useState } from 'react'

import configDomain from '../configs/config.domain';
import axios from 'axios'

interface TypeDataBook {
    book: {
        _id: string,
        name: string
    },
    lesson: Array<{
        _id: string,
        name: string
    }>
}

const Grammar = () => {

    const domain = configDomain?.domain

    const [choiceBook, setChoiceBook] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>('')
    const [expandBookId, setExpandBookId] = useState<string>('')
    const [expandBook, setExpandBook] = useState<boolean>(false)
    const [bookActive, setBookActive] = useState<string>('')
    const [isEditorReady, setIsEditorReady] = useState<boolean>(false);
    const [dataBook, setDataBook] = useState<TypeDataBook[]>([])
    const [contentGrammar, setContentGrammar] = useState<string>('')

    const editorRef = useRef<any>(null)

    const handleExpandBook = useCallback((idBook: string) => {

        if (expandBookId === idBook) {
            setExpandBook(false);
            setExpandBookId('');
        } else {
            setExpandBook(true);
            setExpandBookId(idBook);
        }
    }, [expandBookId])

    useEffect(() => {

        const getDataBook = async () => {
            const url = `${domain}/general/getDataBook`

            try {
                const res = await axios.get(url)
                const data = res.data.metadata

                setDataBook(data)
            } catch (error) {
                console.log(error)
            }
        }

        getDataBook()
    }, [])

    const showDataGrammar = async (idBook: string, idLesson: string) => {

        const url = `${domain}/general/getGrammar`

        try {
            const res = await axios.post(url, { idBook, idLesson })
            const data = res.data.metadata

            setContentGrammar(data)
            setBookActive(idLesson)
            setChoiceBook(true)
        } catch (error: any) {
            setBookActive(idLesson)
            setChoiceBook(false)
            setIsError(true)
            setMessageError(error.response.data.message)
            setIsEditorReady(false)
        }
    }

    useEffect(() => {
        editorRef.current?.setData(contentGrammar)
    }, [isEditorReady, contentGrammar])

    return (
        <Div className="container">
            <div className="table-of-content">
                <div className="book">
                    {dataBook.map((item, indexBook) => {
                        return (
                            <div className="item-book" key={indexBook}>
                                <h1 className="name-book" onClick={() => handleExpandBook(item.book._id)}>{item.book.name}</h1>
                                <div style={{ display: expandBook && expandBookId == item.book._id ? 'block' : 'none' }} className="list-lesson">
                                    {item.lesson.map((elm, indexLesson) => {
                                        return (
                                            <h2 style={{ color: bookActive == elm._id ? '#5184bb' : 'black' }} className="name-lesson" key={indexLesson} onClick={() => { showDataGrammar(item.book._id, elm._id) }}>{elm.name}</h2>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="main-content">
                {/* Import CKeditor 5 */}
                {!choiceBook ?
                    <div className="notChoiceLesson">
                        {isError ?
                            <h1 className="error">{messageError}</h1>
                            :
                            <h1>Vui Lòng Chọn Bài</h1>
                        }
                    </div>
                    :
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
                            editor.enableReadOnlyMode('readOnly')
                            setIsEditorReady(true)
                        }}
                    />
                }
            </div>
        </Div>
    )
}

export default Grammar