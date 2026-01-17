
import IonIcon from '@reacticons/ionicons';

import { Div } from '../../assets/styles/header/laptopHeader';

import configDomain from '../../configs/config.domain';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

type Props = {
    handleSectionShow: (section: string) => void;
}

const LaptopHeader: React.FC<Props> = ({ handleSectionShow }) => {

    const domain = configDomain?.domain

    const [accessAccount, setAccessAccount] = useState<boolean>(false)
    const [username, setUsername] = useState<string>('')
    const [pathImage, setPathImage] = useState<string>('')
    const [showOptionChange, setShowOptionChange] = useState<boolean>(false)
    const [showPopup, setShowPopup] = useState<boolean>(false)
    const [showPopupChangeAvatar, setShowPopupChangeAvatar] = useState<boolean>(false)
    const [showPopupChangePassword, setShowPopupChangePassword] = useState<boolean>(false)
    const [showExpandFunc, setShowExpandFunc] = useState<boolean>(false)

    const [isErrorChange, setIsErrorChange] = useState<boolean>(false)
    const [messageErrorChange, setMessageErrorChange] = useState<string>('')

    // Password
    const [password, setPassword] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const [avatar, setAvatar] = useState<any>(null)

    // Retrieve Token from LocalStorage
    const client_id = localStorage.getItem('client_id')
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    // Set headers requets
    const headers = {
        "Content-Type": 'application/json',
        "x-client-id": client_id,
        "authorization": accessToken,
        "x-rtoken-id": refreshToken
    }

    useEffect(() => {

        if (!client_id || !accessToken || !refreshToken) return

        const checkLogin = async () => {
            try {
                const url = `${domain}/user/check-login`

                const res = await axios.get(url, { headers })
                const user = res.data.metadata.user
                if (user) {
                    setAccessAccount(true)
                    setUsername(user.name)
                    setPathImage(user.image)
                }
            } catch (error) {
                setAccessAccount(false)
            }
        }

        checkLogin()
    }, [])

    const handleShowOptionChange = () => {
        showOptionChange ? setShowOptionChange(false) : setShowOptionChange(true)
    }

    const handleShowExpandFunc = () => {
        showExpandFunc ? setShowExpandFunc(false) : setShowExpandFunc(true)
    }

    const handleChangePassword = () => {
        setShowPopup(true)
        setShowPopupChangePassword(true)
        setShowPopupChangeAvatar(false)
        setShowOptionChange(false)
    }

    const handleChangeAvatar = () => {
        setShowPopup(true)
        setShowPopupChangePassword(false)
        setShowPopupChangeAvatar(true)
        setShowOptionChange(false)
    }

    const handleClosePopup = () => {
        setShowPopup(false)
    }

    const logOut = async () => {
        const url = `${domain}/user/logout`
        try {
            await axios.get(url, { headers })

            localStorage.clear()
            window.location.href = '../logIn'
        } catch (error) {
            console.log(error);
        }
    }

    // Change Password
    const changePassowrd = async () => {
        if (newPassword !== confirmPassword) {
            setIsErrorChange(true)
            setMessageErrorChange("Password Do Not Match")
            return
        }

        const url = `${domain}/user/change-password`
        const data = {
            oldPassword: password,
            newPassword: newPassword
        }

        try {
            await axios.patch(url, data, { headers })

            setIsErrorChange(false)
            setPassword('')
            setNewPassword('')
            setConfirmPassword('')
            setShowPopup(false)
        } catch (error: any) {
            setIsErrorChange(true)
            setMessageErrorChange(error.response?.data.message)
        }
    }

    // Change Avatar
    const changeAvatar = async () => {

        const url = `${domain}/user/upload-avatar`
        const data = {
            image: avatar
        }

        try {
            await axios.patch(url, data, {
                headers: {
                    ...headers,
                    "Content-Type": 'multipart/form-data'
                }
            })

            setIsErrorChange(false)
            setShowPopup(false)
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        } catch (error: any) {
            setIsErrorChange(true)
            setMessageErrorChange(error.response?.data.message)
        }
    }

    const handleSubmitChangeAvatar = () => {
        if (avatar) {
            changeAvatar()
        }

        return
    }

    const handleSubmitChangePassword = () => {

        if (password !== '' && newPassword !== '' && confirmPassword !== '') {
            changePassowrd()
        }

        return
    }

    // Logic Click Outside

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const accountElement = document.querySelector('.account');
            if (accountElement && !accountElement.contains(event.target as Node)) {
                setShowOptionChange(false);
            }
        };

        if (showOptionChange) {
            window.addEventListener('click', handleClickOutside);
        }

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [showOptionChange]);

    // const arrCategory = ['vocabulary', 'grammar', 'review', 'prepareLesson', 'privateReview']
    const arrCategory = ['vocabulary', 'grammar', 'review']

    const [activeSection, setActiveSection] = useState<string>('vocabulary');

    return (
        <Div className="header">
            <div className="grid wide">
                <div className='container'>
                    <div className="logo">
                        <h1>GORY</h1>
                    </div>
                    <nav>
                        {arrCategory.map((section) => (
                            <h1 key={section} className={`${section} ${activeSection === section ? `active` : ''}`} onClick={() => {
                                setActiveSection(section);
                                handleSectionShow(section);
                            }}>{section.charAt(0).toUpperCase() + section.slice(1) === 'Vocabulary' ? 'Từ Vựng' : section.charAt(0).toUpperCase() + section.slice(1) === 'Grammar' ? 'Ngữ Pháp' : 'Ôn Tập'}
                            </h1>
                        ))}
                        {/* <div className="expand" onClick={handleShowExpandFunc}>
                            <IonIcon className='icon-expand' name="caret-down-outline"></IonIcon>
                            <div className="expand-function" style={{ display: showExpandFunc ? 'block' : 'none' }}>
                                <h1 className="conversation" onClick={() => {
                                    handleSectionShow('conversation');
                                    setShowExpandFunc(false);
                                }}>Đoạn Hội Thoại</h1>
                                <h1 className="translate" onClick={() => {
                                    handleSectionShow('translate');
                                    setShowExpandFunc(false);
                                }}>Luyện Dịch (V-T)</h1>
                            </div>
                        </div> */}
                    </nav>
                    {accessAccount ? (
                        <div className="account" onClick={handleShowOptionChange}>
                            {pathImage ? (
                                <img src={`${domain}/avatars/${pathImage}`} alt="User Avatar" />
                            ) : (
                                <IonIcon className='icon-avatar' name="person-circle-outline" />
                            )}
                            <h1 className="nameAccount">{username}</h1>
                            <div style={{ display: showOptionChange ? 'block' : 'none' }} className="optionChange">
                                <div className="changePassword">
                                    <h1 onClick={handleChangePassword}>Đổi Mật Khẩu</h1>
                                </div>
                                <div className="changeAvatar">
                                    <h1 onClick={handleChangeAvatar}>Đổi Avatar</h1>
                                </div>
                                <div className="logOut">
                                    <h1 onClick={logOut}>Đăng Xuất</h1>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='auth'>
                            <div className="signIn">
                                <Link to='/login'>Đăng Nhập</Link>
                            </div>
                            <div className="register">
                                <Link to='/signup'>Đăng Ký</Link>
                            </div>
                        </div>
                    )}

                    {/* Popups: Các component riêng biệt */}
                    {showPopup && (
                        <div className="popups">
                            <div className="modal" onClick={handleClosePopup}></div>

                            {showPopupChangeAvatar && (
                                <div className="changeAvatar">
                                    <div className="close">
                                        <IonIcon name="close-outline" id='icon-close' onClick={handleClosePopup}></IonIcon>
                                    </div>
                                    <h1>Thay Avatar</h1>
                                    <input type="file" id='avatar' onChange={e => setAvatar(e.target.files?.[0])} />
                                    {isErrorChange && <p className="error-change">{messageErrorChange}</p>}
                                    <div className="saveAvatar">
                                        <h1 onClick={handleSubmitChangeAvatar}>Lưu Lại</h1>
                                    </div>
                                </div>
                            )}

                            {showPopupChangePassword && (
                                <div className="changePassword">
                                    <div className="close">
                                        <IonIcon name="close-outline" id='icon-close' onClick={handleClosePopup}></IonIcon>
                                    </div>
                                    <h1>Đổi Mật Khẩu</h1>
                                    <div className="formChangePassword">
                                        <input type="password" id='old-password' placeholder='Nhập Mật Khẩu Cũ' value={password} onChange={e => setPassword(e.target.value)} />
                                        <input type="password" id='new-password' placeholder='Nhập Mật Khẩu Mới' value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                                        <input type="password" id='confirm-password' placeholder='Xác Nhận Lại Mật Khẩu' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                                    </div>
                                    {isErrorChange && <p className="errorChange">{messageErrorChange}</p>}
                                    <div className="savePassword">
                                        <h1 onClick={handleSubmitChangePassword}>Lưu Lại</h1>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Div>
    )
}

export default LaptopHeader