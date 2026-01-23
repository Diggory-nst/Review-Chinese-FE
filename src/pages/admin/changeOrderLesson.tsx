
// Lấy chung 1 css nên không đổi tên class
import { Div } from "../../assets/styles/admin/changeOrderBook";
import axios from "axios";
import configDomain from "../../configs/config.domain";
import setHeadersRequest from "../../utils/setHeadersRequest";
import { useState } from "react";
import getAxiosErrorMessage from '../../utils/getAxiosErrorMessage';

interface Choice {
    book: string,
    lesson1: string,
    numberSort1: string
    lesson2: string,
    numberSort2: string
}

const ChangeOrderLesson = () => {

    const domain = configDomain?.domain
    const headers = setHeadersRequest()

    const [isError, setIsError] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>('')

    const [choice, setChoice] = useState<Choice>({
        book: '',
        lesson1: '',
        numberSort1: '',
        lesson2: '',
        numberSort2: ''
    })

    const handleChoiceBook = (e: any) => {
        setChoice(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleSubmitChoiceBook = async () => {
        if (choice.book == '' || choice.lesson1 == '' || choice.numberSort1 == '' || choice.lesson2 == '' || choice.numberSort2 == '') {
            setIsError(true)
            setMessageError('Please Enter Lesson Name and Number Order')
            return
        } else {
            setIsError(false)
        }

        const url = `${domain}/admin/changeOrderLesson`
        try {
            await axios.post(url, choice, { headers })

            setChoice({
                book: '',
                lesson1: '',
                numberSort1: '',
                lesson2: '',
                numberSort2: ''
            })
        } catch (error: any) {
            setIsError(true)
            setMessageError(getAxiosErrorMessage(error))
        }
    }

    return (
        <Div className="orderBook">
            <h1 className="title">Vui Lòng Chọn Bài Cần Chỉnh Sửa</h1>
            <div className="enterChoiceBook">
                <h1>Quyển: </h1>
                <input type="text" name="book" value={choice.book} onChange={handleChoiceBook} />
            </div>
            <div className="enterChoiceLesson">
                <div className="choice-book">
                    <div className="lesson">
                        <h1>Bài 1: </h1>
                        <input type="text" name="lesson1" value={choice.lesson1} onChange={handleChoiceBook} />
                    </div>
                    <div className="numberSort">
                        <h1>Thứ tự 1: </h1>
                        <input type="text" name="numberSort1" value={choice.numberSort1} onChange={handleChoiceBook} />
                    </div>
                </div>
            </div>
            <div className="enterChoiceLesson">
                <div className="choice-book">
                    <div className="lesson">
                        <h1>Bài 2: </h1>
                        <input type="text" name="lesson2" value={choice.lesson2} onChange={handleChoiceBook} />
                    </div>
                    <div className="numberSort">
                        <h1>Thứ tự 2 : </h1>
                        <input type="text" name="numberSort2" value={choice.numberSort2} onChange={handleChoiceBook} />
                    </div>
                </div>
            </div>
            {isError &&
                <p className="error" style={{ color: '#527f4f', marginTop: '0', marginBottom: '22px' }}>{messageError}</p>
            }
            <h1 className="submit-choice" onClick={handleSubmitChoiceBook}>Gửi</h1>

        </Div>
    )
}

export default ChangeOrderLesson;

