
import { Div } from '../assets/styles/vocabulary'
import IonIcon from '@reacticons/ionicons'
import { useCallback, useEffect, useRef, useState } from 'react'

import configDomain from '../configs/config.domain';
import axios from 'axios'

interface TypeVocabulary {
    tuonghinh: Array<string>,
    pinyin: Array<string>,
    meaning: Array<string>,
    audio: Array<string>,
    example: Array<string>,
    structureChinese: Array<string>
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

const Vocabulary = () => {

    const domain = configDomain?.domain

    const [choiceBook, setChoiceBook] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>('')
    const [expandBookId, setExpandBookId] = useState<string>('')
    const [expandBook, setExpandBook] = useState<boolean>(false)
    const [bookActive, setBookActive] = useState<string>('')
    const [dataBook, setDataBook] = useState<TypeDataBook[]>([])
    const [dataVocabulary, setDataVocabulary] = useState<TypeVocabulary>({
        tuonghinh: [],
        pinyin: [],
        meaning: [],
        audio: [],
        example: [],
        structureChinese: []
    })

    const [showStructureChinese, setShowStructureChinese] = useState<number>(-1)
    const [showExaStruc, setShowExaStruc] = useState<number>(-1)
    const structureRef = useRef<HTMLDivElement>(null)
    const examStrucRef = useRef<HTMLDivElement>(null)

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
                const res = await axios.get(url)
                const data = res.data.metadata

                setDataBook(data)
            } catch (error) {
                console.log(error)
            }
        }

        getDataBook()
    }, [])

    const showDataVocabulary = async (idBook: string, idLesson: string) => {

        const url = `${domain}/general/getVocabulary`

        try {
            const res = await axios.post(url, { idBook, idLesson })
            const data = res.data.metadata

            setDataVocabulary(data)
            setBookActive(idLesson)
            setChoiceBook(true)
        } catch (error: any) {
            setBookActive(idLesson)
            setChoiceBook(false)
            setIsError(true)
            setMessageError(error.response.data.message)
        }
    }

    const handleShowStructureChinese = (index: number) => {
        setShowStructureChinese(index)
    }

    const handleShowExaStruc = (index: number) => {
        setShowExaStruc(index)
    }

    const handleClickOutside = useCallback((event: MouseEvent) => {
        // for laptop
        if (structureRef.current && !structureRef.current.contains(event.target as Node)) {
            // Don't close if clicking on the tuongHinh element
            const target = event.target as HTMLElement;
            if (!target.classList.contains('structure-chinese') && !target.classList.contains('tuong-hinh')) {
                setShowStructureChinese(-1);
            }
        }
        // for mobile
        if (examStrucRef.current && !examStrucRef.current.contains(event.target as Node)) {
            // Don't close if clicking on the tuongHinh element
            const target = event.target as HTMLElement;
            if (!target.classList.contains('show-example-structure') && !target.classList.contains('tuong-hinh')) {
                setShowExaStruc(-1);
            }
        }
    }, []);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleClickOutside]);

    // Function format for content example
    const handleFormatContent = (content: string) => {
        return content.replace(/\n/g, "<br>");
    }

    return (
        <Div className="container">
            {/* section for laptop, tablet */}
            <div className="section-laptop">
                <div className="table-of-content">
                    <div className="books">
                        {dataBook.map((item, indexBook) => {
                            return (
                                <div className="item-book" key={indexBook}>
                                    <h1 className="name-book" onClick={() => handleExpandBook(item.book._id)}>{item.book.name}</h1>
                                    <div style={{ display: expandBook && expandBookId == item.book._id ? 'block' : 'none' }} className="list-lesson">
                                        {item.lesson.map((elm, indexLesson) => {
                                            return (
                                                <h2 style={{ color: bookActive == elm._id ? '#5184bb' : 'black' }} className="name-lesson" key={indexLesson} onClick={() => { showDataVocabulary(item.book._id, elm._id) }}>{elm.name}</h2>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="main-content for-laptop">
                    {choiceBook ?
                        dataVocabulary.tuonghinh.map((item, index) => {
                            return (
                                <div className="item-content" key={index}>
                                    <h1 className="tuong-hinh" onClick={() => handleShowStructureChinese(index)}>{item}</h1>
                                    {showStructureChinese == index &&
                                        <div className="show-structure" ref={structureRef}>
                                            <h1 className='title-structure'>*Cấu Trúc Từ :</h1>
                                            {dataVocabulary.structureChinese[index] ?
                                                <p className='structure-chinese' dangerouslySetInnerHTML={{ __html: handleFormatContent(dataVocabulary.structureChinese[index]) }}></p>
                                                :
                                                <p className='structure-chinese'>Không Có Dữ Liệu</p>
                                            }
                                        </div>
                                    }
                                    <h1 className="pinyin">{dataVocabulary.pinyin[index]}</h1>
                                    <p className="audio">
                                        <IonIcon name="volume-high-outline" id='icon-audio' onClick={() => playAudio(dataVocabulary.audio[index])}></IonIcon>
                                    </p>
                                    <h1 className="meaning">{dataVocabulary.meaning[index]}</h1>
                                    <p className="example" dangerouslySetInnerHTML={{ __html: handleFormatContent(dataVocabulary.example[index]) }}></p>
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
                <div className="main-content for-tablet">
                    {choiceBook ?
                        dataVocabulary.tuonghinh.map((item, index) => {
                            return (
                                <div className="item-content" key={index}>
                                    <h1 className="tuong-hinh" onClick={() => handleShowExaStruc(index)}>{item}</h1>
                                    <h1 className="pinyin">{dataVocabulary.pinyin[index]}</h1>
                                    <p className="audio">
                                        <IonIcon name="volume-high-outline" id='icon-audio' onClick={() => playAudio(dataVocabulary.audio[index])}></IonIcon>
                                    </p>
                                    <h1 className="meaning">{dataVocabulary.meaning[index]}</h1>
                                    {showExaStruc == index &&
                                        <div className="show-example-structure" ref={examStrucRef}>
                                            <div className='contain-structure'>
                                                <h1 className='title-structure'>*Cấu Trúc Từ :</h1>
                                                {dataVocabulary.structureChinese[index] ?
                                                    <p className='structure-chinese' dangerouslySetInnerHTML={{ __html: handleFormatContent(dataVocabulary.structureChinese[index]) }}></p>
                                                    :
                                                    <p className='structure-chinese'>Không Có Dữ Liệu</p>
                                                }
                                            </div>
                                            <div className='contain-example'>
                                                <h1 className='title-example'>*Ví Dụ :</h1>
                                                {dataVocabulary.example[index] ?
                                                    <p className='example' dangerouslySetInnerHTML={{ __html: handleFormatContent(dataVocabulary.example[index]) }}></p>
                                                    :
                                                    <p className='example'>Không Có Dữ Liệu</p>
                                                }
                                            </div>
                                        </div>
                                    }
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
            </div>
            <div className="section-mobile">
                <div className="table-of-content">
                    <div className="books">
                        {dataBook.map((item, indexBook) => {
                            return (
                                <div className="item-book" key={indexBook}>
                                    <h1 className="name-book" onClick={() => handleExpandBook(item.book._id)}>{item.book.name}</h1>
                                    <div style={{ display: expandBook && expandBookId == item.book._id ? 'block' : 'none' }} className="list-lesson">
                                        {item.lesson.map((elm, indexLesson) => {
                                            return (
                                                <h2 style={{ color: bookActive == elm._id ? '#5184bb' : 'black' }} className="name-lesson" key={indexLesson} onClick={() => { showDataVocabulary(item.book._id, elm._id) }}>{elm.name}</h2>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="main-content for-mobile">
                    {choiceBook ?
                        dataVocabulary.tuonghinh.map((item, index) => {
                            return (
                                <div className="item-content" key={index}>
                                    <h1 className="tuong-hinh" onClick={() => handleShowExaStruc(index)}>{item}</h1>
                                    <h1 className="pinyin">{dataVocabulary.pinyin[index]}</h1>
                                    {/* <p className="audio">
                                        <IonIcon name="volume-high-outline" id='icon-audio' onClick={() => playAudio(dataVocabulary.audio[index])}></IonIcon>
                                    </p> */}
                                    <h1 className="meaning">{dataVocabulary.meaning[index]}</h1>
                                    {showExaStruc == index &&
                                        <div className="show-example-structure" ref={examStrucRef}>
                                            <div className='contain-structure'>
                                                <h1 className='title-structure'>*Cấu Trúc Từ :</h1>
                                                {dataVocabulary.structureChinese[index] ?
                                                    <p className='structure-chinese' dangerouslySetInnerHTML={{ __html: handleFormatContent(dataVocabulary.structureChinese[index]) }}></p>
                                                    :
                                                    <p className='structure-chinese'>Không Có Dữ Liệu</p>
                                                }
                                            </div>
                                            <div className='contain-example'>
                                                <h1 className='title-example'>*Ví Dụ :</h1>
                                                {dataVocabulary.example[index] ?
                                                    <p className='example' dangerouslySetInnerHTML={{ __html: handleFormatContent(dataVocabulary.example[index]) }}></p>
                                                    :
                                                    <p className='example'>Không Có Dữ Liệu</p>
                                                }
                                            </div>
                                        </div>
                                    }
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
            </div>
        </Div>
    )
}

export default Vocabulary