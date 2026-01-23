
import IonIcon from '@reacticons/ionicons';
import Pagination from '../../components/pagination';
import { Div } from '../../assets/styles/admin/manageUser';

import configDomain from '../../configs/config.domain';
import { useEffect, useState } from 'react';
import axios from 'axios';
import setHeadersRequest from '../../utils/setHeadersRequest';
import logger from '../../utils/logger';

interface TypeUser {
    _id: string,
    name: string,
    email: string
}

const ManageUser = () => {

    const domain = configDomain?.domain
    const headers = setHeadersRequest()

    const [username, setUsername] = useState<string>('')
    const [pathImage, setPathImage] = useState<string>('')

    const [logged, setLogged] = useState<boolean>(false)
    const [status, setStatus] = useState<string>('active')
    const [totalUser, setTotalUser] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [limitPage, _setLimitPage] = useState<number>(40)
    const [users, setUsers] = useState<TypeUser[]>([{
        _id: '',
        name: '',
        email: ''
    }])

    const client_id = localStorage.getItem('client_id')
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    useEffect(() => {

        if (!client_id || !accessToken || !refreshToken) {
            setLogged(false)
            return
        }

        const checkLogin = async () => {
            try {
                const url = `${domain}/user/check-login`

                const res = await axios.get(url, { headers })
                const { name, image, roles } = res.data.metadata.user
                if (roles === 'admin') {
                    setLogged(true)
                    setUsername(name)
                    setPathImage(image)
                }
            } catch (error) {
                setLogged(false)
            }
        }

        checkLogin()
    }, [])

    const getUser = async (status: string) => {

        setStatus(status)

        const url = `${domain}/admin/getUser`

        try {
            const res = await axios.post(url, { status, limit: limitPage, currentPage: currentPage }, { headers })
            const { totalUser, users } = res.data.metadata

            setTotalUser(totalUser)
            setUsers(users)
            setStatus(status)
        } catch (error: any) {
            logger.error(error, 'getUser')
        }
    }

    useEffect(() => {
        getUser(status)
    }, [currentPage])

    const shareCurrentPage = (currentPage: number) => {
        setCurrentPage(currentPage)
    }

    const deleteUser = async (id: string, indexUser: number) => {

        const url = `${domain}/admin/deleteUser`

        try {
            await axios.post(url, { id }, { headers })

            const newUsers = users.filter((_: any, index: number) => index !== indexUser)

            setTotalUser(totalUser - 1)
            setUsers(newUsers)
        } catch (error) {
            logger.error(error, 'deleteUser')
        }
    }

    const deleteAllInactiveUser = async () => {

        const url = `${domain}/admin/deleteAllInactiveUser`

        try {
            await axios.delete(url, { headers })
        } catch (error) {
            logger.error(error, 'deleteAllInactiveUser')
        }
    }

    return (
        <>
            {logged ?
                <Div className="manageUser">
                    <header>
                        <div className="grid wide">
                            <div className="account">
                                {pathImage === '' ?
                                    <IonIcon className='icon-avatar' name="person-circle-outline" />
                                    :
                                    <img src={`${domain}/avatars/${pathImage}`} />
                                }
                                <h1 className="name-account">{username}</h1>
                            </div>
                        </div>
                    </header>
                    <div className="grid wide">
                        <div className="container">
                            <div className="sectionOption">
                                <h1 className="showNumberUser">Tổng số người dùng: {totalUser}</h1>
                                <div className="optionUser">
                                    <span className={status == 'active' ? 'userActive active' : 'userActive'} onClick={() => getUser('active')}>Activated User</span>
                                    <span className={status == 'inactive' ? 'userInactive active' : 'userInactive'} onClick={() => getUser('inactive')}>Inactive User</span>
                                    <span className={status == 'admin' ? ' admin active' : 'admin'} onClick={() => getUser('admin')}>Admin Account</span>
                                    <span className="deleteAllUser" onClick={deleteAllInactiveUser}>Delete All Inactive User</span>
                                </div>
                            </div>
                            {
                                totalUser !== 0 ?
                                    <div className="sectionShowInforUser">
                                        {users.map((item, index) => {
                                            if ((index + 1) % 4 === 0) {
                                                return (
                                                    <div className="itemUser no-margin" key={index}>
                                                        <div className="infor">
                                                            <h1 className="username">{item.name}</h1>
                                                            <h1 className="email">{item.email}</h1>
                                                        </div>
                                                        <div className="deleteUser">
                                                            <IonIcon name="close-circle-outline" onClick={() => deleteUser(item._id, index)}></IonIcon>
                                                        </div>
                                                    </div>
                                                )
                                            } else {
                                                return (
                                                    <div className="itemUser" key={index}>
                                                        <div className="infor">
                                                            <h1 className="username">{item.name}</h1>
                                                            <h1 className="email">{item.email}</h1>
                                                        </div>
                                                        <div className="deleteUser">
                                                            <IonIcon name="close-circle-outline" onClick={() => deleteUser(item._id, index)}></IonIcon>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                    :
                                    <div className="noUser">
                                        <h1>Không Có Người Dùng</h1>
                                    </div>
                            }
                        </div>
                    </div>
                    {
                        totalUser !== 0 &&
                        <div className="grid wide">
                            <Pagination totalDc={totalUser} limitPage={limitPage} shareCurrentPage={shareCurrentPage} />
                        </div>
                    }
                </Div>
                :
                <div className="notAccessPage" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <h1 style={{ fontSize: '3.5rem', lineHeight: '3.8rem' }}>Bạn Không Có Quyền Truy Cập Trang Này</h1>
                </div>
            }
        </>
    )
}

export default ManageUser;