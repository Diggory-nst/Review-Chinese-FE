
import Header from '../components/header'
import Footer from '../components/footer'
import Vocabulary from './vocabulary';
import Grammar from './grammar';
import Review from './review';
import PrepareLesson from './prepareLesson';
import PrivateReview from './privateReview';
import Conversation from './conversation';
import Translate from './translate';
import { useState } from 'react';

const Home = () => {

    const [sectionShow, setSectionShow] = useState<String>('vocabulary')

    const renderSwitch = (param: String) => {
        switch (param) {
            case 'vocabulary':
                return <Vocabulary />
            case 'grammar':
                return <Grammar />
            case 'review':
                return <Review />
            case 'prepareLesson':
                return <PrepareLesson />
            case 'privateReview':
                return <PrivateReview />
            case 'conversation':
                return <Conversation />
            case 'translate':
                return <Translate />
            default:
                return <Vocabulary />
        }
    }

    const handleSectionShow = (section: String) => {
        setSectionShow(section)
    }

    return (
        <div className="Home-page">
            <Header handleSectionShow={handleSectionShow} />
            <div className="grid wide">
                {renderSwitch(sectionShow)}
                <Footer />
            </div>
        </div>
    )
}

export default Home