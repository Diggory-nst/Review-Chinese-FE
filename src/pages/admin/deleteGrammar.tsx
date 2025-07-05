
import { Div } from "../../assets/styles/admin/deleteGrammar";
import configDomain from "../../configs/config.domain";
import setHeadersRequest from "../../utils/setHeadersRequest";
import axios from "axios";
import { useState } from "react";

interface ChoiceBook {
    book: string,
    lesson: string
}

const DeleteGrammar = () => {

    const domain = configDomain?.domain
    const headers = setHeadersRequest()

    const [isError, setIsError] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>('')

    const [choiceBook, setChoiceBook] = useState<ChoiceBook>({
        book: '',
        lesson: ''
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

        const deleteGrammar = async () => {

            const url = `${domain}/admin/deleteGrammar`
            try {
                await axios.post(url, choiceBook, { headers })
                setChoiceBook({
                    book: '',
                    lesson: ''
                })
            } catch (error: any) {
                setIsError(true)
                setMessageError(error.response?.data.message)
            }
        }

        deleteGrammar()
    }

    return (
        <Div className="delete-grammar">
            <h1 className="title">Vui Lòng Chọn Bài Cần Xóa</h1>
            <div className="choice-book">
                <div className="book">
                    <h1>Quyển : </h1>
                    <input type="text" name="book" value={choiceBook.book} onChange={handleChoiceBook} />
                </div>
                <div className="lesson">
                    <h1>Bài : </h1>
                    <input type="text" name="lesson" value={choiceBook.lesson} onChange={handleChoiceBook} />
                </div>
            </div>
            {isError &&
                <p className="error" style={{ color: '#527f4f', marginTop: '0', marginBottom: '22px' }}>{messageError}</p>
            }
            <h1 className="submit-choice" onClick={handleSubmitChoiceBook}>Gửi</h1>
        </Div>
    )
}

export default DeleteGrammar;