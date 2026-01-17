import MobileHeader from '../components/header/mobileHeader';
import LaptopHeader from '../components/header/laptopHeader';
import Footer from '../components/footer';
import LaptopVocabulary from './vocabulary/laptopVocabulary';
import MobileVocabulary from './vocabulary/mobileVocabulary';
import MobileGrammar from './grammar/mobileGrammar';
import LaptopGrammar from './grammar/laptopGrammar';
import MobileReview from './review/mobileReview';
import LaptopReview from './review/laptopReview';
// import PrepareLesson from './prepareLesson';
// import PrivateReview from './privateReview';
// import Conversation from './conversation';
// import Translate from './translate';
import MobileCategory from '../components/mobileCategory';
import { useState } from 'react';

import useWindowSize from '../hook/useWindowSize';

const Home = () => {

    const [sectionShow, setSectionShow] = useState<string>('vocabulary')

    const { width } = useWindowSize();

    const renderSwitch = (param: string) => {
        switch (param) {
            case 'vocabulary':
                return (width || 0) <= 768 ? <MobileVocabulary /> : <LaptopVocabulary />;
            case 'grammar':
                return (width || 0) <= 768 ? <MobileGrammar /> : <LaptopGrammar />;
            case 'review':
                return (width || 0) <= 768 ? <MobileReview /> : <LaptopReview />;
            case 'prepareLesson':
            // return <PrepareLesson />
            case 'privateReview':
            // return <PrivateReview />
            case 'conversation':
            // return <Conversation />
            case 'translate':
            // return <Translate />
            default:
                return <LaptopVocabulary />
        }
    }

    const handleSectionShow = (section: string) => {
        setSectionShow(section)
    }

    return (
        <div className="Home-page">
            {(width || 0) <= 768 ? (
                <MobileHeader />
            ) : (
                <LaptopHeader handleSectionShow={handleSectionShow} />
            )}
            <div className="grid wide">
                {renderSwitch(sectionShow)}
                {(width || 0) <= 768 && <MobileCategory handleSectionShow={handleSectionShow} />}
            </div>
            <Footer />
        </div>
    )
}

export default Home