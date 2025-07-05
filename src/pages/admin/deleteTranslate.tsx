
import { Div } from "../../assets/styles/admin/deleteTranslate";
import configDomain from "../../configs/config.domain";
import setHeadersRequest from "../../utils/setHeadersRequest";
import axios from "axios";
import { useState } from "react";

const DeleteTranslate = () => {

    const domain = configDomain?.domain
    const headers = setHeadersRequest()

    const [isError, setIsError] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>('')

    const [nameTranslate, setNameTranslate] = useState<string>('')

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

            const url = `${domain}/admin/deleteTranslate`

            try {
                await axios.post(url, { nameTranslate }, { headers })

                setNameTranslate('')
            } catch (error: any) {
                setIsError(true)
                setMessageError(error.response?.data.message)
            }
        }

        getContentTranslate()
    }

    return (
        <Div className="delete-translate">
            <h1 className="title">Vui Lòng Chọn Bài Cần Xóa</h1>
            <div className="translate">
                <h1>Bài : </h1>
                <input type="text" name="translate" value={nameTranslate} onChange={(e) => setNameTranslate(e.target.value)} />
            </div>
            {isError &&
                <p className="error" style={{ color: '#527f4f', marginTop: '30px', marginBottom: '22px' }}>{messageError}</p>
            }
            <h1 className="submit-choice" onClick={handleSubmitChoiceBook}>Gửi</h1>
        </Div>
    )
}

export default DeleteTranslate;