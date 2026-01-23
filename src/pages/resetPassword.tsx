import IonIcon from "@reacticons/ionicons";
import background from '../assets/img/background/resetPw.jpg'

import { Section } from "../assets/styles/forgotPassword.ts";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import configDomain from "../configs/config.domain";
import getAxiosErrorMessage from '../utils/getAxiosErrorMessage';

const ResetPassword = () => {

    const domain = configDomain?.domain

    const param = useParams()
    const usernameEncode = param.usernameEncode

    const navigate = useNavigate()

    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const [isError, setIsError] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>('')

    const handleSubmit = (e: any) => {

        e.preventDefault()

        if (password == '' || confirmPassword == '') {
            setIsError(true)
            setMessageError('Vui lòng nhập đầy đủ')
            return
        }

        if (password !== confirmPassword) {
            setIsError(true)
            setMessageError('Mật khẩu không khớp')
            return
        }

        const url = `${domain}/user/reset-password/${usernameEncode}`
        const data = {
            password
        }

        axios.post(url, data)
            .then(_res => navigate('../login'))
            .catch(error => {
                setIsError(true)
                setMessageError(getAxiosErrorMessage(error))
            })
    }

    return (
        <Section style={{ background: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}>
            <div className="form-box">
                <div className="form-value">
                    <form>
                        <h2>Đặt Lại Mật Khẩu</h2>
                        <div className="inputbox">
                            <IonIcon name="lock-closed-outline"></IonIcon>
                            <input type="password" name="new-password" required onChange={e => setPassword(e.target.value)} />
                            <label>Mật Khẩu Mới</label>
                        </div>
                        <div className="inputbox">
                            <IonIcon name="lock-closed-outline"></IonIcon>
                            <input type="password" name="confirm-password" required onChange={e => setConfirmPassword(e.target.value)} />
                            <label>Xác Nhận Lại Mật Khẩu</label>
                        </div>
                        {isError &&
                            <p className="error">{messageError}</p>
                        }
                        <button type="submit" onClick={handleSubmit}>Tiếp Tục</button>
                    </form>
                </div>
            </div>
        </Section>
    )
}

export default ResetPassword;

