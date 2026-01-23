
interface DataInput {
    tuonghinh: string[];
    pinyin: string[];
    type: string[];
    audio: string[];
    meaning: string[];
}

// Helper to shuffle an array (Fisher-Yates)
const shuffleArray = <T>(array: T[]): T[] => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
};

const composeAutoFunc = (data: DataInput) => {
    const newData = [];
    const { tuonghinh, pinyin, type, audio, meaning } = data;

    const totalItems = meaning.length;

    for (let i = 0; i < totalItems; i++) {
        const currentMeaning = meaning[i];

        // Skip if current meaning is empty/invalid
        if (!currentMeaning) continue;

        // Use a Set to ensure unique distractors (by value, not just index)
        const distractorSet = new Set<string>();

        // Safety: ensure we don't infinite loop if not enough unique words exist
        let attempts = 0;
        const maxAttempts = 50;

        // Try to get 3 unique distractors
        while (distractorSet.size < 3 && attempts < maxAttempts) {
            const randomIndex = Math.floor(Math.random() * totalItems);
            const randomMeaning = meaning[randomIndex];

            // 1. Must exist
            // 2. Must not be the correct answer
            // 3. Must not be already selected as a distractor
            if (randomMeaning && randomMeaning !== currentMeaning && !distractorSet.has(randomMeaning)) {
                distractorSet.add(randomMeaning);
            }
            attempts++;
        }

        // If listing is too small, we might have fewer than 3 distractors, 
        // but the code handles it gracefully by only adding what it found.
        const options = [currentMeaning, ...Array.from(distractorSet)];

        // Shuffle options so the correct answer isn't always at the same position
        const shuffledOptions = shuffleArray(options);

        newData.push({
            tuonghinh: tuonghinh[i],
            pinyin: pinyin[i],
            type: type[i],
            audio: audio[i],
            meaning: shuffledOptions,
            result: currentMeaning
        });
    }

    return newData;
};

export default composeAutoFunc;