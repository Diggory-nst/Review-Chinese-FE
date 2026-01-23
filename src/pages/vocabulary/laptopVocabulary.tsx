
import { Div } from '../../assets/styles/vocabulary/laptopVocabulary'
import IonIcon from '@reacticons/ionicons'
import { useCallback, useEffect, useState } from 'react'

import configDomain from '../../configs/config.domain';
import axios from 'axios'
import logger from '../../utils/logger';
import getAxiosErrorMessage from '../../utils/getAxiosErrorMessage';

interface TypeVocabulary {
    tuonghinh: string,
    pinyin: string,
    meaning: string,
    audio: string,
    type: string,
    example: string
}

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

const LaptopVocabulary = () => {

    const domain = configDomain?.domain

    const [choiceBook, setChoiceBook] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>('')
    const [expandBookId, setExpandBookId] = useState<string>('')
    const [expandBook, setExpandBook] = useState<boolean>(false)
    const [bookActive, setBookActive] = useState<string>('')
    const [dataBook, setDataBook] = useState<TypeDataBook[]>([])
    const [dataVocabulary, setDataVocabulary] = useState<TypeVocabulary[]>([])

    const handleExpandBook = useCallback((idBook: string) => {

        if (expandBookId === idBook) {
            setExpandBook(false);
            setExpandBookId('');
        } else {
            setExpandBook(true);
            setExpandBookId(idBook);
        }
    }, [expandBookId])

    // Listen Audio
    const playAudio = (pathAudio: string) => {
        const urlAudio = `${domain}/audio/${pathAudio}`
        new Audio(urlAudio).play()
    }

    useEffect(() => {

        const getDataBook = async () => {
            const url = `${domain}/general/getDataBook`

            try {
                const res = await axios.get(url, { params: { section: 'vocabulary' } })
                const data = res.data.metadata

                setDataBook(data)
            } catch (error) {
                logger.error(error, 'getDataBook')
            }
        }

        getDataBook()
    }, [])

    const showDataVocabulary = async (idBook: string, idLesson: string) => {

        const url = `${domain}/general/getVocabulary`

        try {
            const res = await axios.post(url, { idBook, idLesson, limit: null, currentPage: null })
            const data = res.data.metadata

            setDataVocabulary(data)
            setBookActive(idLesson)
            setChoiceBook(true)
        } catch (error: any) {
            setBookActive(idLesson)
            setChoiceBook(false)
            setIsError(true)
            setMessageError(getAxiosErrorMessage(error))
        }
    }

    const handleFormatContent = useCallback((content: string) => {
        return content.replace(/\n/g, "<br>");
    }, []);

    return (
        <Div className="container">
            <div className="books">
                {dataBook.map((item, indexBook) => {
                    return (
                        <div className="itemBook" key={indexBook}>
                            <h1 className="nameBook" onClick={() => handleExpandBook(item.book._id)}>{item.book.name}</h1>
                            <div style={{ display: expandBook && expandBookId == item.book._id ? 'block' : 'none' }} className="listLesson">
                                {item.lesson.map((elm, indexLesson) => {
                                    return (
                                        <h2 style={{ color: bookActive == elm._id ? '#5184bb' : 'black' }} className="nameLesson" key={indexLesson} onClick={() => { showDataVocabulary(item.book._id, elm._id) }}>{elm.name}</h2>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="mainContent">
                {choiceBook ?
                    dataVocabulary.map((item, index) => {
                        return (
                            <div className="itemContent" key={index}>
                                <h1 className="tuongHinh">{item.tuonghinh}</h1>
                                <h1 className="pinyin">{item.pinyin}</h1>
                                <h1 className="type">{item.type}</h1>
                                <p className="audio">
                                    <IonIcon name="volume-high-outline" id='icon-audio' onClick={() => playAudio(item.audio)}></IonIcon>
                                </p>
                                <h1 className="meaning">{item.meaning}</h1>
                                <p className="example" dangerouslySetInnerHTML={{ __html: handleFormatContent(item.example) }}></p>
                            </div>
                        )
                    })
                    :
                    <div className="notChoiceLesson">
                        {isError ?
                            <h1 className="error">{messageError}</h1>
                            :
                            <h1>Vui Lòng Chọn Bài</h1>
                        }
                    </div>
                }
            </div>
        </Div>
    )
}

export default LaptopVocabulary

