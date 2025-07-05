// phrases = ['đến', 'đúng vậy', 'đúng vậy', 'uống'];

const findWordDuplicates = (phrasesArray: string[]) => {
    const wordFrequency: { [key: string]: number } = {};

    for (let phrase of phrasesArray) {
        if (wordFrequency[phrase]) {
            wordFrequency[phrase]++;
        } else {
            wordFrequency[phrase] = 1;
        }
    }

    const duplicates = Object.keys(wordFrequency).filter(word => wordFrequency[word] > 1);
    return duplicates;
};

export default findWordDuplicates;