
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
    ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph,
    Undo, Alignment, FontColor, FontSize, Table, TableToolbar
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

import { Div } from "../../assets/styles/admin/createTranslate";
import { useRef, useState } from "react";
import configDomain from "../../configs/config.domain";
import setHeadersRequest from "../../utils/setHeadersRequest";
import axios from "axios";

const CreateTranslate = () => {

    const domain = configDomain?.domain
    const headers = setHeadersRequest()

    const [isError, setIsError] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>('')

    const editorRef = useRef<any>(null)
    const [nameTranslate, setNameTranslate] = useState<string>('')

    const submitData = async () => {
        const dataEditor = editorRef.current.getData()

        if (nameTranslate == '') {
            setIsError(true)
            setMessageError('Please Enter Name Translate')
            return
        } else {
            setIsError(false)
        }

        const url = `${domain}/admin/createTranslate`
        const data = {
            name: nameTranslate,
            dataEditor
        }

        try {
            await axios.post(url, data, { headers })
            editorRef.current.setData('')
            setNameTranslate('')
        } catch (error: any) {
            setIsError(true)
            setMessageError(error.response.data.message)
        }
    }

    return (
        <Div className="create-translate">
            <div className="translate">
                <h1>Tên : </h1>
                <input type="text" name="translate" value={nameTranslate} onChange={(e) => setNameTranslate(e.target.value)} />
            </div>
            <div className="write-translate">
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

export default CreateTranslate;