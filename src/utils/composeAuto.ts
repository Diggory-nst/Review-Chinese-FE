
// Form Data Input
// {
//     tuonghinh: ['shi', 'lai'],
//     meaning: ['có thể', 'chị']
// }

// Form Data Output
// [
//     {
//         tuonghinh: "shi",
//         meaning: ['có thể', 'tôi', 'bạn', 'em gái']
//     }
// ]


// Verison 1: Not Optimized But Use It

interface dataInput {
    tuonghinh: Array<string>,
    meaning: Array<string>
}

const randomNumber = (index: number, arrLength: number) => {

    const midNumber = Math.floor(arrLength / 2)
    const leftMidNumber = Math.floor(midNumber / 2)
    const rightMidNumber = midNumber + leftMidNumber

    let number1 = 0
    let number2 = 0
    let number3 = 0

    if (index < leftMidNumber) {
        number1 = Math.floor(Math.random() * ((arrLength + 1) - index)) + index;
        number2 = Math.floor(Math.random() * ((number1 + 1) - index)) + index;
        number3 = Math.floor(Math.random() * (arrLength - number1)) + number1;
    }

    if (index > rightMidNumber) {
        number1 = Math.floor(Math.random() * (index - 1))
        number2 = Math.floor(Math.random() * number1)
        number3 = Math.floor(Math.random() * (arrLength - number1)) + number1;
    }

    if (index >= leftMidNumber && index <= rightMidNumber) {
        number1 = Math.floor(Math.random() * (index - 1))
        number2 = Math.floor(Math.random() * (arrLength - index)) + (index + 1)

        const a = Math.abs(number1 - index)
        const b = Math.abs(number2 - index)

        if (a > b) {
            number3 = Math.floor(Math.random() * ((index - 1) - number1 + 1)) + number1;
        }

        if (b > a) {
            number3 = Math.floor(Math.random() * (number2 - (index + 1) + 1)) + (index + 1);
        }

        if (a === b) {
            number3 = Math.floor(Math.random() * (number2 - (index + 1) + 1)) + (index + 1);
        }
    }

    return {
        number1,
        number2,
        number3
    }
}

const composeAutoFunc = (data: dataInput) => {
    const newData = []

    const tuonghinh = data.tuonghinh
    const meaning = data.meaning

    for (let index = 0; index < meaning.length; index++) {

        const newMeaning = []
        const { number1, number2, number3 } = randomNumber(index, meaning.length)
        newMeaning.push(meaning[index])
        newMeaning.push(meaning[number1])
        newMeaning.push(meaning[number2])
        newMeaning.push(meaning[number3])

        const object = {
            tuonghinh: tuonghinh[index],
            meaning: newMeaning,
            result: meaning[index]
        }

        newData.push(object)
    }

    return newData
}

export default composeAutoFunc


// Version 2: Optimized But Many Word same meaning

// interface dataInput {
//     tuonghinh: Array<string>,
//     meaning: Array<string>
// }

// const getRandomNumbers = (index: number, arrLength: number): number[] => {
//     const numbers = new Set<number>();

//     while (numbers.size < 3) {
//         const randomNum = Math.floor(Math.random() * arrLength);
//         if (randomNum !== index) {
//             numbers.add(randomNum);
//         }
//     }

//     return Array.from(numbers);
// }

// const composeAutoFunc = (data: dataInput) => {
//     const newData = [];

//     const { tuonghinh, meaning } = data;

//     for (let index = 0; index < tuonghinh.length; index++) {
//         const newMeaning = [meaning[index]];
//         const randomIndices = getRandomNumbers(index, meaning.length);

//         randomIndices.forEach((randIndex) => newMeaning.push(meaning[randIndex]));

//         const object = {
//             tuonghinh: tuonghinh[index],
//             meaning: newMeaning,
//         };

//         newData.push(object);
//     }

//     return newData;
// }

// export default composeAutoFunc;