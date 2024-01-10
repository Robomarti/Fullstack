import { Gender } from '../src/types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
  };

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name
}

const parseDob = (dob: unknown): string => {
    if (!dob || !isString(dob)) {
        throw new Error('Incorrect or missing date of birth');
    }
    return dob
}

const parseSSn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing social security number');
    }
    return ssn
}

const parseGender = (gender: unknown): Gender => {
    if ( !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender
}

const parseOccupation = (occ: unknown): string => {
    if (!occ || !isString(occ)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occ
}

export const toNewPatient = (object: unknown) => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newPatient = { name: parseName(object.name), dateOfBirth: parseDob(object.dateOfBirth ), ssn: parseSSn(object.ssn),
        gender: parseGender(object.gender), occupation: parseOccupation(object.occupation) }
        return newPatient
    }
    throw new Error('Incorrect data: some fields are missing');
}