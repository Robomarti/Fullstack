import { Box, Table, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material';
import React from 'react';
import { useParams } from "react-router-dom";

import HealthRatingBar from "../HealthRatingBar";

import patientService from "../../services/patients";
import { Patient, Gender } from "../../types";

const SinglePatientPage: React.FC = () => {
  const { patient_id } = useParams();
  const [patient, setPatient] = React.useState<Patient>({id:"",name:"",dateOfBirth:"",ssn:"",gender:Gender.Male,occupation:"",entries:[]});

  React.useEffect(() => {
    const getPatient = async () =>{
      try{
        const patient = await patientService.getOne(patient_id!);
        setPatient(patient);
      }catch (e) {
        console.error(e);
      }};

    void getPatient();
    },[]);

  return (
    <div className="App">
      <Box>
        <Typography align="center" variant="h6">
          Patient list
        </Typography>
      </Box>
      <Table style={{ marginBottom: "1em" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>Ssn</TableCell>
            <TableCell>Health Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableCell>{patient.name}</TableCell>
            <TableCell>{patient.gender}</TableCell>
            <TableCell>{patient.occupation}</TableCell>
            <TableCell>{patient.ssn}</TableCell>
            <TableCell><HealthRatingBar showText={false} rating={1} /></TableCell>
        </TableBody>
      </Table>
    </div>
  );
};

export default SinglePatientPage;
