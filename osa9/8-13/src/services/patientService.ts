import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';
import { Patient } from '../types';
import { toNewPatient } from '../utils';

const getPatients = (): Patient[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

const addPatient = (object: unknown): Patient => {
    const { name, dateOfBirth, ssn, gender, occupation} = toNewPatient(object)
    const id = uuid();
    const newPatient = { id, name, dateOfBirth, ssn, gender, occupation};
    patientData.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    addPatient
};