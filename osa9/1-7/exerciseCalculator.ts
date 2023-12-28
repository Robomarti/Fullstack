interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const calculateExercises = (daily_exercise_hours: Array<number>, target_amount: number) : Result => {
    const number_of_days = daily_exercise_hours.length;
    let number_of_training_days = 0;
    let calculated_avarage_time = 0;
    let target_reached = false;
    let rating = 1;
    let explanation = 'You could have done better';

    for (const hours of daily_exercise_hours) {
        if (hours > 0) {
            number_of_training_days += 1;
        }
        calculated_avarage_time += hours;
    }
    calculated_avarage_time /= number_of_days;

    if (calculated_avarage_time >= target_amount) {
        rating = 3;
        explanation = 'You reached your goal';
        target_reached = true;
    }
    else if (calculated_avarage_time > target_amount / 2) {
        rating = 2;
        explanation = 'not too bad but could be better';
    }
    else {
        rating = 1;
        explanation = 'try harder next time';
    }

    return { periodLength: number_of_days, trainingDays: number_of_training_days,
        success: target_reached, rating: rating, ratingDescription: explanation, target: target_amount, average: calculated_avarage_time };
};

if (process.argv.length > 2) {
    const numbers = [];
    for (const argument of process.argv.slice(3)) {
        if (isNaN(Number(argument))) {
            throw new Error('Provided values were not numbers!' );
        }
        else {
            numbers.push(Number(argument));
        }
    }
    if (isNaN(Number(process.argv[2]))) {
        throw new Error('Provided target value is not a number!');
    }
    const target = process.argv[2];
    const calculated = calculateExercises(numbers, Number(target));
    console.log(calculated);
}
else {
    const calculated = calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2);
    console.log(calculated);
}
