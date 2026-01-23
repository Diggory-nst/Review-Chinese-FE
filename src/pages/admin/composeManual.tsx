
import icon_next from '../../assets/img/icon/icon-next.svg'

import { Div } from '../../assets/styles/admin/composeManual';
import { useEffect, useState } from "react";
import axios from "axios";
import configDomain from "../../configs/config.domain";
import setHeadersRequest from "../../utils/setHeadersRequest";
import getAxiosErrorMessage from '../../utils/getAxiosErrorMessage';

interface ChoiceBook {
    book: string,
    lesson: string
}

interface DataCompose {
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

type Props = {
    handleChangeShowComposeManual: (check: boolean) => void
}

const ComposeManual: React.FC<Props> = ({ handleChangeShowComposeManual }) => {

    const domain = configDomain?.domain
    const headers = setHeadersRequest()
    const [isError, setIsError] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>('')

    const [choiceBook, setChoiceBook] = useState<ChoiceBook>({
        book: '',
        lesson: ''
    })
    const [dataCompose, setDataCompose] = useState<DataCompose>({
        tuonghinh: '',
        meaning1: '',
        meaning2: '',
        meaning3: '',
        meaning4: ''
    })
    const [arrCompose, setArrCompose] = useState<DataSubmit[]>([])
    const [listWordAdded, setListWordAdded] = useState<string[]>([])

    const handleChange = (e: any) => {
        setChoiceBook(prev => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    const handleChangeCompose = (e: any) => {
        setDataCompose(prev => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    const nextWord = () => {
        if (dataCompose.tuonghinh == '' || dataCompose.meaning1 == '' || dataCompose.meaning2 == '' || dataCompose.meaning3 == '' || dataCompose.meaning4 == '') {
            return
        }
        const arrMeaning = []
        arrMeaning.push(dataCompose.meaning1)
        arrMeaning.push(dataCompose.meaning2)
        arrMeaning.push(dataCompose.meaning3)
        arrMeaning.push(dataCompose.meaning4)
        const object = {
            tuonghinh: dataCompose.tuonghinh,
            meaning: arrMeaning,
            result: dataCompose.meaning1
        }
        setArrCompose([...arrCompose, object])
        setDataCompose({
            tuonghinh: '',
            meaning1: '',
            meaning2: '',
            meaning3: '',
            meaning4: ''
        })
        setListWordAdded([...listWordAdded, dataCompose.tuonghinh])
    }

    const submitDataCompose = async () => {

        if (choiceBook.book == '' || choiceBook.lesson == '') return

        const urlSubmit = `${domain}/admin/createComposeReview`
        try {
            const dataSubmit = {
                choiceBook,
                arrCompose
            }
            await axios.post(urlSubmit, dataSubmit, { headers })
            setChoiceBook({
                book: '',
                lesson: ''
            })
            handleChangeShowComposeManual(false)
            setIsError(false)
            setMessageError('')
        } catch (error: any) {
            setIsError(true)
            setMessageError(getAxiosErrorMessage(error))
        }
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
        <Div className="compose-manual">
            <div className="choice-book">
                <div className="book">
                    <h1>Quyển : </h1>
                    <input type="text" name="book" value={choiceBook.book} onChange={handleChange} />
                </div>
                <div className="lesson">
                    <h1>Bài : </h1>
                    <input type="text" name="lesson" value={choiceBook.lesson} onChange={handleChange} />
                </div>
            </div>
            <div className="prepare-lesson">
                <div className="show-prepare-lesson">
                    <div className="main-word">
                        <input type="text" className="tuong-hinh" name='tuonghinh' value={dataCompose.tuonghinh} placeholder='Tượng Hình' onChange={handleChangeCompose} />
                    </div>
                    <div className="list-means-word">
                        <input type="text" className='navigate' name='meaning1' value={dataCompose.meaning1} placeholder='Nghĩa 1 ( Nghĩa Chính )' onChange={handleChangeCompose} onClick={_e => handleClickNavigate(0)} />
                        <input type="text" className='navigate' name='meaning2' value={dataCompose.meaning2} placeholder='Nghĩa 2' onChange={handleChangeCompose} onClick={_e => handleClickNavigate(1)} />
                        <input type="text" className='navigate' name='meaning3' value={dataCompose.meaning3} placeholder='Nghĩa 3' onChange={handleChangeCompose} onClick={_e => handleClickNavigate(2)} />
                        <input type="text" className='navigate' name='meaning4' value={dataCompose.meaning4} placeholder='Nghĩa 4' onChange={handleChangeCompose} onClick={_e => handleClickNavigate(3)} />
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
        </Div>
    )
}

export default ComposeManual;

