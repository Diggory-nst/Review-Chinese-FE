
import axios from 'axios';
import { Div } from '../assets/styles/activate.ts';
import configDomain from "../configs/config.domain.ts";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import getAxiosErrorMessage from '../utils/getAxiosErrorMessage';

const Activate = () => {

    const domain = configDomain?.domain

    const navigate = useNavigate()

    const param = useParams()
    const usernameEncode = param.usernameEncode

    const [isError, setIsError] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>('')

    const fetchActivate = async () => {

        const url = `${domain}/user/activate/${usernameEncode}`

        try {
            await axios.get(url)
            setTimeout(() => {
                navigate('../login')
            }, 1500)
        } catch (error: any) {
            setIsError(true)
            setMessageError(getAxiosErrorMessage(error))
        }
    }

    useEffect(() => {
        fetchActivate()
    }, [])

    return (
        <Div className="activate-page">
            {isError === true ?
                <h1>{messageError}</h1>
                :
                <h1>Tài Khoản Đã Được Kích Hoạt</h1>
            }
        </Div>
    )
}

export default Activate;

