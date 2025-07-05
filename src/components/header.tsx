
import IonIcon from '@reacticons/ionicons';

import { Div } from '../assets/styles/header'

import configDomain from '../configs/config.domain';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

type Props = {
    handleSectionShow: (section: string) => void;
}

const Header: React.FC<Props> = ({ handleSectionShow }) => {

    const domain = configDomain?.domain

    const [accessAccount, setAccessAccount] = useState<boolean>(false)
    const [username, setUsername] = useState<string>('')
    const [pathImage, setPathImage] = useState<string>('')
    const [showCategory, setShowCategory] = useState<boolean>(false)
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

    useEffect(() => {
        const hasSeenAlert = localStorage.getItem('hasSeenAlert');

        if (!hasSeenAlert) {
            alert("Trang web chỉ tương thích với Máy Tính. Chúng tôi sẽ sớm hoàn thiện trang web để tương thích với mọi thiết bị. Xin lỗi vì sự bất tiện này");
            localStorage.setItem('hasSeenAlert', 'true');
        }
    }, [])

    const handleShowCategory = () => {
        showCategory ? setShowCategory(false) : setShowCategory(true)
    }

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

    return (
        <Div className="header">
            <div className="grid wide">
                {/* responsive for desktop */}
                <div className='container-for-desktop'>
                    <div className="logo">
                        <h1>GORY</h1>
                    </div>
                    <nav>
                        <h1 className="vocalbulary" onClick={() => handleSectionShow('vocabulary')}>Từ Vựng</h1>
                        <h1 className="grammar" onClick={() => handleSectionShow('grammar')}>Ngữ Pháp</h1>
                        <h1 className="review" onClick={() => handleSectionShow('review')}>Ôn Tập</h1>
                        <h1 className="prepare-lesson" onClick={() => handleSectionShow('prepareLesson')}>Soạn Bài</h1>
                        <h1 className="private-review" onClick={() => handleSectionShow('privateReview')}>Ôn Tập Riêng</h1>
                        <div className="expand" onClick={handleShowExpandFunc}>
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
                        </div>
                    </nav>
                    <div className="login">
                        <div className="dark-mode">
                            <IonIcon className='icon-light' name="sunny-outline" />
                            <IonIcon className='icon-dark' name="moon-outline" />
                        </div>
                        {accessAccount ?
                            <div className="account">
                                {pathImage === '' ?
                                    <IonIcon className='icon-avatar' name="person-circle-outline" />
                                    :
                                    <img src={`${domain}/avatars/${pathImage}`} />
                                }
                                <h1 className="name-account" onClick={handleShowOptionChange}>{username}</h1>
                                <div style={{ display: showOptionChange ? 'block' : 'none' }} className="option-change">
                                    <div className="change-password">
                                        <h1 onClick={handleChangePassword}>Đổi Mật Khẩu</h1>
                                    </div>
                                    <div className="change-avatar">
                                        <h1 onClick={handleChangeAvatar}>Đổi Avatar</h1>
                                    </div>
                                    <div className="log-out">
                                        <h1 onClick={logOut}>Đăng Xuất</h1>
                                    </div>
                                </div>
                            </div>
                            :
                            <>
                                <div className="signin">
                                    <Link to='/login'>Đăng Nhập</Link>
                                </div>
                                <div className="register">
                                    <Link to='/signup'>Đăng Ký</Link>
                                </div>
                            </>

                        }
                    </div>
                    {/* popup */}
                    <div style={{ display: showPopup ? 'flex' : 'none' }} className="popup-change-avatar">
                        <div className="modal"></div>
                        <div style={{ display: showPopupChangeAvatar ? 'block' : 'none' }} className="change-avatar">
                            <div className="close">
                                <IonIcon name="close-outline" id='icon-close' onClick={handleClosePopup}></IonIcon>
                            </div>
                            <h1>Thay Avatar</h1>
                            <input type="file" id='avatar' onChange={e => setAvatar(e.target.files?.[0])} />
                            {isErrorChange && <h1 className="error-change">{messageErrorChange}</h1>}
                            <div className="save-avatar">
                                <h1 onClick={handleSubmitChangeAvatar}>Lưu Lại</h1>
                            </div>
                        </div>
                        <div style={{ display: showPopupChangePassword ? 'block' : 'none' }} className="change-password">
                            <div className="close">
                                <IonIcon name="close-outline" id='icon-close' onClick={handleClosePopup}></IonIcon>
                            </div>
                            <h1>Đổi Mật Khẩu</h1>
                            <div className="form-change-password">
                                <input type="password" id='old-password' placeholder='Nhập Mật Khẩu Cũ' value={password} onChange={e => setPassword(e.target.value)} />
                                <input type="password" id='new-password' placeholder='Nhập Mật Khẩu Mới' value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                                <input type="password" id='confirm-password' placeholder='Xác Nhận Lại Mật Khẩu' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                            </div>
                            {isErrorChange && <h1 className="error-change">{messageErrorChange}</h1>}
                            <div className="save-password">
                                <h1 onClick={handleSubmitChangePassword}>Lưu Lại</h1>
                            </div>
                        </div>
                    </div>
                </div>
                {/* resposive for tablet */}
                <div className='container-for-tablet'>
                    <div className="navigation">
                        <IonIcon name="reorder-four-outline" id='icon-navbar' onClick={handleShowCategory}></IonIcon>
                        <div className="category" style={{ display: showCategory ? 'block' : 'none' }}>
                            <div className="dark-mode">
                                <IonIcon className='icon-light' name="sunny-outline" />
                                <IonIcon className='icon-dark' name="moon-outline" />
                            </div>
                            <div className="navbar">
                                <h1 className="vocalbulary" onClick={() => {
                                    handleSectionShow('vocabulary');
                                    setShowCategory(false);
                                }}>Từ Vựng</h1>
                                <h1 className="grammar" onClick={() => {
                                    handleSectionShow('grammar');
                                    setShowCategory(false);
                                }}>Ngữ Pháp</h1>
                                <h1 className="review" onClick={() => {
                                    handleSectionShow('review');
                                    setShowCategory(false);
                                }}>Ôn Tập</h1>
                                <h1 className="prepare-lesson" onClick={() => {
                                    handleSectionShow('prepareLesson');
                                    setShowCategory(false);
                                }}>Soạn Bài</h1>
                                <h1 className="private-review" onClick={() => {
                                    handleSectionShow('privateReview');
                                    setShowCategory(false);
                                }}>Ôn Tập Riêng</h1>
                            </div>
                        </div>
                    </div>
                    <div className="logo">
                        <h1>GORY</h1>
                    </div>
                    <div className="login">
                        {accessAccount ?
                            <div className="account">
                                {pathImage === '' ?
                                    <IonIcon className='icon-avatar' name="person-circle-outline" />
                                    :
                                    <img src={`${domain}/avatars/${pathImage}`} />
                                }
                                <h1 className="name-account" onClick={handleShowOptionChange}>{username}</h1>
                                <div className="option-change" style={{ display: showOptionChange ? 'block' : 'none' }}>
                                    <div className="change-password">
                                        <h1 onClick={handleChangePassword}>Đổi Mật Khẩu</h1>
                                    </div>
                                    <div className="change-avatar">
                                        <h1 onClick={handleChangeAvatar}>Đổi Avatar</h1>
                                    </div>
                                    <div className="log-out">
                                        <h1 onClick={logOut}>Đăng Xuất</h1>
                                    </div>
                                </div>
                            </div>
                            :
                            <>
                                <div className="signin">
                                    <Link to='/login'>Đăng Nhập</Link>
                                </div>
                                <div className="register">
                                    <Link to='/signup'>Đăng Ký</Link>
                                </div>
                            </>

                        }
                    </div>
                    {/* popup */}
                    <div style={{ display: showPopup ? 'flex' : 'none' }} className="popup-change-avatar">
                        <div className="modal"></div>
                        <div style={{ display: showPopupChangeAvatar ? 'block' : 'none' }} className="change-avatar">
                            <div className="close">
                                <IonIcon name="close-outline" id='icon-close' onClick={handleClosePopup}></IonIcon>
                            </div>
                            <h1>Thay Avatar</h1>
                            <input type="file" id='avatar' onChange={e => setAvatar(e.target.files?.[0])} />
                            {isErrorChange && <h1 className="error-change">{messageErrorChange}</h1>}
                            <div className="save-avatar">
                                <h1 onClick={handleSubmitChangeAvatar}>Lưu Lại</h1>
                            </div>
                        </div>
                        <div style={{ display: showPopupChangePassword ? 'block' : 'none' }} className="change-password">
                            <div className="close">
                                <IonIcon name="close-outline" id='icon-close' onClick={handleClosePopup}></IonIcon>
                            </div>
                            <h1>Đổi Mật Khẩu</h1>
                            <div className="form-change-password">
                                <input type="password" id='old-password' placeholder='Nhập Mật Khẩu Cũ' value={password} onChange={e => setPassword(e.target.value)} />
                                <input type="password" id='new-password' placeholder='Nhập Mật Khẩu Mới' value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                                <input type="password" id='confirm-password' placeholder='Xác Nhận Lại Mật Khẩu' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                            </div>
                            {isErrorChange && <h1 className="error-change">{messageErrorChange}</h1>}
                            <div className="save-password">
                                <h1 onClick={handleSubmitChangePassword}>Lưu Lại</h1>
                            </div>
                        </div>
                    </div>
                </div>
                {/* resposive for mobile */}
                <div className='container-for-mobile'>
                    <div className="navigation">
                        <IonIcon name="reorder-four-outline" id='icon-navbar' onClick={handleShowCategory}></IonIcon>
                        <div className="category" style={{ display: showCategory ? 'block' : 'none' }}>
                            <div className="login">
                                {accessAccount ?
                                    <div className="account">
                                        {pathImage === '' ?
                                            <IonIcon className='icon-avatar' name="person-circle-outline" />
                                            :
                                            <img src={`${domain}/avatars/${pathImage}`} />
                                        }
                                        <h1 className="name-account" onClick={handleShowOptionChange}>{username}</h1>
                                        <div className="option-change" style={{ display: showOptionChange ? 'block' : 'none' }}>
                                            <div className="change-password">
                                                <h1 onClick={handleChangePassword}>Đổi Mật Khẩu</h1>
                                            </div>
                                            <div className="change-avatar">
                                                <h1 onClick={handleChangeAvatar}>Đổi Avatar</h1>
                                            </div>
                                            <div className="log-out">
                                                <h1 onClick={logOut}>Đăng Xuất</h1>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <>
                                        <div className="signin">
                                            <Link to='/login'>Đăng Nhập</Link>
                                        </div>
                                        <div className="register">
                                            <Link to='/signup'>Đăng Ký</Link>
                                        </div>
                                    </>

                                }
                            </div>
                            <div className="dark-mode">
                                <IonIcon className='icon-light' name="sunny-outline" />
                                <IonIcon className='icon-dark' name="moon-outline" />
                            </div>
                            <div className="navbar">
                                <h1 className="vocalbulary" onClick={() => {
                                    handleSectionShow('vocabulary');
                                    setShowCategory(false);
                                }}>Từ Vựng</h1>
                                <h1 className="grammar" onClick={() => {
                                    handleSectionShow('grammar');
                                    setShowCategory(false);
                                }}>Ngữ Pháp</h1>
                                <h1 className="review" onClick={() => {
                                    handleSectionShow('review');
                                    setShowCategory(false);
                                }}>Ôn Tập</h1>
                                <h1 className="prepare-lesson" onClick={() => {
                                    handleSectionShow('prepareLesson');
                                    setShowCategory(false);
                                }}>Soạn Bài</h1>
                                <h1 className="private-review" onClick={() => {
                                    handleSectionShow('privateReview');
                                    setShowCategory(false);
                                }}>Ôn Tập Riêng</h1>
                            </div>
                        </div>
                    </div>
                    <div className="logo">
                        <h1>GORY</h1>
                    </div>
                    {/* popup */}
                    <div style={{ display: showPopup ? 'flex' : 'none' }} className="popup-change-avatar">
                        <div className="modal"></div>
                        <div style={{ display: showPopupChangeAvatar ? 'block' : 'none' }} className="change-avatar">
                            <div className="close">
                                <IonIcon name="close-outline" id='icon-close' onClick={handleClosePopup}></IonIcon>
                            </div>
                            <h1>Thay Avatar</h1>
                            <input type="file" id='avatar' onChange={e => setAvatar(e.target.files?.[0])} />
                            {isErrorChange && <h1 className="error-change">{messageErrorChange}</h1>}
                            <div className="save-avatar">
                                <h1 onClick={handleSubmitChangeAvatar}>Lưu Lại</h1>
                            </div>
                        </div>
                        <div style={{ display: showPopupChangePassword ? 'block' : 'none' }} className="change-password">
                            <div className="close">
                                <IonIcon name="close-outline" id='icon-close' onClick={handleClosePopup}></IonIcon>
                            </div>
                            <h1>Đổi Mật Khẩu</h1>
                            <div className="form-change-password">
                                <input type="password" id='old-password' placeholder='Nhập Mật Khẩu Cũ' value={password} onChange={e => setPassword(e.target.value)} />
                                <input type="password" id='new-password' placeholder='Nhập Mật Khẩu Mới' value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                                <input type="password" id='confirm-password' placeholder='Xác Nhận Lại Mật Khẩu' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                            </div>
                            {isErrorChange && <h1 className="error-change">{messageErrorChange}</h1>}
                            <div className="save-password">
                                <h1 onClick={handleSubmitChangePassword}>Lưu Lại</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Div>
    )
}

export default Header