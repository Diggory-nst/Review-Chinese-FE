import { Div } from "../../assets/styles/admin/deleteVocal";
import configDomain from "../../configs/config.domain";
import setHeadersRequest from "../../utils/setHeadersRequest";
import axios from "axios";
import { useState } from "react";
import getAxiosErrorMessage from '../../utils/getAxiosErrorMessage';

interface ChoiceBook {
    book: string,
    lesson: string
}

const DeleteVocal = () => {

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

        const confirmDelete = window.confirm('Ban chac chan muon xoa bai nay? Neu khong con ngu phap thi se xoa lesson.')
        if (!confirmDelete) return

        const deleteVocal = async () => {

            const url = `${domain}/admin/deleteVocabulary`
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

        deleteVocal()
    }

    return (
        <Div className="delete-vocal">
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

export default DeleteVocal;


