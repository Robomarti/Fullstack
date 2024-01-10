import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';
import { Patient, Entry, NonSensitivePatient } from '../types';
import { toNewPatient } from '../utils';

const getPatients = (): NonSensitivePatient[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

const findById = (id: string): Patient | undefined => {
  const patient = patientData.find(d => d.id === id);
  return patient;
};

const addPatient = (object: unknown): Patient => {
    const { name, dateOfBirth, ssn, gender, occupation} = toNewPatient(object)
    const id = uuid();
    const entries: Entry[] = [];
    const newPatient = { id, name, dateOfBirth, ssn, gender, occupation, entries };
    patientData.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    addPatient,
    findById
};