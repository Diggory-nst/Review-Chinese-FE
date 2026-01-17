// phrases = ['đến', 'đúng vậy', 'đúng vậy', 'uống'];

const findWordDuplicates = (phrasesArray: string[]) => {
    const seen = new Set<string>();
    const duplicates = new Set<string>();

    for (const phrase of phrasesArray) {
        if (seen.has(phrase)) {
            duplicates.add(phrase);
        } else {
            seen.add(phrase);
        }
    }

    return [...duplicates];
};

export default findWordDuplicates;
