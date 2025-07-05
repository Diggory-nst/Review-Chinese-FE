

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
    ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph,
    Undo, Alignment, FontColor, FontSize, Table, TableToolbar,
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

import { Div } from '../assets/styles/conversation'
import { useEffect, useRef, useState } from 'react'

import configDomain from '../configs/config.domain';
import axios from 'axios'

interface ListTranslate {
    _id: string,
    name: string
}

const Translate = () => {

    const domain = configDomain?.domain
    const [choiceTranslate, setChoiceTranslate] = useState<boolean>(false)
    const [translateActive, setTranslateActive] = useState<string>('')
    const [isEditorReady, setIsEditorReady] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>('')

    const [listTranslate, setListTranslate] = useState<Array<ListTranslate>>([])
    const [contentTranslate, setContentTranslate] = useState<string>('')

    const editorRef = useRef<any>(null)

    const getListTranslate = async () => {
        const url = `${domain}/general/getListTranslate`

        try {
            const res = await axios.get(url)
            const data = res.data.metadata

            setListTranslate(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getListTranslate()
    }, [])

    const showDataTranslate = async (idTransalte: string) => {

        setTranslateActive(idTransalte)

        const url = `${domain}/general/getContentTranslate`

        try {
            const res = await axios.post(url, { idTransalte })
            const { content } = res.data.metadata

            setContentTranslate(content)
            setChoiceTranslate(true)
        } catch (error: any) {
            setChoiceTranslate(false)
            setIsError(true)
            setMessageError(error.response.data.message)
            setIsEditorReady(false)
        }
    }

    useEffect(() => {
        editorRef.current?.setData(contentTranslate)
    }, [isEditorReady, contentTranslate])

    return (
        <Div className="container">
            <div className="table-of-content">
                {listTranslate.map((item, indexRead) => {
                    return (
                        <h1 style={{ color: translateActive == item._id ? '#527f4f' : 'black' }} key={indexRead} onClick={() => { showDataTranslate(item._id) }}>{item.name}</h1>
                    )
                })}
            </div>
            <div className="main-content">
                {/* Import CKeditor 5 */}
                {!choiceTranslate ?
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

export default Translate;