

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

interface ListConver {
    _id: string,
    name: string
}

const Conversation = () => {

    const domain = configDomain?.domain
    const [choiceConver, setChoiceConver] = useState<boolean>(false)
    const [converActive, setConverActive] = useState<string>('')
    const [isEditorReady, setIsEditorReady] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>('')

    const [listConver, setListConver] = useState<Array<ListConver>>([])
    const [contentConver, setContentConver] = useState<string>('')

    const editorRef = useRef<any>(null)

    const getListConversation = async () => {
        const url = `${domain}/general/getListConversation`

        try {
            const res = await axios.get(url)
            const data = res.data.metadata

            setListConver(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getListConversation()
    }, [])

    const showDataConver = async (idConver: string) => {

        setConverActive(idConver)

        const url = `${domain}/general/getContentConver`
        try {
            const res = await axios.post(url, { idConver })
            const { content } = res.data.metadata

            setContentConver(content)
            setChoiceConver(true)
        } catch (error: any) {
            setChoiceConver(false)
            setIsError(true)
            setMessageError(error.response.data.message)
            setIsEditorReady(false)
        }
    }

    useEffect(() => {
        editorRef.current?.setData(contentConver)
    }, [isEditorReady, contentConver])

    return (
        <Div className="container">
            <div className="table-of-content">
                {listConver.map((item, indexConver) => {
                    return (
                        <h1 style={{ color: converActive == item._id ? '#527f4f' : 'black' }} key={indexConver} onClick={() => { showDataConver(item._id) }}>{item.name}</h1>
                    )
                })}
            </div>
            <div className="main-content">
                {/* Import CKeditor 5 */}
                {!choiceConver ?
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

export default Conversation;