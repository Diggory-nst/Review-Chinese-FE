
import { Div } from "../../assets/styles/admin/editVocal";

import IonIcon from "@reacticons/ionicons";
import axios from "axios";
import configDomain from "../../configs/config.domain";
import setHeadersRequest from "../../utils/setHeadersRequest";
import { useRef, useState } from "react";

interface ChoiceBook {
    book: string,
    lesson: string
}

interface InforVocal {
    _id: string,
    tuonghinh: Array<string>,
    pinyin: Array<string>,
    meaning: Array<string>,
    audio: Array<string>,
    example: Array<string>,
    structureChinese: Array<string>
}

interface FormUpdateItemVocal {
    tuonghinh: string,
    pinyin: string,
    meaning: string,
    audio: any,
    example: string,
    indexItemVocal: string,
    structureChinese: string
}

const EditVocal = () => {

    const domain = configDomain?.domain
    const headers = setHeadersRequest()

    const [isError, setIsError] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>('')

    const [completeChoiceBook, setCompleteChoiceBook] = useState<boolean>(false)
    const [choiceBook, setChoiceBook] = useState<ChoiceBook>({
        book: '',
        lesson: ''
    })

    const [inforVocal, setInforVocal] = useState<InforVocal>({
        _id: '',
        tuonghinh: [],
        pinyin: [],
        meaning: [],
        audio: [],
        example: [],
        structureChinese: []
    })

    const [openPopup, setOpenPopup] = useState<boolean>(false)

    const [updateItemVocal, setUpdateItemVocal] = useState<FormUpdateItemVocal>({
        tuonghinh: '',
        pinyin: '',
        meaning: '',
        audio: null,
        indexItemVocal: '',
        example: '',
        structureChinese: ''
    })

    const tagAudioRef = useRef<HTMLInputElement | null>(null)

    const handleChoiceBook = (e: any) => {
        setChoiceBook(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    // Get All Information Vocabulary
    const handleSubmitChoiceBook = () => {

        if (choiceBook.book == '' || choiceBook.lesson == '') {
            setIsError(true)
            setMessageError('Please Enter Book Name and Lesson')
            return
        } else {
            setIsError(false)
        }

        const getAllinformationVocal = async () => {

            const url = `${domain}/admin/getAllInforVocal`

            try {
                const res = await axios.post(url, choiceBook, { headers })
                const data = res.data.metadata

                setCompleteChoiceBook(true)
                setInforVocal(data)
            } catch (error: any) {
                setIsError(true)
                setMessageError(error.response.data.message)
            }
        }

        getAllinformationVocal()
    }

    const handleOpenPopupEdit = (index: number) => {
        setOpenPopup(true)
        setUpdateItemVocal({
            tuonghinh: inforVocal.tuonghinh[index],
            pinyin: inforVocal.pinyin[index],
            meaning: inforVocal.meaning[index],
            audio: null,
            indexItemVocal: index.toString(),
            example: inforVocal.example[index],
            structureChinese: inforVocal.structureChinese[index]
        })
    }

    const handleClosePopup = () => {
        setOpenPopup(false)
    }

    const handleChange = (e: any) => {
        setUpdateItemVocal(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleFileChange = (e: any) => {
        setUpdateItemVocal(prev => {
            return { ...prev, [e.target.name]: e.target.files?.[0] }
        })
    }

    const submitUpdate = async () => {

        const url = `${domain}/admin/updateVocabulary`

        const formData = new FormData()
        formData.append('_id', inforVocal._id);
        formData.append('pinyin', updateItemVocal.pinyin);
        formData.append('meaning', updateItemVocal.meaning);
        formData.append('indexItemVocal', updateItemVocal.indexItemVocal);
        formData.append('audio', updateItemVocal.audio);
        formData.append('example', updateItemVocal.example);
        formData.append('structureChinese', updateItemVocal.structureChinese);

        try {
            await axios.patch(url, formData, {
                headers: {
                    ...headers,
                    "Content-Type": 'multipart/form-data'
                }
            })

            setOpenPopup(false)
            if (!tagAudioRef.current) return
            tagAudioRef.current.value = ''
        } catch (error: any) {
            setIsError(true)
            setMessageError(error.response.data.message)
        }
    }

    const deleteElementVocabulary = async () => {

        const url = `${domain}/admin/deleteElementVocabulary`
        const indexItemVocal = Number(updateItemVocal.indexItemVocal)
        const data = {
            _id: inforVocal._id,
            indexItemVocal: updateItemVocal.indexItemVocal
        }

        try {
            await axios.post(url, data, { headers })
            setOpenPopup(false)

            const newArrTuonghinh = inforVocal.tuonghinh.filter((_elm, index) => index != indexItemVocal)
            const newArrPinyin = inforVocal.pinyin.filter((_elm, index) => index != indexItemVocal)
            const newArrMeaning = inforVocal.meaning.filter((_elm, index) => index != indexItemVocal)
            const newArrAudio = inforVocal.audio.filter((_elm, index) => index != indexItemVocal)
            const newArrExample = inforVocal.example.filter((_elm, index) => index != indexItemVocal)
            const newArrStructureChinese = inforVocal.structureChinese.filter((_elm, index) => index != indexItemVocal)
            setInforVocal({
                _id: inforVocal._id,
                tuonghinh: newArrTuonghinh,
                pinyin: newArrPinyin,
                meaning: newArrMeaning,
                audio: newArrAudio,
                example: newArrExample,
                structureChinese: newArrStructureChinese
            })
        } catch (error: any) {
            setIsError(true)
            setMessageError(error.response.data.message)
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
        <Div className="edit-vocal">
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
                    <div className="list-volca">
                        {inforVocal.tuonghinh.length === 0 ?
                            (<p className="emptyVocal">Không Có Từ Vựng</p>)
                            :
                            (
                                inforVocal.tuonghinh.map((item, index) => {
                                    if ((index + 1) % 4 === 0) {
                                        return (
                                            <h1 className='no-margin' key={index} onClick={() => handleOpenPopupEdit(index)}>{item}</h1>
                                        )
                                    } else {
                                        return (
                                            <h1 key={index} onClick={() => handleOpenPopupEdit(index)}>{item}</h1>
                                        )
                                    }

                                })
                            )
                        }
                    </div>
                    <div className="popup-vocal" style={{ display: openPopup ? 'flex' : 'none' }}>
                        <div className="modal"></div>
                        <div className="info-vocal">
                            <div className="close">
                                <IonIcon name="close-outline" id="icon-close" onClick={handleClosePopup} />
                            </div>
                            <h1 className="vocal">{updateItemVocal.tuonghinh}</h1>
                            <div className="infor-edit">
                                <div className="rowEdit">
                                    <div className="field">
                                        <label>Pinyin</label>
                                        <input type="text" name="pinyin" value={updateItemVocal.pinyin} onChange={handleChange} />
                                    </div>
                                    <div className="field">
                                        <label>Nghĩa</label>
                                        <input type="text" name="meaning" value={updateItemVocal.meaning} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="rowEdit">
                                    <div className="field">
                                        <label>Ví Dụ</label>
                                        <textarea value={updateItemVocal.example} name="example" onChange={handleChange} />
                                    </div>
                                    <div className="field">
                                        <label>Cấu Tạo Từ</label>
                                        <textarea value={updateItemVocal.structureChinese} name="structureChinese" onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="field">
                                    <label>Audio</label>
                                    <input type="file" name="audio" onChange={handleFileChange} ref={tagAudioRef} />
                                </div>
                                {isError && <p className="error" style={{ marginTop: '0', marginBottom: '22px' }}>{messageError}</p>}
                                <div className="save-edit">
                                    <h1 onClick={deleteElementVocabulary}>Xóa</h1>
                                    <h1 onClick={submitUpdate}>Lưu Lại</h1>
                                </div>
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

export default EditVocal;