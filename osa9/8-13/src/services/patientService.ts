import patientData from '../../data/patients';
import { Patient } from '../types';

const getPatients = (): Patient[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

const addPatient = () => {
    return null;
};

export default {
    getPatients,
    addPatient
};