
import Footer from '../../components/footer';
import IonIcon from '@reacticons/ionicons';

import { Div } from '../../assets/styles/admin/admin';

import CreateVocal from './createVocal';
import EditVocal from './editVocal';
import CreateGrammar from './createGrammar';
import EditGrammar from './editGrammar';
import DeleteGrammar from './deleteGrammar';
import ComposeReview from './composeReview';
import ComposeManyLesson from './composeManyLesson';
import EditPrepare from './editPrepare';
import ChangeOrderBook from './changeOrderBook';
import ChangeOrderLesson from './changeOrderLesson';
import CreateConversation from './createConversation';
import EditConversation from './editConversation';
import DeleteConversation from './deleteConversation';
import CreateTranslate from './createTranslate';
import EditTranslate from './editTranslate';
import DeleteTranslate from './deleteTranslate';

import configDomain from '../../configs/config.domain';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import setHeadersRequest from '../../utils/setHeadersRequest';

const Admin = () => {

    const domain = configDomain?.domain
    const headers = setHeadersRequest()

    const [logged, setLogged] = useState<boolean>(false)
    const [username, setUsername] = useState<String>('')
    const [pathImage, setPathImage] = useState<String>('')
    const [sectionActive, setSectionActive] = useState<String>('choiceSection')
    const [sectionShow, setSectionShow] = useState<String>('choiceSection')

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

    const renderSwitch = (param: String) => {
        switch (param) {
            case 'choiceSection':
                return (
                    <div className="wait-page">
                        <h1>Vui Lòng Chọn Nội Dung</h1>
                    </div>
                )
            case 'stvm':
                return <CreateVocal />
            case 'cstv':
                return <EditVocal />
            case 'snpm':
                return <CreateGrammar />
            case 'csnp':
                return <EditGrammar />
            case 'xnp':
                return <DeleteGrammar />
            case 'sot':
                return <ComposeReview />
            case 'snb':
                return <ComposeManyLesson />
            case 'csot':
                return <EditPrepare />
            case 'sxs':
                return <ChangeOrderBook />
            case 'sxbh':
                return <ChangeOrderLesson />
            case 'tdht':
                return <CreateConversation />
            case 'sdht':
                return <EditConversation />
            case 'xdht':
                return <DeleteConversation />
            case 'tbd':
                return <CreateTranslate />
            case 'csbd':
                return <EditTranslate />
            case 'xbd':
                return <DeleteTranslate />
            default:
                return (
                    <div className="wait-page">
                        <h1>Vui Lòng Chọn Nội Dung</h1>
                    </div>
                )
        }
    }

    const handleSectionShow = (param: String) => {
        setSectionActive(param)
        setSectionShow(param)
    }

    return (
        <>
            {logged ?
                <Div className="admin">
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
                            <div className="table-of-content">
                                <div className="section-vocalbulary cssChung">
                                    <h1 className='title'>Từ Vựng</h1>
                                    <h1 style={{ color: sectionActive === 'stvm' ? '#527f4f' : 'black' }} onClick={() => handleSectionShow('stvm')}>Soạn Từ Vựng Mới</h1>
                                    <h1 style={{ color: sectionActive === 'cstv' ? '#527f4f' : 'black' }} onClick={() => handleSectionShow('cstv')}>Chỉnh Sửa Từ Vựng</h1>
                                </div>
                                <div className="section-grammar cssChung">
                                    <h1 className='title'>Ngữ Pháp</h1>
                                    <h1 style={{ color: sectionActive === 'snpm' ? '#527f4f' : 'black' }} onClick={() => handleSectionShow('snpm')}>Soạn Ngữ Pháp Mới</h1>
                                    <h1 style={{ color: sectionActive === 'csnp' ? '#527f4f' : 'black' }} onClick={() => handleSectionShow('csnp')}>Chỉnh Sửa Ngữ Pháp</h1>
                                    <h1 style={{ color: sectionActive === 'xnp' ? '#527f4f' : 'black' }} onClick={() => handleSectionShow('xnp')}>Xóa Ngữ Pháp</h1>
                                </div>
                                <div className="section-conversation cssChung">
                                    <h1 className='title'>Đoạn Hội Thoại</h1>
                                    <h1 style={{ color: sectionActive === 'tdht' ? '#527f4f' : 'black' }} onClick={() => handleSectionShow('tdht')}>Thêm Đoạn Hội Thoại</h1>
                                    <h1 style={{ color: sectionActive === 'sdht' ? '#527f4f' : 'black' }} onClick={() => handleSectionShow('sdht')}>Sửa Đoạn Hội Thoại</h1>
                                    <h1 style={{ color: sectionActive === 'xdht' ? '#527f4f' : 'black' }} onClick={() => handleSectionShow('xdht')}>Xóa Đoạn Hội Thoại</h1>
                                </div>
                                <div className="section-translate cssChung">
                                    <h1 className='title'>Bài Luyện Dịch</h1>
                                    <h1 style={{ color: sectionActive === 'tbd' ? '#527f4f' : 'black' }} onClick={() => handleSectionShow('tbd')}>Thêm Bài Luyện Dịch</h1>
                                    <h1 style={{ color: sectionActive === 'csbd' ? '#527f4f' : 'black' }} onClick={() => handleSectionShow('csbd')}>Chỉnh Sửa Bài Luyện Dịch</h1>
                                    <h1 style={{ color: sectionActive === 'xbd' ? '#527f4f' : 'black' }} onClick={() => handleSectionShow('xbd')}>Xóa Bài Luyện Dịch</h1>
                                </div>
                                <div className="section-review cssChung">
                                    <h1 className='title'>Ôn Tập</h1>
                                    <h1 style={{ color: sectionActive === 'sot' ? '#527f4f' : 'black' }} onClick={() => handleSectionShow('sot')}>Soạn Ôn Tập</h1>
                                    <h1 style={{ color: sectionActive === 'snb' ? '#527f4f' : 'black' }} onClick={() => handleSectionShow('snb')}>Soạn Nhiều Bài</h1>
                                    <h1 style={{ color: sectionActive === 'csot' ? '#527f4f' : 'black' }} onClick={() => handleSectionShow('csot')}>Chỉnh Sửa Ôn Tập</h1>
                                </div>
                                <div className="section-changeOrder cssChung">
                                    <h1 className='title'>Sắp Xếp Thứ Tự</h1>
                                    <h1 style={{ color: sectionActive === 'sxs' ? '#527f4f' : 'black' }} onClick={() => handleSectionShow('sxs')}>Sắp Xếp Sách</h1>
                                    <h1 style={{ color: sectionActive === 'sxbh' ? '#527f4f' : 'black' }} onClick={() => handleSectionShow('sxbh')}>Sắp Xếp Bài Học</h1>

                                </div>
                                <div className="moveToManageUser">
                                    <Link to="../admin-manage-user">Quản Lý Người Dùng</Link>
                                </div>
                            </div>
                            <div className="main">
                                {renderSwitch(sectionShow)}
                            </div>
                        </div>
                        <Footer />
                    </div>
                </Div>
                :
                <div className="notAccessPage" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <h1 style={{ fontSize: '3.5rem', lineHeight: '3.8rem' }}>Bạn Không Có Quyền Truy Cập Trang Này</h1>
                </div>
            }
        </>
    )
}

export default Admin;