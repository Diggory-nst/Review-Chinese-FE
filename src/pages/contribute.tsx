// Đã Bỏ Chức Năng Này


import IonIcon from "@reacticons/ionicons"
import { Div } from "../assets/styles/contribute"

import configDomain from '../configs/config.domain';
import setHeadersRequest from "../utils/setHeadersRequest";
import axios from 'axios';
import { useEffect, useState } from "react";

interface FormContribute {
    _id: string,
    user: {
        name: string,
        image: string
    },
    content: string,
    numberLike: number,
    numberDislike: number
}

const Contribute = () => {

    const domain = configDomain?.domain
    const headers = setHeadersRequest()

    const [dataContribute, setDataContribute] = useState<FormContribute[]>([])
    const [content, setContent] = useState<string>('')
    const [emotionClicked, setEmotionClicked] = useState<string[]>([])
    const [hasHandleEmotion, setHasHandleEmotion] = useState<string[]>([])

    useEffect(() => {
        const getContribute = async () => {

            const url = `${domain}/contribute/getContribute`
            try {
                const res = await axios.get(url)
                const data = res.data.metadata

                setDataContribute(data)
            } catch (error) {
                console.log(error)
            }
        }

        getContribute()
    }, [])

    const submitContribute = async () => {

        if (headers["x-client-id"] == null) {
            alert("Vui Lòng Đăng Nhập Để Gửi Đóng Góp")
            return
        }

        const url = `${domain}/contribute/createContribute`
        try {
            const res = await axios.post(url, { content }, { headers })
            const data = res.data.metadata

            setDataContribute([data, ...dataContribute])
            setContent('')
        } catch (error: any) {
            alert(error.response.data.message)
        }

    }

    const handleEmotionContribute = async (idContribute: string, emotion: string, index: number) => {

        if (emotion !== 'like' && emotion !== 'dislike') return
        if (hasHandleEmotion.includes(idContribute)) return

        const url = `${domain}/contribute/emotionContribute`

        try {
            axios.post(url, { idContribute, emotion }, { headers })
            setEmotionClicked([...emotionClicked, (idContribute + emotion)])
            setHasHandleEmotion([...hasHandleEmotion, idContribute])

            if (emotion == 'like') {
                setDataContribute(prevState => {
                    const newState = [...prevState]
                    newState[index].numberLike = dataContribute[index].numberLike + 1
                    return newState
                })
            } else {
                setDataContribute(prevState => {
                    const newState = [...prevState]
                    newState[index].numberDislike = dataContribute[index].numberDislike + 1
                    return newState
                })
            }
        } catch (error: any) {
            alert(error.response.data.message)
        }
    }

    return (
        <Div className="contribute">
            <h1 className="title">Đóng góp</h1>
            <div className="form-new-contribute">
                <textarea placeholder='Thêm Đóng Góp' value={content} onChange={e => setContent(e.target.value)}></textarea>
                <div onClick={submitContribute}>Gửi</div>
            </div>
            {dataContribute.length !== 0 ?
                <div className="list-contribute">
                    {dataContribute.map((item, index) => {
                        return (
                            <div className="item-contribute" key={index}>
                                <h1 className="content-contribute">{item.content}</h1>
                                <div className="infor-contribute">
                                    <div className="infor-like" onClick={() => handleEmotionContribute(item._id, 'like', index)}>
                                        <IonIcon style={{ color: emotionClicked.includes(item._id + 'like') ? '#bf2c24' : 'black' }} name="thumbs-up-outline" className='icon-like' ></IonIcon>
                                        <h2>{item.numberLike}</h2>
                                    </div>
                                    <div className="infor-dislike" onClick={() => handleEmotionContribute(item._id, 'dislike', index)}>
                                        <IonIcon style={{ color: emotionClicked.includes(item._id + 'dislike') ? '#bf2c24' : 'black' }} name="thumbs-down-outline" className='icon-dislike' ></IonIcon>
                                        <h2>{item.numberDislike}</h2>
                                    </div>
                                    <div className="infor-person">
                                        {item.user.image === '' ?
                                            <IonIcon className='icon-avatar' name="person-circle-outline" />
                                            :
                                            <img alt="avatar-person" className="avatar-person" src={`${domain}/avatars/${item.user.image}`} />
                                        }
                                        <h2>{item.user.name}</h2>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                :
                <div className="no-contribute">
                    <h1>Không Có Đóng Góp</h1>
                </div>
            }
        </Div>
    )
}

export default Contribute;