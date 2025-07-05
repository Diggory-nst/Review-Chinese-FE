
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
    ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph,
    Undo, Alignment, FontColor, FontSize, Table, TableToolbar
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

import { Div } from "../../assets/styles/admin/editTranslate";
import configDomain from "../../configs/config.domain";
import setHeadersRequest from "../../utils/setHeadersRequest";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

interface InstanceConver {
    _id: string,
    content: string
}

const EditTranslate = () => {

    const domain = configDomain?.domain
    const headers = setHeadersRequest()

    const editorRef = useRef<any>(null)

    const [isError, setIsError] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>('')
    const [completeChoiceBook, setCompleteChoiceBook] = useState<boolean>(false)

    const [nameTranslate, setNameTranslate] = useState<string>('')
    const [instanceTranslate, setInstanceTranslate] = useState<InstanceConver>({
        _id: '',
        content: ''
    })
    const [isEditorReady, setIsEditorReady] = useState<boolean>(false);

    // Get All Information Grammar
    const handleSubmitChoiceBook = () => {

        if (nameTranslate == '') {
            setIsError(true)
            setMessageError('Please Enter Name Translate')
            return
        } else {
            setIsError(false)
        }

        const getContentTranslate = async () => {

            const url = `${domain}/admin/getContentTranslate`

            try {
                const res = await axios.post(url, { nameTranslate: nameTranslate }, { headers })
                const { _id, content } = res.data.metadata

                setCompleteChoiceBook(true)
                setInstanceTranslate({
                    _id,
                    content
                })

            } catch (error: any) {
                setIsError(true)
                setMessageError(error.response?.data.message)
            }
        }

        getContentTranslate()
    }

    useEffect(() => {
        editorRef.current?.setData(instanceTranslate.content)
    }, [isEditorReady])

    const submitData = async () => {
        const dataEditor = editorRef.current.getData()

        const url = `${domain}/admin/updateTranslate`
        const data = {
            _id: instanceTranslate._id,
            content: dataEditor
        }

        try {
            await axios.patch(url, data, { headers })
        } catch (error: any) {
            setIsError(true)
            setMessageError(error.response.data.message)
        }
    }

    const endEditTranslate = () => {
        setCompleteChoiceBook(false)
        setIsEditorReady(false)
        setNameTranslate('')
    }

    return (
        <Div className="edit-translate">
            {!completeChoiceBook ?
                <div className="enterChoiceBook">
                    <h1 className="title">Vui Lòng Chọn Bài Cần Chỉnh Sửa</h1>
                    <div className="translate">
                        <h1>Bài : </h1>
                        <input type="text" name="translate" value={nameTranslate} onChange={(e) => setNameTranslate(e.target.value)} />
                    </div>
                    {isError &&
                        <p className="error" style={{ color: '#527f4f', marginTop: '30px', marginBottom: '22px' }}>{messageError}</p>
                    }
                    <h1 className="submit-choice" onClick={handleSubmitChoiceBook}>Gửi</h1>
                </div>
                :
                <>
                    <div className="infor-book">
                        <div className="translate">
                            <h1>Bài : {nameTranslate}</h1>
                        </div>
                    </div>
                    <div className="write-translate">
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
                        <h1 className="endEditTranslate" onClick={endEditTranslate}>Kết Thúc</h1>
                        <h1 onClick={submitData}>SAVE</h1>
                    </div>
                </>
            }
        </Div>
    )
}

export default EditTranslate;