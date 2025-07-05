
import { Div } from "../../assets/styles/admin/composeManyLesson";

import { useState } from "react";
import axios from "axios";
import configDomain from "../../configs/config.domain";
import setHeadersRequest from "../../utils/setHeadersRequest";
import composeAutoFunc from "../../utils/composeAuto";

interface ChoiceBook {
    book: string,
    lesson: string,
    getVocal: string
}

const ComposeManyLesson = () => {

    const domain = configDomain?.domain
    const headers = setHeadersRequest()
    const [isError, setIsError] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>('')

    const [completeComposeAuto, setCompleteComposeAuto] = useState<boolean>(false)
    const [choiceBook, setChoiceBook] = useState<ChoiceBook>({
        book: '',
        lesson: '',
        getVocal: ''
    })

    const handleChange = (e: any) => {
        setChoiceBook(prev => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    const composeAuto = async () => {

        if (choiceBook.getVocal == '' || choiceBook.book == '' || choiceBook.lesson == '') return

        const urlGet = `${domain}/admin/getManyVocal`
        const urlSubmit = `${domain}/admin/createComposeReview`
        try {
            const res = await axios.post(urlGet, { listVocal: choiceBook.getVocal }, { headers })
            const { tuonghinh, meaning } = res.data.metadata

            // Submit Data

            const arrCompose = composeAutoFunc({ tuonghinh, meaning })
            const dataSubmit = {
                choiceBook,
                arrCompose
            }

            await axios.post(urlSubmit, dataSubmit, { headers })

            setChoiceBook({
                book: '',
                lesson: '',
                getVocal: '',
            })
            setCompleteComposeAuto(true)
            setIsError(false)
        } catch (error: any) {
            setIsError(true)
            setMessageError(error.response.data.message)
        }
    }

    const endComposeAuto = () => {
        setCompleteComposeAuto(false)
    }

    return (
        <Div className="compose-many-lesson">
            {
                !completeComposeAuto ?
                    <>
                        <div className="choice-book">
                            <div className="book">
                                <h1>Quyển : </h1>
                                <input type="text" name="book" value={choiceBook.book} onChange={handleChange} />
                                <h1>Bài : </h1>
                                <input type="text" name="lesson" value={choiceBook.lesson} onChange={handleChange} />
                            </div>
                            <p>Lấy Data có cấu trúc như sau: tên quyển-tên bài/tên quyển-tên bài</p>
                            <p>Vd: 1-1/2-3/4-8</p>
                            <div className="lesson">
                                <h1>Lấy Data Từ : </h1>
                                <input type="text" name="getVocal" value={choiceBook.getVocal} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="compose-auto">
                            <h1 onClick={composeAuto}>Soạn Tự Động</h1>
                        </div>
                        {isError &&
                            <h1 className="error">{messageError}</h1>
                        }
                    </>
                    :
                    <div className="success-compose">
                        <div>
                            <span>Hoàn Thành Soạn Tự Động</span>
                        </div>
                        <div>
                            <h1 onClick={endComposeAuto}>Kết Thúc</h1>
                        </div>
                    </div>
            }

        </Div>
    )
}

export default ComposeManyLesson;
