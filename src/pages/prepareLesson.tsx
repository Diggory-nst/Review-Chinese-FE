
import icon_next from '../assets/img/icon/icon-next.svg'
import IonIcon from '@reacticons/ionicons'

import { Div } from '../assets/styles/prepareLesson'
import { useEffect, useState } from "react";
import axios from "axios";
import configDomain from "../configs/config.domain";
import setHeadersRequest from "../utils/setHeadersRequest";

interface DataSubmitCompose {
    tuonghinh: string,
    meaning1: string,
    meaning2: string,
    meaning3: string,
    meaning4: string
}

interface DataSubmit {
    tuonghinh: string,
    meaning: Array<string>,
    result: string
}

interface TypeListName {
    _id: string,
    name: string
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

const PrepareLesson = () => {

    const domain = configDomain?.domain
    const headers = setHeadersRequest()
    const [logged, setLogged] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>('')
    const [sectionShow, setSectionShow] = useState<string>('tbs')
    const [bookActive, setBookActive] = useState<string>('')
    const [idUser, setIdUser] = useState<string>('')

    const [nameCompose, setNameCompose] = useState<string>('')
    const [dataSubmitCompose, setDataSubmitCompose] = useState<DataSubmitCompose>({
        tuonghinh: '',
        meaning1: '',
        meaning2: '',
        meaning3: '',
        meaning4: ''
    })
    const [arrCompose, setArrCompose] = useState<DataSubmit[]>([])
    const [listWordAdded, setListWordAdded] = useState<string[]>([])
    const [listNameCompose, setListNameCompose] = useState<TypeListName[]>([{
        _id: '',
        name: ''
    }])
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

    const getDataBook = async () => {

        const url = `${domain}/user/getListNameCompose`

        try {
            const res = await axios.post(url, { idUser }, { headers })
            const data = res.data.metadata

            setListNameCompose(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (logged) {
            getDataBook()
        }
    }, [logged])

    const handleChangeCompose = (e: any) => {
        setDataSubmitCompose(prev => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    const nextWord = () => {

        const { tuonghinh, meaning1, meaning2, meaning3, meaning4 } = dataSubmitCompose;
        if (tuonghinh == '' || meaning1 == '' || meaning2 == '' || meaning3 == '' || meaning4 == '') {
            return
        }
        const arrMeaning = []
        arrMeaning.push(meaning1)
        arrMeaning.push(meaning2)
        arrMeaning.push(meaning3)
        arrMeaning.push(meaning4)
        const object = {
            tuonghinh: tuonghinh,
            meaning: arrMeaning,
            result: meaning1
        }
        setArrCompose([...arrCompose, object])
        setDataSubmitCompose({
            tuonghinh: '',
            meaning1: '',
            meaning2: '',
            meaning3: '',
            meaning4: ''
        })
        setListWordAdded([...listWordAdded, tuonghinh])
    }

    const submitDataCompose = async () => {

        if (nameCompose == '') return

        const urlSubmit = `${domain}/user/createUserCompose`
        try {
            const dataSubmit = {
                nameCompose,
                arrCompose
            }
            await axios.post(urlSubmit, dataSubmit, { headers })

            setDataSubmitCompose({
                tuonghinh: '',
                meaning1: '',
                meaning2: '',
                meaning3: '',
                meaning4: ''
            })
            setNameCompose('')
            setListWordAdded([])
            setIsError(false)
            setMessageError('')
            getDataBook()
        } catch (error: any) {
            setIsError(true)
            setMessageError(error.response.data.message)
        }
    }

    const showCompose = async (idCompose: string) => {

        setIsError(false)
        setMessageError('')
        setSectionShow('csbs')
        const url = `${domain}/user/getUserCompose`

        try {
            const res = await axios.post(url, { idCompose }, { headers })
            const { compose } = res.data.metadata

            setDataCompose(compose)
            setInforCompose({
                ...inforCompose,
                _id: idCompose
            })
            setBookActive(idCompose)
        } catch (error: any) {
            console.log(error)
        }
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

        const url = `${domain}/user/updateUserCompose`
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
            setIsError(false)
            setMessageError('')
        } catch (error: any) {
            setIsError(true)
            setMessageError(error.response.data.message)
        }
    }

    const endEditVocal = () => {
        setSectionShow('tbs')
        setBookActive('')
    }

    const removeUserCompose = async () => {

        const url = `${domain}/user/removeUserCompose`

        try {
            await axios.delete(url, {
                headers,
                data: {
                    idUser: idUser,
                    idCompose: inforCompose._id
                }
            })

            setSectionShow('tbs')
            setBookActive('')
            getDataBook()
        } catch (error) {
            console.log(error)
        }
    }

    const handleSectionShow = (section: string) => {
        setIsError(false)
        setMessageError('')
        setSectionShow(section)
        setBookActive('')
    }

    // Navigate input text using arrow key

    const [active, setActive] = useState<number>(0)

    const reCalculate = (e: KeyboardEvent) => {

        const columns = document.querySelectorAll('.navigate').length;
        let temp = active;

        if (e.key === 'ArrowUp') { // move up
            while (temp > 0) {
                temp--;
                const input = document.querySelectorAll<HTMLInputElement>('.navigate')[temp]
                if (input) {
                    setActive(temp);
                    input.focus();
                    input.select();
                    break;
                }
            }
        } else if (e.key === 'ArrowDown') { // move down
            while (temp < columns - 1) {
                temp++;
                const input = document.querySelectorAll<HTMLInputElement>('.navigate')[temp]
                if (input) {
                    setActive(temp);
                    input.focus();
                    input.select();
                    break;
                }
            }
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
                reCalculate(e);
                e.preventDefault();
            }
        };

        document.addEventListener('keydown', handleKeyDown as unknown as EventListener);

        return () => {
            document.removeEventListener('keydown', handleKeyDown as unknown as EventListener);
        };
    }, [active]);

    const handleClickNavigate = (index: number) => {
        setActive(index);
    };

    document.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Alt') {
            nextWord()
        }
    })

    return (
        <>
            {
                logged ?
                    <Div className="container">
                        <div className="table-of-content" >
                            <h1 className="addPrepareLesson" onClick={() => handleSectionShow('tbs')}>Thêm Bài Soạn</h1>
                            <div className="list-prepare">
                                <h1 className='titleEdit'>Chỉnh Sửa</h1>
                                {listNameCompose.map((item, index) => {
                                    return (
                                        <div className="item-prepare" key={index}>
                                            <h1 style={{ color: bookActive == item._id ? '#5184bb' : 'black' }} onClick={() => showCompose(item._id)}>{item.name}</h1>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="main-content">
                            {sectionShow == 'tbs' ?
                                <div className="compose-manual">
                                    <div className="choice-book">
                                        <div className="book">
                                            <h1>Tên Bài Soạn: </h1>
                                            <input type="text" name="book" value={nameCompose} onChange={e => setNameCompose(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="prepare-lesson">
                                        <div className="show-prepare-lesson">
                                            <div className="main-word">
                                                <input type="text" className="tuong-hinh" name='tuonghinh' value={dataSubmitCompose.tuonghinh} placeholder='Tượng Hình' onChange={handleChangeCompose} />
                                            </div>
                                            <div className="list-means-word">
                                                <input type="text" className='navigate' name='meaning1' value={dataSubmitCompose.meaning1} placeholder='Nghĩa 1 ( Nghĩa Chính )' onChange={handleChangeCompose} onClick={_e => handleClickNavigate(0)} />
                                                <input type="text" className='navigate' name='meaning2' value={dataSubmitCompose.meaning2} placeholder='Nghĩa 2' onChange={handleChangeCompose} onClick={_e => handleClickNavigate(1)} />
                                                <input type="text" className='navigate' name='meaning3' value={dataSubmitCompose.meaning3} placeholder='Nghĩa 3' onChange={handleChangeCompose} onClick={_e => handleClickNavigate(2)} />
                                                <input type="text" className='navigate' name='meaning4' value={dataSubmitCompose.meaning4} placeholder='Nghĩa 4' onChange={handleChangeCompose} onClick={_e => handleClickNavigate(3)} />
                                            </div>
                                            <div className="next-word">
                                                <img src={icon_next} alt="" onClick={nextWord} />
                                                <h1 onClick={submitDataCompose}>Kết Thúc</h1>
                                            </div>
                                        </div>
                                        <div className="show-list-word">
                                            <h1 className='title'>Các từ đã thêm</h1>
                                            {listWordAdded.length != 0 &&
                                                listWordAdded.map((item, index) => {
                                                    return (
                                                        <h1 className="item-word-added" key={index}>{item}</h1>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    {isError &&
                                        <h1 className="error">{messageError}</h1>
                                    }
                                </div>
                                :
                                <>
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
                                        <h1 onClick={removeUserCompose}>Xóa</h1>
                                        <h1 onClick={endEditVocal}>Kết Thúc</h1>
                                    </div>
                                </>
                            }
                        </div>
                    </Div >
                    :
                    <div className="notAccessPage" style={{ minHeight: 'calc(100vh - 153px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <h1 style={{ fontSize: '2.8rem' }}>Vui Lòng Đăng Nhập Để Sử Dụng Chức Năng Này</h1>
                    </div>
            }
        </>
    )
}

export default PrepareLesson;