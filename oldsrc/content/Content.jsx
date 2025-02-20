// React
import React, { Suspense } from 'react'

// MUI
import { Grid, LinearProgress } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import Patients from './Patients'
import PatientPage from './PatientPage'
import TucsPage from './TucsPage'
import PatientListing from './ae/PatientListing'
import AEPatientPage from './ae/PatientPage'
import TriagePage from './Triage'
import MainLayout from '../components/pages/MainLayout'

function Content({onModeChange, logout}) {
    
    return (
        <Grid
            container
            spacing={1}
            sx={{
                paddingLeft: "7px",
                paddingRight: "7px",
                marginTop: "7px",
                alignContent: "stretch"
            }}
        >
            <Suspense fallback={<LinearProgress />}>
                <Routes>
                    <Route
                        path="/"
                        element={<MainLayout onModeChange={onModeChange} logout={logout} />}
                    />
                    <Route
                        path="/patients"
                        element={<Patients />}
                    />
                    <Route
                        path="/patients/:dodid"
                        element={<PatientPage />}
                    />
                    <Route
                        path="/tucs"
                        element={<TucsPage />}
                    />
                    <Route
                        path="/patients/ae/:dodid"
                        element={<AEPatientPage />}
                    />
                    <Route
                        path="/triage"
                        element={<TriagePage />}
                    />
                </Routes>
            </Suspense>
        </Grid>
    )
}

export default Content