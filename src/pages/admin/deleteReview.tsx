import { Div } from "../../assets/styles/admin/deleteReview";
import configDomain from "../../configs/config.domain";
import setHeadersRequest from "../../utils/setHeadersRequest";
import axios from "axios";
import { useState } from "react";
import getAxiosErrorMessage from '../../utils/getAxiosErrorMessage';

interface ChoiceBook {
    book: string,
    lesson: string
}

const DeleteReview = () => {

    const domain = configDomain?.domain
    const headers = setHeadersRequest()

    const [isError, setIsError] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>('')
    const [messageSuccess, setMessageSuccess] = useState<string>('')

    const [choiceBook, setChoiceBook] = useState<ChoiceBook>({
        book: '',
        lesson: ''
    })

    const handleChoiceBook = (e: any) => {
        setChoiceBook(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleSubmitChoiceBook = () => {

        if (choiceBook.book == '' || choiceBook.lesson == '') {
            setIsError(true)
            setMessageError('Please Enter Book Name and Lesson')
            setMessageSuccess('')
            return
        } else {
            setIsError(false)
        }

        const confirmDelete = window.confirm('Bạn chắc chắn muốn xóa bài Ôn Tập này? Nếu không còn Từ Vựng/Ngữ Pháp thì sẽ xóa Lesson.')
        if (!confirmDelete) return

        const deleteReview = async () => {

            const url = `${domain}/admin/deleteComposeReview`
            try {
                await axios.post(url, choiceBook, { headers })
                setChoiceBook({
                    book: '',
                    lesson: ''
                })
                setMessageSuccess('Delete Successful')
                setIsError(false)
                setMessageError('')
            } catch (error: any) {
                setIsError(true)
                setMessageError(getAxiosErrorMessage(error))
                setMessageSuccess('')
            }
        }

        deleteReview()
    }

    return (
        <Div className="delete-review">
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
            {!!messageSuccess &&
                <p className="success" style={{ marginTop: '0', marginBottom: '22px' }}>{messageSuccess}</p>
            }
            <h1 className="submit-choice" onClick={handleSubmitChoiceBook}>Gửi</h1>
        </Div>
    )
}

export default DeleteReview;


