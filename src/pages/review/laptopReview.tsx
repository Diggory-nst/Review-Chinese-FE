
import img3 from '../../assets/img/anime3.jpg'
import img4 from '../../assets/img/anime4.jpg'
import img5 from '../../assets/img/anime5.jpg'
import img6 from '../../assets/img/anime6.jpg'
import img7 from '../../assets/img/anime7.jpg'
import img8 from '../../assets/img/anime8.jpg'
import img9 from '../../assets/img/anime9.jpg'
import img10 from '../../assets/img/anime10.jpg'
import img11 from '../../assets/img/anime11.jpg'
import img12 from '../../assets/img/anime12.jpg'
import img13 from '../../assets/img/anime13.jpg'
import img14 from '../../assets/img/anime14.jpg'
import img15 from '../../assets/img/anime15.jpg'
import img16 from '../../assets/img/anime16.jpg'
import img17 from '../../assets/img/anime17.jpg'
import img18 from '../../assets/img/anime18.jpg'
import img19 from '../../assets/img/anime19.jpg'
import img20 from '../../assets/img/anime20.jpg'
import img21 from '../../assets/img/anime21.jpg'
import img22 from '../../assets/img/anime22.jpg'

import { Div } from '../../assets/styles/review/laptopReview'
import { useCallback, useEffect, useState } from 'react'

import configDomain from '../../configs/config.domain';
import axios from 'axios'
import IonIcon from '@reacticons/ionicons'
import logger from '../../utils/logger';
import getAxiosErrorMessage from '../../utils/getAxiosErrorMessage';

const images: string[] = [img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20, img21, img22]

interface TypeDataBook {
    book: {
        _id: string,
        name: string
    },
    lesson: Array<{
        _id: string,
        name: string
    }>
}

interface TypeReview {
    tuonghinh: string,
    pinyin: string,
    type: string,
    audio: string,
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

const LaptopReview = () => {

    const domain = configDomain?.domain

    const [dailyImage, setDailyImage] = useState<string>(getDailyImage());

    const [endReview, setEndReview] = useState<boolean>(true)
    const [isError, setIsError] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>('')
    const [expandBookId, setExpandBookId] = useState<string>('')
    const [expandBook, setExpandBook] = useState<boolean>(false)
    const [bookActive, setBookActive] = useState<string>('')
    const [dataBook, setDataBook] = useState<TypeDataBook[]>([])
    const [dataReview, setDataReview] = useState<TypeReview[]>([{
        tuonghinh: '',
        pinyin: '',
        type: '',
        audio: '',
        meaning: [],
        result: ''
    }])
    const [indexReview, setIndexReview] = useState<number>(0)

    const handleExpandBook = useCallback((idBook: string) => {

        if (expandBookId === idBook) {
            setExpandBook(false);
            setExpandBookId('');
        } else {
            setExpandBook(true);
            setExpandBookId(idBook);
        }
    }, [expandBookId])

    useEffect(() => {

        const getDataBook = async () => {
            const url = `${domain}/general/getDataBook`

            try {
                const res = await axios.get(url, { params: { section: 'review' } })
                const data = res.data.metadata

                setDataBook(data)
            } catch (error) {
                logger.error(error, 'getDataBook')
            }
        }

        getDataBook()
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setDailyImage(getDailyImage());
        }, 24 * 60 * 60 * 1000); // Cập nhật mỗi 24 giờ

        return () => clearInterval(interval); // Dọn dẹp khi component bị unmount
    }, []);

    const sortMeaning = (arr: Array<string>) => arr.sort(() => Math.random() - 0.5)

    const showDataReview = async (idBook: string, idLesson: string) => {

        const url = `${domain}/general/getReview`

        try {
            const res = await axios.post(url, { idBook, idLesson })
            const data = res.data.metadata
            const newData = data.map((item: TypeReview) => {
                return {
                    tuonghinh: item.tuonghinh,
                    pinyin: item.pinyin,
                    type: item.type,
                    audio: item.audio,
                    meaning: sortMeaning(item.meaning),
                    result: item.result
                }
            })

            setDataReview(newData)
            setBookActive(idLesson)
            setEndReview(false)
        } catch (error: any) {
            setEndReview(true)
            setBookActive(idLesson)
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

    // Listen Audio
    const playAudio = (pathAudio: string) => {
        const urlAudio = `${domain}/audio/${pathAudio}`
        new Audio(urlAudio).play()
    }

    return (
        <Div className="container">
            <div className="table-of-content">
                <div className="book">
                    {dataBook.map((item, indexBook) => {
                        return (
                            <div className="item-book" key={indexBook}>
                                <h1 className="name-book" onClick={() => handleExpandBook(item.book._id)}>{item.book.name}</h1>
                                <div style={{ display: expandBook && expandBookId == item.book._id ? 'block' : 'none' }} className="list-lesson">
                                    {item.lesson.map((elm, indexLesson) => {
                                        return (
                                            <h2 style={{ color: bookActive == elm._id ? '#5184bb' : 'black' }} className="name-lesson" key={indexLesson} onClick={() => { showDataReview(item.book._id, elm._id) }}>{elm.name}</h2>
                                        )
                                    })}
                                </div>
                            </div>
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
                        <div className="inforMainWorld">
                            <h1 id='type'>( {dataReview[indexReview].type} )</h1>
                            <h1>{dataReview[indexReview].pinyin}</h1>
                            <IonIcon name="volume-high-outline" id='iconAudio' onClick={() => playAudio(dataReview[indexReview].audio)}></IonIcon>
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
    )
}

export default LaptopReview

