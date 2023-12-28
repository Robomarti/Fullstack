import express from 'express';
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)){
        const response = {error: "malformatted parameters"};
        res.status(400).send(JSON.stringify(response));
    }
    else {
        const bmi = calculateBmi(height, weight);
        const response : BmiResponse =  {height: height, weight: weight, bmi_result: bmi};
        res.send(JSON.stringify(response));
    }
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_hours, target_hours } = req.body;

    if (!daily_hours || !target_hours){
        return res.status(400).send(JSON.stringify({error: "parameters missing"}));
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (isNaN(target_hours)) {
        return res.status(400).send(JSON.stringify({error: "malformatted parameters"}));
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    for (const hour of daily_hours) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        if (isNaN(hour)) {
            return res.status(400).send(JSON.stringify({error: "malformatted parameters"}));
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const calculated = calculateExercises(daily_hours, target_hours);
    return res.send(JSON.stringify(calculated));
});
  
const PORT = 3003;
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

interface BmiResponse {
    height: number;
    weight: number;
    bmi_result: string;
}