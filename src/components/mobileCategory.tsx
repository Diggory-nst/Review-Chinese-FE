import { useState } from 'react';
import { Nav } from '../assets/styles/mobileCategory';

type Props = {
    handleSectionShow: (section: string) => void;
}

const MobileCategory: React.FC<Props> = ({ handleSectionShow }) => {

    const [activeSection, setActiveSection] = useState<string>('vocabulary');

    return (
        <Nav className='category'>
            <ul>
                {['vocabulary', 'grammar', 'review'].map((section) => (
                    <li
                        key={section}
                        className={activeSection === section ? 'isActive' : ''}
                        onClick={() => {
                            setActiveSection(section);
                            handleSectionShow(section);
                        }}
                    >
                        <h1 className={section}>
                            {section.charAt(0).toUpperCase() + section.slice(1) === 'Vocabulary' ? 'Từ Vựng' : section.charAt(0).toUpperCase() + section.slice(1) === 'Grammar' ? 'Ngữ Pháp' : 'Ôn Tập'}
                        </h1>
                    </li>
                ))}
            </ul>
        </Nav>
    )
}

export default MobileCategory;