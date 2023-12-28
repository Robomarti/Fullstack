import diagnoseData from '../../data/diagnoses';
import { Diagnose } from '../types';

const getDiagnoses = (): Diagnose[] => {
    return diagnoseData;
};

const addDiary = () => {
    return null;
};

export default {
    getDiagnoses,
    addDiary
};