
import { Div } from "../../assets/styles/admin/deleteConversation";
import configDomain from "../../configs/config.domain";
import setHeadersRequest from "../../utils/setHeadersRequest";
import axios from "axios";
import { useState } from "react";

const DeleteConversation = () => {

    const domain = configDomain?.domain
    const headers = setHeadersRequest()

    const [isError, setIsError] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>('')

    const [nameConver, setNameConver] = useState<string>('')

    // Get All Information Grammar
    const handleSubmitChoiceBook = () => {

        if (nameConver == '') {
            setIsError(true)
            setMessageError('Please Enter Name Conversation')
            return
        } else {
            setIsError(false)
        }

        const getContentConversation = async () => {

            const url = `${domain}/admin/deleteConversation`

            try {
                await axios.post(url, { nameConver }, { headers })

                setNameConver('')
            } catch (error: any) {
                setIsError(true)
                setMessageError(error.response?.data.message)
            }
        }

        getContentConversation()
    }

    return (
        <Div className="delete-conversation">
            <h1 className="title">Vui Lòng Chọn Bài Cần Xóa</h1>
            <div className="conversation">
                <h1>Bài : </h1>
                <input type="text" name="conversation" value={nameConver} onChange={(e) => setNameConver(e.target.value)} />
            </div>
            {isError &&
                <p className="error" style={{ color: '#527f4f', marginTop: '30px', marginBottom: '22px' }}>{messageError}</p>
            }
            <h1 className="submit-choice" onClick={handleSubmitChoiceBook}>Gửi</h1>
        </Div>
    )
}

export default DeleteConversation;