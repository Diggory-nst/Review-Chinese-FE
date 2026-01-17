import ListBookMobile from '../../components/listBookMobile'

import { Div } from '../../assets/styles/review/mobileReview'
import { useCallback, useEffect, useState } from 'react'

import configDomain from '../../configs/config.domain';
import axios from 'axios'
import IonIcon from '@reacticons/ionicons';

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

const MobileReview = () => {

    const domain = configDomain?.domain

    const [endReview, setEndReview] = useState<boolean>(true)
    const [isError, setIsError] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>('')
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

    useEffect(() => {

        const getDataBook = async () => {
            const url = `${domain}/general/getDataBook`

            try {
                const res = await axios.get(url, { params: { section: 'review' } })
                const data = res.data.metadata

                setDataBook(data)
            } catch (error) {
                console.log(error)
            }
        }

        getDataBook()
    }, [])

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
            setEndReview(false)
        } catch (error: any) {
            setEndReview(true)
            setIsError(true)
            setMessageError(error.response.data.message)
        }
    }

    const showItemReview = useCallback(() => {

        if (indexReview === dataReview.length - 1) {
            setEndReview(true);
            setIsError(false)
            setMessageError('')
            setIndexReview(0)
        } else {
            setIndexReview(prevIndex => prevIndex + 1);
        }
    }, [indexReview, dataReview.length])

    const handleEndReview = () => {
        setEndReview(true)
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
            <ListBookMobile dataBook={dataBook} endLessonReview={endReview} onLessonClick={(bookId, lessonId) => { showDataReview(bookId, lessonId) }} />
            <div className="mainContent">
                {endReview ?
                    <div className="choseLesson">
                        {isError ?
                            <h1 className="error">{messageError}</h1>
                            :
                            <h1>Vui Lòng Chọn Bài</h1>
                        }
                    </div>
                    :
                    <>
                        <div className="mainWord">
                            <h1 className="tuongHinh">{dataReview[indexReview].tuonghinh}</h1>
                        </div>
                        <div className="inforMainWorld">
                            <h1 id='type'>( {dataReview[indexReview].type} )</h1>
                            <h1>{dataReview[indexReview].pinyin}</h1>
                            <IonIcon name="volume-high-outline" id='iconAudio' onClick={() => playAudio(dataReview[indexReview].audio)}></IonIcon>
                        </div>
                        <div className="listMeansWord">
                            <h1 className="itemMeansWord" onClick={() => checkResult(dataReview[indexReview].meaning[0])}>{dataReview[indexReview].meaning[0]}</h1>
                            <h1 className="itemMeansWord" onClick={() => checkResult(dataReview[indexReview].meaning[1])}>{dataReview[indexReview].meaning[1]}</h1>
                            <h1 className="itemMeansWord" onClick={() => checkResult(dataReview[indexReview].meaning[2])}>{dataReview[indexReview].meaning[2]}</h1>
                            <h1 className="itemMeansWord" onClick={() => checkResult(dataReview[indexReview].meaning[3])}>{dataReview[indexReview].meaning[3]}</h1>
                        </div>
                        <h1 className='endWord' onClick={handleEndReview}>Kết Thúc</h1>
                    </>
                }
            </div>
        </Div>
    )
}

export default MobileReview