"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../../data/patients"));
const getPatients = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};
const addPatient = (name, dateOfBirth, ssn, gender, occupation) => {
    const id = (0, uuid_1.v1)();
    const newPatient = { id, name, dateOfBirth, ssn, gender, occupation };
    patients_1.default.push(newPatient);
    return newPatient;
};
exports.default = {
    getPatients,
    addPatient
};
