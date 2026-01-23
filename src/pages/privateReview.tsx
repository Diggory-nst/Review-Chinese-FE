
import img3 from '../assets/img/anime3.jpg'
import img4 from '../assets/img/anime4.jpg'
import img5 from '../assets/img/anime5.jpg'
import img6 from '../assets/img/anime6.jpg'
import img7 from '../assets/img/anime7.jpg'
import img8 from '../assets/img/anime8.jpg'
import img9 from '../assets/img/anime9.jpg'
import img10 from '../assets/img/anime10.jpg'
import img11 from '../assets/img/anime11.jpg'
import img12 from '../assets/img/anime12.jpg'
import img13 from '../assets/img/anime13.jpg'
import img14 from '../assets/img/anime14.jpg'
import img15 from '../assets/img/anime15.jpg'
import img16 from '../assets/img/anime16.jpg'
import img17 from '../assets/img/anime17.jpg'
import img18 from '../assets/img/anime18.jpg'
import img19 from '../assets/img/anime19.jpg'
import img20 from '../assets/img/anime20.jpg'
import img21 from '../assets/img/anime21.jpg'
import img22 from '../assets/img/anime22.jpg'

import { Div } from '../assets/styles/privateReview'
import { useCallback, useEffect, useState } from 'react'

import configDomain from '../configs/config.domain';
import setHeadersRequest from '../utils/setHeadersRequest';
import axios from 'axios'
import logger from '../utils/logger';
import getAxiosErrorMessage from '../utils/getAxiosErrorMessage';

const images: string[] = [img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20, img21, img22]

interface TypeListName {
    _id: string,
    name: string
}

interface TypeReview {
    tuonghinh: string,
    meaning: Array<string>,
    result: string
}

const getDailyImage = (): string => {
    const date = new Date();
    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return images[dayOfYear % images.length];
};

const PrivateReview = () => {

    const domain = configDomain?.domain
    const headers = setHeadersRequest()

    const [dailyImage, setDailyImage] = useState<string>(getDailyImage());

    const [logged, setLogged] = useState<boolean>(false)
    const [endReview, setEndReview] = useState<boolean>(true)
    const [isError, setIsError] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>('')
    const [idUser, setIdUser] = useState<string>('')
    const [bookActive, setBookActive] = useState<string>('')
    const [listNameCompose, setListNameCompose] = useState<TypeListName[]>([{
        _id: '',
        name: ''
    }])
    const [dataReview, setDataReview] = useState<TypeReview[]>([{
        tuonghinh: '',
        meaning: [],
        result: ''
    }])
    const [indexReview, setIndexReview] = useState<number>(0)

    const client_id = localStorage.getItem('client_id')
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    // Check Login
    useEffect(() => {

        if (!client_id || !accessToken || !refreshToken) {
            setLogged(false)
            return
        }

        const checkLogin = async () => {
            try {
                const url = `${domain}/user/check-login`

                const res = await axios.get(url, { headers })
                const user = res.data.metadata.user

                if (user) {
                    setLogged(true)
                    setIdUser(user._id)
                }
            } catch (error) {
                setLogged(false)
            }
        }

        checkLogin()
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setDailyImage(getDailyImage());
        }, 24 * 60 * 60 * 1000); // Cập nhật mỗi 24 giờ

        return () => clearInterval(interval); // Dọn dẹp khi component bị unmount
    }, []);

    const getDataBook = async () => {

        const url = `${domain}/user/getListNameCompose`

        try {
            const res = await axios.post(url, { idUser: idUser }, { headers })
            const data = res.data.metadata

            setListNameCompose(data)
        } catch (error) {
            logger.error(error, 'getDataBook')
        }
    }

    useEffect(() => {
        if (logged) {
            getDataBook()
        }
    }, [logged])

    const sortMeaning = (arr: Array<string>) => arr.sort(() => Math.random() - 0.5)

    const showDataReview = async (idCompose: string) => {

        const url = `${domain}/user/getUserCompose`

        try {
            const res = await axios.post(url, { idCompose }, { headers })
            const { compose } = res.data.metadata
            const newData = compose.map((item: TypeReview) => {
                return {
                    tuonghinh: item.tuonghinh,
                    meaning: sortMeaning(item.meaning),
                    result: item.result
                }
            })

            setDataReview(newData)
            setBookActive(idCompose)
            setEndReview(false)
        } catch (error: any) {
            setEndReview(true)
            setBookActive(idCompose)
            setIsError(true)
            setMessageError(getAxiosErrorMessage(error))
        }
    }

    const showItemReview = useCallback(() => {

        if (indexReview === dataReview.length - 1) {
            setEndReview(true);
            setBookActive('');
            setIsError(false)
            setMessageError('')
            setIndexReview(0)
        } else {
            setIndexReview(prevIndex => prevIndex + 1);
        }
    }, [indexReview, dataReview.length])

    const handleEndReview = () => {
        setEndReview(true)
        setBookActive('')
    }

    const checkResult = (answer: string) => {
        if (answer === dataReview[indexReview].result) {
            showItemReview()
        }
    }

    return (
        <>
            {logged ?
                <Div className="container">
                    <div className="table-of-content">
                        <div className="book">
                            {listNameCompose.map((item, index) => {
                                return (
                                    <h1 key={index} style={{ color: bookActive == item._id ? '#527f4f' : 'black' }} className="name-book" onClick={() => showDataReview(item._id)}>{item.name}</h1>
                                )
                            })}
                        </div>
                    </div>
                    <div className="main-content">
                        {endReview ?
                            <div className="chose-lesson">
                                {isError ?
                                    <h1 className="error">{messageError}</h1>
                                    :
                                    <h1>Vui Lòng Chọn Bài</h1>
                                }
                            </div>
                            :
                            <>
                                <div className="main-word">
                                    <h1 className="tuong-hinh">{dataReview[indexReview].tuonghinh}</h1>
                                </div>
                                <div className="list-means-word">
                                    <h1 className="item-means-word" onClick={() => checkResult(dataReview[indexReview].meaning[0])}>{dataReview[indexReview].meaning[0]}</h1>
                                    <h1 className="item-means-word" onClick={() => checkResult(dataReview[indexReview].meaning[1])}>{dataReview[indexReview].meaning[1]}</h1>
                                    <h1 className="item-means-word" onClick={() => checkResult(dataReview[indexReview].meaning[2])}>{dataReview[indexReview].meaning[2]}</h1>
                                    <h1 className="item-means-word" onClick={() => checkResult(dataReview[indexReview].meaning[3])}>{dataReview[indexReview].meaning[3]}</h1>
                                </div>
                                <h1 className='end-word' onClick={handleEndReview}>Kết Thúc</h1>
                            </>
                        }
                    </div>
                    <div className="beauty-image" style={{ backgroundImage: `url(${dailyImage})` }}>
                    </div>
                </Div>
                :
                <div className="notAccessPage" style={{ minHeight: 'calc(100vh - 153px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <h1 style={{ fontSize: '2.8rem' }}>Vui Lòng Đăng Nhập Để Sử Dụng Chức Năng Này</h1>
                </div>
            }
        </>
    )
}

export default PrivateReview

