import React from 'react';
import List from '@material-ui/core/List';
import { Drawer, makeStyles, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { AddCircleOutlined } from '@material-ui/icons';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import { useHistory, useLocation } from 'react-router-dom';

const drawerWidth = 250;
const useStyles = makeStyles({
    drawer: {
        width: drawerWidth,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    root: {
        display: "flex",
        
    },
    background:{
        display: "flex",
        backgroundColor:'#EFB28C',
        width:'100vw',
        height:'100vh',
    },
    active: {
        background: "#E5E5E5"
    },
    title: {
        marginLeft: '10px'
    }
})

const Sidebar = ({ children }) => {
    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()
    const menuItems = [
        {
            text: "平台主頁",
            icon: <AcUnitIcon color="secondary" />,
            path: '/HomePage'
        },
        {
            text: "個人資訊",
            icon: <AddCircleOutlined color="primary" />,
            path: '/Information'
        },
        {
            text: "投資/專案資料",
            icon: <AcUnitIcon color="secondary" />,
            path: '/IP_Data'
        },
        {
            text: "交易專區",
            icon: <AddCircleOutlined color="primary" />,
            path: '/Txn'
        },        
    ]
    return (
        <div className={classes.background}>            
            <div className={classes.root}>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    anchor="left"
                    classes={{ paper: classes.drawerPaper }}
                >
                    <div>
                        <Typography variant="h5" className={classes.title}>
                            AngelFunds Platform
                        </Typography>
                        <Typography variant="h6" className={classes.title}>
                            hello Jim
                        </Typography>
                        <Divider />
 
                    </div>

                    <List>
                        {menuItems.map(item => (
                            <ListItem
                                button
                                key={item.text}
                                onClick={() => history.push(item.path)}
                                className={location.pathname === item.path ? classes.active : null}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text}></ListItemText>

                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            </div>
            <div>
                {children}
            </div>
        </div>

    );
}

export default Sidebar;

