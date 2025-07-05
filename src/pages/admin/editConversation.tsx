
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
    ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph,
    Undo, Alignment, FontColor, FontSize, Table, TableToolbar
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

import { Div } from "../../assets/styles/admin/editConversation";
import configDomain from "../../configs/config.domain";
import setHeadersRequest from "../../utils/setHeadersRequest";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

interface InstanceConver {
    _id: string,
    content: string
}

const EditConversation = () => {

    const domain = configDomain?.domain
    const headers = setHeadersRequest()

    const editorRef = useRef<any>(null)

    const [isError, setIsError] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>('')
    const [completeChoiceBook, setCompleteChoiceBook] = useState<boolean>(false)

    const [nameConver, setNameConver] = useState<string>('')
    const [instanceConver, setInstanceConver] = useState<InstanceConver>({
        _id: '',
        content: ''
    })
    const [isEditorReady, setIsEditorReady] = useState<boolean>(false);

    // Get All Information Grammar
    const handleSubmitChoiceBook = () => {

        if (nameConver == '') {
            setIsError(true)
            setMessageError('Please Enter Name Conversation')
            return
        } else {
            setIsError(false)
        }

        const getContentConversation = async () => {

            const url = `${domain}/admin/getContentConversation`

            try {
                const res = await axios.post(url, { nameConver: nameConver }, { headers })
                const { _id, content } = res.data.metadata

                setCompleteChoiceBook(true)
                setInstanceConver({
                    _id,
                    content
                })

            } catch (error: any) {
                setIsError(true)
                setMessageError(error.response?.data.message)
            }
        }

        getContentConversation()
    }

    useEffect(() => {
        editorRef.current?.setData(instanceConver.content)
    }, [isEditorReady])

    const submitData = async () => {
        const dataEditor = editorRef.current.getData()

        const url = `${domain}/admin/updateConversation`
        const data = {
            _id: instanceConver._id,
            content: dataEditor
        }

        try {
            await axios.patch(url, data, { headers })
        } catch (error: any) {
            setIsError(true)
            setMessageError(error.response.data.message)
        }
    }

    const endEditConver = () => {
        setCompleteChoiceBook(false)
        setIsEditorReady(false)
        setNameConver('')
    }

    return (
        <Div className="edit-conversation">
            {!completeChoiceBook ?
                <div className="enterChoiceBook">
                    <h1 className="title">Vui Lòng Chọn Bài Cần Chỉnh Sửa</h1>
                    <div className="conversation">
                        <h1>Bài : </h1>
                        <input type="text" name="conversation" value={nameConver} onChange={(e) => setNameConver(e.target.value)} />
                    </div>
                    {isError &&
                        <p className="error" style={{ color: '#527f4f', marginTop: '30px', marginBottom: '22px' }}>{messageError}</p>
                    }
                    <h1 className="submit-choice" onClick={handleSubmitChoiceBook}>Gửi</h1>
                </div>
                :
                <>
                    <div className="infor-book">
                        <div className="conversation">
                            <h1>Bài : {nameConver}</h1>
                        </div>
                    </div>
                    <div className="write-conversation">
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
                        <h1 className="endEditConver" onClick={endEditConver}>Kết Thúc</h1>
                        <h1 onClick={submitData}>SAVE</h1>
                    </div>
                </>
            }
        </Div>
    )
}

export default EditConversation;