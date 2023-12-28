export const calculateBmi = (height: number, weight: number) : string => {
    height *= 0.01;
    const bmi = weight / (height * height);
    if (bmi < 18.5)
        return 'Underweight';
    else if (bmi < 25)
        return 'Normal (healthy weight)';
    else
        return 'Overweight';
};

if (process.argv.length > 2) {
    if (!isNaN(Number(process.argv[2])) && !isNaN(Number(process.argv[3]))) {
        const height: number = Number(process.argv[2]);
        const weight: number = Number(process.argv[3]);
        console.log(calculateBmi(height, weight));
    }
    else {
        throw new Error('Provided values were not numbers!');
    }
}
else {
    console.log(calculateBmi(180, 74));
}
