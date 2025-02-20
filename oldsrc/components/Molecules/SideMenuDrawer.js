
import React from 'react'

import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import TableChartIcon from '@mui/icons-material/TableChart';
import { Link } from 'react-router-dom'

function SideDrawer(props) {
    const {open, close} = props

    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={close}
            sx={{
                width: 240,
                [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
            }}
        >
            <List>
                <ListItem disablePadding>
                    <Link to="/" style={{color: "inherit", textDecoration: "none", width: "100%"}}>
                        <ListItemButton>
                            <ListItemIcon>
                                <PeopleAltIcon />
                            </ListItemIcon>
                            <ListItemText primary="Patients" />
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem disablePadding>
                    <Link to="/tucs" style={{color: "inherit", textDecoration: "none", width: "100%"}}>
                        <ListItemButton>
                            <ListItemIcon>
                                <TableChartIcon />
                            </ListItemIcon>
                            <ListItemText primary="TUCS" />
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem disablePadding>
                    <Link to="/triage" style={{color: "inherit", textDecoration: "none", width: "100%"}}>
                        <ListItemButton>
                            <ListItemIcon>
                                <TableChartIcon />
                            </ListItemIcon>
                            <ListItemText primary="Triage" />
                        </ListItemButton>
                    </Link>
                </ListItem>
            </List>
        </Drawer>
    )
}

export default SideDrawer