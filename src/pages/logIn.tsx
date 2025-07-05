import IonIcon from "@reacticons/ionicons";
import background from '../assets/img/background/logIn.png'

import { Section } from "../assets/styles/signUp.ts";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import configDomain from "../configs/config.domain";

interface DataType {
    tokens: {
        accessToken: string,
        refreshToken: string
    },
    user: {
        _id: string,
        name: string
    }
}

const LogIn = () => {

    const navigate = useNavigate()

    const domain = configDomain?.domain

    const [userPost, setUserPost] = useState<{}>({
        name: '',
        password: ''
    })

    const [isError, setIsError] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>('')

    const handleChange = (event: any) => {
        setUserPost(prev => {
            return { ...prev, [event.target.name]: event.target.value }
        })
    }

    // Post data
    // Get data and tokens
    // Set Tokens, Id of user in LocalStorage
    const handleSubmit = async (event: any) => {

        event.preventDefault()

        const url = `${domain}/user/login`
        try {
            const res = await axios.post(url, userPost)
            const data: DataType = res.data.metadata
            const { tokens, user } = data

            const { accessToken, refreshToken } = tokens
            const { _id } = user

            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)
            localStorage.setItem('client_id', _id)

            navigate('/')

        } catch (error: any) {
            setIsError(true);
            setMessageError(error.response.data.message)
        }
    }

    return (
        <Section style={{
            background: `url(${background})`, backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center', backgroundSize: 'cover'
        }}>
            <div className="form-box" style={{ height: '450px' }}>
                <div className="form-value">
                    <form>
                        <h2>Đăng Nhập</h2>
                        <div className="inputbox">
                            <IonIcon name="people-outline"></IonIcon>
                            <input type="text" name="name" required onChange={handleChange} />
                            <label>Tên Đăng Nhập</label>
                        </div>
                        <div className="inputbox">
                            <IonIcon name="lock-closed-outline"></IonIcon>
                            <input type="password" name="password" required onChange={handleChange} />
                            <label>Mật Khẩu</label>
                        </div>
                        <div className="forget">
                            <Link to="../forgot-password">Quên mật khẩu</Link>
                        </div>
                        {isError &&
                            <p className="error">{messageError}</p>
                        }
                        <button onClick={handleSubmit}>Đăng Nhập</button>
                        <div className="register">
                            <p>Không có tài khoản: <Link to="../signUp">Đăng Ký</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </Section>
    )
}

export default LogIn;