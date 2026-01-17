
import { Div } from "../../assets/styles/admin/composeReview";
import { useState } from "react";
import ComposeManual from "./composeManual";
import composeAutoFunc from "../../utils/composeAuto";
import axios from "axios";
import configDomain from "../../configs/config.domain";
import setHeadersRequest from "../../utils/setHeadersRequest";

interface ChoiceBook {
    book: string,
    lesson: string
}

const ComposeReview = () => {

    const domain = configDomain?.domain
    const headers = setHeadersRequest()

    const [completeComposeAuto, setCompleteComposeAuto] = useState<boolean>(false)
    const [showComposeManual, setShowComposeManual] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>('')
    const [choiceBook, setChoiceBook] = useState<ChoiceBook>({
        book: '',
        lesson: ''
    })

    const handleChange = (e: any) => {
        setChoiceBook(prev => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    const composeAuto = async () => {

        if (choiceBook.book == '' || choiceBook.lesson == '') return

        const urlGet = `${domain}/admin/getAllInforVocal`
        const urlSubmit = `${domain}/admin/createComposeReview`
        try {
            const res = await axios.post(urlGet, choiceBook, { headers })
            const rawData = res.data.metadata

            let tuonghinh: Array<string> = []
            let pinyin: Array<string> = []
            let audio: Array<string> = []
            let type: Array<string> = []
            let meaning: Array<string> = []

            rawData.map((item: any) => {
                tuonghinh.push(item.tuonghinh)
                pinyin.push(item.pinyin)
                type.push(item.type)
                audio.push(item.audio)
                meaning.push(item.meaning)
            })

            const arrCompose = composeAutoFunc({ tuonghinh, pinyin, type, audio, meaning })
            const dataSubmit = {
                choiceBook,
                arrCompose
            }
            await axios.post(urlSubmit, dataSubmit, { headers })
            setChoiceBook({
                book: '',
                lesson: ''
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

    const handleOpenComposeManual = () => {
        setShowComposeManual(true)
        setCompleteComposeAuto(true)
        setIsError(false)
    }

    const handleChangeShowComposeManual = (check: boolean) => {
        setShowComposeManual(check)
    }

    return (
        <Div className="compose-review" style={{ height: completeComposeAuto ? '100%' : 'calc(100% - 30px)' }}>
            {showComposeManual ?
                (<ComposeManual handleChangeShowComposeManual={handleChangeShowComposeManual} />)
                :
                (
                    !completeComposeAuto ?
                        (
                            <>
                                <div className="choice-book">
                                    <div className="book">
                                        <h1>Quyển : </h1>
                                        <input type="text" name="book" value={choiceBook.book} onChange={handleChange} />
                                    </div>
                                    <div className="lesson">
                                        <h1>Bài : </h1>
                                        <input type="text" name="lesson" value={choiceBook.lesson} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="option-compose">
                                    <div>
                                        <h1 className="option-auto" onClick={composeAuto}>Soạn Tự Động</h1>
                                        <h1 className="option-manual" onClick={handleOpenComposeManual}>Soạn Thủ Công</h1>
                                    </div>
                                    {isError &&
                                        <h1 className="error">{messageError}</h1>
                                    }
                                </div>
                            </>
                        )
                        :
                        (
                            <div className="success-compose">
                                <div>
                                    <span>Hoàn Thành Soạn Tự Động</span>
                                </div>
                                <div>
                                    <h1 onClick={endComposeAuto}>Kết Thúc</h1>
                                </div>
                            </div>
                        )
                )
            }
        </Div>
    )
}

export default ComposeReview;