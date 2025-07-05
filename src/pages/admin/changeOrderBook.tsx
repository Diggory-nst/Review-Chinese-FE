
import { Div } from "../../assets/styles/admin/changeOrderBook";
import axios from "axios";
import configDomain from "../../configs/config.domain";
import setHeadersRequest from "../../utils/setHeadersRequest";
import { useState } from "react";

interface ChoiceBook {
    book1: string,
    numberSort1: string
    book2: string,
    numberSort2: string
}

const ChangeOrderBook = () => {

    const domain = configDomain?.domain
    const headers = setHeadersRequest()

    const [isError, setIsError] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>('')

    const [choiceBook, setChoiceBook] = useState<ChoiceBook>({
        book1: '',
        numberSort1: '',
        book2: '',
        numberSort2: ''
    })

    const handleChoiceBook = (e: any) => {
        setChoiceBook(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleSubmitChoiceBook = async () => {
        if (choiceBook.book1 == '' || choiceBook.numberSort1 == '' || choiceBook.book2 == '' || choiceBook.numberSort2 == '') {
            setIsError(true)
            setMessageError('Please Enter Book Name and Number Order')
            return
        } else {
            setIsError(false)
        }

        const url = `${domain}/admin/changeOrderBook`
        try {
            await axios.post(url, choiceBook, { headers })

            setChoiceBook({
                book1: '',
                numberSort1: '',
                book2: '',
                numberSort2: ''
            })
        } catch (error: any) {
            setIsError(true)
            setMessageError(error.response.data.message)
        }
    }

    return (
        <Div className="orderBook">
            <h1 className="title">Vui Lòng Chọn Sách Cần Chỉnh Sửa</h1>
            <div className="enterChoiceBook">
                <div className="choice-book">
                    <div className="book">
                        <h1>Quyển 1: </h1>
                        <input type="text" name="book1" value={choiceBook.book1} onChange={handleChoiceBook} />
                    </div>
                    <div className="numberSort">
                        <h1>Thứ tự 1: </h1>
                        <input type="text" name="numberSort1" value={choiceBook.numberSort1} onChange={handleChoiceBook} />
                    </div>
                </div>
            </div>
            <div className="enterChoiceBook">
                <div className="choice-book">
                    <div className="book">
                        <h1>Quyển 2: </h1>
                        <input type="text" name="book2" value={choiceBook.book2} onChange={handleChoiceBook} />
                    </div>
                    <div className="numberSort">
                        <h1>Thứ tự 2 : </h1>
                        <input type="text" name="numberSort2" value={choiceBook.numberSort2} onChange={handleChoiceBook} />
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

export default ChangeOrderBook;