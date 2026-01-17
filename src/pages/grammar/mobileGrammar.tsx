import 'react-quill/dist/quill.snow.css';
import { Div } from '../../assets/styles/grammar/mobileGrammar'
import { useEffect, useRef, useState } from 'react'

import ListBookMobile from '../../components/listBookMobile';

import configDomain from '../../configs/config.domain';
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

const MobileGrammar = () => {

    const domain = configDomain?.domain

    const [choiceBook, setChoiceBook] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>('')
    const [isEditorReady, setIsEditorReady] = useState<boolean>(false);
    const [dataBook, setDataBook] = useState<TypeDataBook[]>([])
    const [contentGrammar, setContentGrammar] = useState<string>('')

    const editorRef = useRef<any>(null)

    useEffect(() => {

        const getDataBook = async () => {
            const url = `${domain}/general/getDataBook`

            try {
                const res = await axios.get(url, { params: { section: 'grammar' } })
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
            setChoiceBook(true)
        } catch (error: any) {
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
            <ListBookMobile dataBook={dataBook} onLessonClick={(bookId, lessonId) => { showDataGrammar(bookId, lessonId) }} />
            <div className="mainContent">
                {!choiceBook ?
                    <div className="notChoiceLesson">
                        {isError ?
                            <h1 className="error">{messageError}</h1>
                            :
                            <h1>Vui Lòng Chọn Bài</h1>
                        }
                    </div>
                    :
                    <div className='ql-snow' dangerouslySetInnerHTML={{ __html: contentGrammar }} />
                }
            </div>
        </Div>
    )
}

export default MobileGrammar