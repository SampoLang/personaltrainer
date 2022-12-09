import React from "react";
import { Drawer as MUIDrawer } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Link } from "react-router-dom";
const Drawer = () => {
    const itemsList = [
        {
            text: 'Customers',
            icon: <PeopleIcon />,
            link: "/customers"
        },
        {
            text: 'Trainings',
            icon: <DirectionsRunIcon />,
            link: "/trainings"
        },
        {
            text: 'Calendar',
            icon: <CalendarMonthIcon />,
            link: "/calendar"
        },
        {
            text: "Display data",
            icon: <BarChartIcon />,
            link: "/showdata"
        }
    ]
    return (
        <MUIDrawer variant="permanent" className="Drawer">
            <List>
                {itemsList.map((item, index) => {
                    const { text, icon, link } = item;
                    return (
                        <Link to={link} key={index}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>{icon}</ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    );
                })}
            </List>
        </MUIDrawer>
    )
}

export default Drawer;