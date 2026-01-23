
import { Div } from "../../assets/styles/admin/editPrepare";
import IonIcon from "@reacticons/ionicons";
import axios from "axios";
import configDomain from "../../configs/config.domain";
import setHeadersRequest from "../../utils/setHeadersRequest";
import { useState } from "react";
import findWordDuplicates from "../../utils/findWordDuplicate";
import getAxiosErrorMessage from '../../utils/getAxiosErrorMessage';

interface ChoiceBook {
    book: string,
    lesson: string
}

interface TypeCompose {
    tuonghinh: string,
    meaning: Array<string>,
    result: string
}

interface ListMeaning {
    meaning1: string,
    meaning2: string,
    meaning3: string,
    meaning4: string
}

interface InforCompose {
    _id: string,
    tuonghinh: string,
    indexItem: number
}

const EditPrepare = () => {

    const domain = configDomain?.domain
    const headers = setHeadersRequest()

    const [isError, setIsError] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>('')

    const [completeChoiceBook, setCompleteChoiceBook] = useState<boolean>(false)
    const [choiceBook, setChoiceBook] = useState<ChoiceBook>({
        book: '',
        lesson: ''
    })

    const [dataCompose, setDataCompose] = useState<TypeCompose[]>([])
    const [inforCompose, setInforCompose] = useState<InforCompose>({
        _id: '',
        tuonghinh: '',
        indexItem: 0
    })
    const [listMeaning, setLisMeaning] = useState<ListMeaning>({
        meaning1: '',
        meaning2: '',
        meaning3: '',
        meaning4: ''
    })

    const [openPopup, setOpenPopup] = useState<boolean>(false)
    const [listWordMeaningDuplicate, setListWordMeangingDuplicate] = useState<string[]>([])

    const handleChoiceBook = (e: any) => {
        setChoiceBook(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    // Get All Information Vocabulary
    const handleSubmitChoiceBook = () => {

        if (choiceBook.book == '' || choiceBook.lesson == '') {
            setIsError(true)
            setMessageError('Please Enter Book Name, Lesson and Type')
            return
        } else {
            setIsError(false)
        }

        const getCompose = async () => {

            const url = `${domain}/admin/getComposeReview`

            try {
                const res = await axios.post(url, choiceBook, { headers })
                const { _id, compose } = res.data.metadata

                const arrListDuplicate: string[] = []
                compose.forEach((elm: any) => {
                    const arrKeyDuplicate = findWordDuplicates(elm.meaning)
                    if (arrKeyDuplicate.length > 0) {
                        arrListDuplicate.push(elm.tuonghinh)
                    }
                });

                setListWordMeangingDuplicate(arrListDuplicate)
                setCompleteChoiceBook(true)
                setDataCompose(compose)
                setInforCompose({
                    ...inforCompose,
                    _id
                })
            } catch (error: any) {
                setIsError(true)
                setMessageError(getAxiosErrorMessage(error))
            }
        }

        getCompose()
    }

    const handleOpenPopupEdit = (index: number) => {
        setOpenPopup(true)
        setInforCompose({
            ...inforCompose,
            tuonghinh: dataCompose[index].tuonghinh,
            indexItem: index
        })
        setLisMeaning({
            meaning1: dataCompose[index].meaning[0],
            meaning2: dataCompose[index].meaning[1],
            meaning3: dataCompose[index].meaning[2],
            meaning4: dataCompose[index].meaning[3]
        })
    }

    const handleClosePopup = () => {
        setOpenPopup(false)
    }

    const handleChange = (e: any) => {
        setLisMeaning(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const submitUpdate = async () => {

        const url = `${domain}/admin/updateComposeReview`
        const arrMeaning = []
        arrMeaning.push(listMeaning.meaning1)
        arrMeaning.push(listMeaning.meaning2)
        arrMeaning.push(listMeaning.meaning3)
        arrMeaning.push(listMeaning.meaning4)
        const data = {
            _id: inforCompose._id,
            indexItem: inforCompose.indexItem,
            arrMeaning,
            result: listMeaning.meaning1
        }

        try {
            await axios.patch(url, data, { headers })
            const object = {
                tuonghinh: inforCompose.tuonghinh,
                meaning: arrMeaning,
                result: listMeaning.meaning1
            }
            // update DataCompose
            setDataCompose(prevState => {
                const newState = [...prevState]
                newState[inforCompose.indexItem] = object
                return newState
            })
            setOpenPopup(false)
        } catch (error: any) {
            setIsError(true)
            setMessageError(getAxiosErrorMessage(error))
        }
    }

    const endEditVocal = () => {
        setCompleteChoiceBook(false)
        setChoiceBook({
            book: '',
            lesson: ''
        })
    }

    return (
        <Div className="edit-prepare">
            {!completeChoiceBook ?
                <div className="enterChoiceBook">
                    <h1 className="title">Vui Lòng Chọn Bài Cần Chỉnh Sửa</h1>
                    <div className="choice-book">
                        <div className="book">
                            <h1>Quyển : </h1>
                            <input type="text" name="book" onChange={handleChoiceBook} />
                        </div>
                        <div className="lesson">
                            <h1>Bài : </h1>
                            <input type="text" name="lesson" onChange={handleChoiceBook} />
                        </div>
                    </div>
                    {isError &&
                        <p className="error" style={{ color: '#527f4f', marginTop: '0', marginBottom: '22px' }}>{messageError}</p>
                    }
                    <h1 className="submit-choice" onClick={handleSubmitChoiceBook}>Gửi</h1>
                </div>
                :
                <>
                    <div className="infor-book">
                        <div className="book">
                            <h1>Quyển : {choiceBook.book}</h1>
                        </div>
                        <div className="lesson">
                            <h1>Bài : {choiceBook.lesson}</h1>
                        </div>
                    </div>
                    {listWordMeaningDuplicate.length !== 0 &&
                        <div className="listWordDuplicate">
                            <h1>Các từ vựng có nghĩa bị lặp lại</h1>
                            <div>
                                {listWordMeaningDuplicate.map((item, index) => {
                                    return (
                                        <span key={index}>{item}</span>
                                    )
                                })}
                            </div>
                        </div>
                    }
                    <div className="list-vocal">
                        {
                            dataCompose.map((item, index) => {
                                if ((index + 1) % 4 === 0) {
                                    return (
                                        <h1 className='no-margin' key={index} onClick={() => handleOpenPopupEdit(index)}>{item.tuonghinh}</h1>
                                    )
                                } else {
                                    return (
                                        <h1 key={index} onClick={() => handleOpenPopupEdit(index)}>{item.tuonghinh}</h1>
                                    )
                                }

                            })
                        }
                    </div>
                    <div className="popup-vocal" style={{ display: openPopup ? 'flex' : 'none' }}>
                        <div className="modal"></div>
                        <div className="info-vocal">
                            <div className="close">
                                <IonIcon name="close-outline" id='icon-close' onClick={handleClosePopup}></IonIcon>
                            </div>
                            <h1 className="vocal">{inforCompose.tuonghinh}</h1>
                            <div className="infor-edit">
                                <label>Nghĩa 1 ( Nghĩa Chính )</label>
                                <input type="text" name="meaning1" value={listMeaning.meaning1} onChange={handleChange} />
                                <label>Nghĩa 2</label>
                                <input type="text" name="meaning2" value={listMeaning.meaning2} onChange={handleChange} />
                                <label>Nghĩa 3</label>
                                <input type="text" name="meaning3" value={listMeaning.meaning3} onChange={handleChange} />
                                <label>Nghĩa 4</label>
                                <input type="text" name="meaning4" value={listMeaning.meaning4} onChange={handleChange} />
                            </div>
                            {isError &&
                                <p className="error" style={{ marginTop: '0', marginBottom: '22px' }}>{messageError}</p>
                            }
                            <div className="save-edit">
                                <h1 onClick={submitUpdate}>Lưu Lại</h1>
                            </div>
                        </div>
                    </div>
                    <div className="end">
                        <h1 onClick={endEditVocal}>Kết Thúc</h1>
                    </div>
                </>
            }
        </Div>
    )
}

export default EditPrepare;

