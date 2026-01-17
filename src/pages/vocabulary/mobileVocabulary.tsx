
import { Div } from '../../assets/styles/vocabulary/mobileVocabulary'
import IonIcon from '@reacticons/ionicons'
import { useCallback, useEffect, useRef, useState } from 'react'
import Pagination from '../../components/pagination';

import configDomain from '../../configs/config.domain';
import axios from 'axios'

import ListBookMobile from '../../components/listBookMobile';

interface TypeVocabulary {
    tuonghinh: string,
    pinyin: string,
    meaning: string,
    type: string,
    audio: string,
    example: string,
    structureChinese: string
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

const MobileVocabulary = () => {

    const domain = configDomain?.domain

    const [choiceBook, setChoiceBook] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>('')
    const [dataBook, setDataBook] = useState<TypeDataBook[]>([])
    const [dataVocabulary, setDataVocabulary] = useState<TypeVocabulary[]>([])

    const [inforLesson, setInforLesson] = useState<{ bookId: string, lessonId: string }>({ bookId: '', lessonId: '' })

    const [totalVocab, setTotalVocab] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [limitPage, _setLimitPage] = useState<number>(10)

    const shareCurrentPage = (currentPage: number) => {
        setCurrentPage(currentPage)
    }

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
                console.log(error)
            }
        }

        getDataBook()
    }, [])

    const showDataVocabulary = async (idBook: string, idLesson: string) => {

        setInforLesson({ bookId: idBook, lessonId: idLesson })

        const url = `${domain}/general/getVocabulary`

        try {
            const res = await axios.post(url, { idBook, idLesson, limit: limitPage, currentPage: currentPage })

            const data = res.data.metadata.vocabulary
            const totalVocab = res.data.metadata.totalVocab

            setTotalVocab(totalVocab)
            setDataVocabulary(data)
            setChoiceBook(true)
        } catch (error: any) {
            setChoiceBook(false)
            setIsError(true)
            setMessageError(error.response.data.message)
        }
    }

    useEffect(() => {
        if (choiceBook) showDataVocabulary(inforLesson.bookId, inforLesson.lessonId)
    }, [currentPage])

    const handleFormatContent = useCallback((content: string) => {
        return content.replace(/\n/g, "<br>");
    }, []);

    // Handle Example Toggle

    const [expandedExampleIndex, setExpandedExampleIndex] = useState<number | null>(null);

    const exampleContainerRef = useRef<HTMLDivElement>(null);

    const handleToggleExample = (index: number) => {
        setExpandedExampleIndex(prevIndex => (prevIndex === index ? null : index));
    };

    return (
        <Div className="container">
            <ListBookMobile dataBook={dataBook} onLessonClick={(bookId, lessonId) => { showDataVocabulary(bookId, lessonId) }} />
            {choiceBook ?
                <>
                    <div className="mainContent">
                        {dataVocabulary.map((item, index) => {
                            return (
                                <div className="itemContent" key={index}>
                                    <h1 className="tuongHinh">{item.tuonghinh}</h1>
                                    <div className="vocabPronounce">
                                        <h1 className="pinyin">{item.pinyin}</h1>
                                        <p className="audio">
                                            <IonIcon name="volume-high-outline" id='iconAudio' onClick={() => playAudio(item.audio)}></IonIcon>
                                        </p>
                                    </div>
                                    <h1 className="type">{item.type}</h1>
                                    <h1 className="meaning">{item.meaning}</h1>
                                    <div className={`toggleExample ${expandedExampleIndex === index ? 'active' : ''}`} onClick={() => handleToggleExample(index)}>
                                        <span>Ví dụ</span>
                                        <IonIcon name="chevron-down-outline" id='iconChevron'></IonIcon>
                                    </div>
                                    <div className="exampleContainer" ref={exampleContainerRef} style={{
                                        maxHeight: expandedExampleIndex === index && exampleContainerRef.current
                                            ? `${exampleContainerRef.current.scrollHeight}px`
                                            : '0px'
                                    }}>
                                        <div className="example">
                                            {item.example ?
                                                <p dangerouslySetInnerHTML={{ __html: handleFormatContent(item.example) }}></p>
                                                :
                                                <p style={{ textAlign: "center" }}>Không Có Dữ Liệu</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {totalVocab > limitPage &&
                        <Pagination totalDc={totalVocab} limitPage={limitPage} shareCurrentPage={shareCurrentPage} />
                    }
                </>
                :
                <div className="mainContent" style={{ border: '1px solid #adadad', borderRadius: '8px', padding: '15px 10px', height: 'calc(100vh - 249.2px)' }}>
                    <div className="notChoiceLesson">
                        {isError ?
                            <h1 className="error">{messageError}</h1>
                            :
                            <h1>Vui Lòng Chọn Bài</h1>
                        }
                    </div>
                </div>
            }
        </Div>
    )
}

export default MobileVocabulary