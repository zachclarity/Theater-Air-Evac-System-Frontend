// React
import React from 'react'

// MUI
import { Box, Grid, IconButton, Tooltip, Typography } from '@mui/material'

// MUI Icons
import DeleteIcon from '@mui/icons-material/Delete'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

// custom 
import useStorage from '../../api/useStorage'
import NewPatientForm from '../../forms/NewPatientForm'
import PatientCard from './PatientCard'

function sortPatients(patients) {
    let patientList = Object.keys(patients).map(key => patients[key])
    patientList.sort((a, b) => {
        let aValue = a.statusLevel !== undefined ? a.statusLevel : 3
        let bValue = b.statusLevel !== undefined ? b.statusLevel : 3
        return aValue - bValue
    })
    return patientList
}


function PatientListing(props) {

    const [open, setOpen] = React.useState(false)
    const [patients, setPatients] = useStorage("patients", {})

    function deletePatients() {
        setPatients({})
    }

    function close() {
        setOpen(false)
    }

    const sortedPatients = sortPatients(patients)

    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h5">
                    Patient Listing
                </Typography>
            </Grid>
            {sortedPatients.map((patient, index) => <PatientCard key={index} {...patient} />)}
            <Grid item xs={2}>
                <Tooltip
                    title="Delete Patients"
                >
                    <IconButton
                        aria-label="Delete Patients"
                        onClick={deletePatients}
                    >
                        <DeleteIcon fontSize="large" />
                    </IconButton>
                </Tooltip>
            </Grid>
            <Grid item xs={8} />
            <Grid item xs={2} sx={{ display: "flex" }}>
                <Box sx={{ flexGrow: 1 }} />
                <Tooltip
                    title="Add New Patient"
                >
                    <IconButton
                        aria-label="Add New Patient"
                        onClick={() => setOpen(true)}
                    >
                        <PersonAddIcon fontSize="large" />
                    </IconButton>
                </Tooltip>
            </Grid>
            <NewPatientForm
                open={open}
                close={close}
            />
        </>
    )
}

export default PatientListing