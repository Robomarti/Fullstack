import express from 'express';
import patientService from '../services/patientService';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

patientRouter.post('/', (req, res) => {
  const addedPatient = patientService.addPatient(req.body);
  res.json(addedPatient);
});

export default patientRouter;