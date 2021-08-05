import { React, useState } from 'react';
import Sidebar from '../component/Sidebar'
import { makeStyles, Typography, Button } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
// import { MatchingProjectData_Tbl, MatchingInvestData_Tbl } from '../component/MyTables'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import MailIcon from '@material-ui/icons/Mail';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import ListItemText from '@material-ui/core/ListItemText';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import txn from '../assets/image/transaction.jpg'

const useStyle = makeStyles({
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '1025px',
        // border: '2px solid #eee',
        backgroundColor: '#EFB28C'
    },
    banner: {
        display: 'flex',
        width: '40vw',
        height: 'auto',
        margin: 'auto'
    },
    ProMatchdata: {
        display: 'flex',
        flexDirection: 'row ',
        backgroundColor: '#76D7C4',
        justifyContent: 'space-around',
    },
    InvMatchdata: {
        display: 'flex',
        flexDirection: 'row ',
        backgroundColor: '#5DADE2',
        justifyContent: 'space-around',
    },
    Matching: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row ',
        // backgroundColor: '#76D7C4'
    },

});

const Txn = () => {
    const [value, setValue] = useState(0);
    const classes = useStyle();
    const handleChange = (event, newValue) => {
        localStorage.setItem("status_tab", newValue);
        setValue(newValue);
    };
    return (
        <Sidebar>
            <div className={classes.content}>
                <div >
                    <img src={txn} alt="txn" className={classes.banner} />
                </div>
                <Typography variant="h5" align='center' fontWeight='bolder' style={{ marginTop: '10px' }}>匹配資料</Typography>
                <Tabs value={value} fullWidth onChange={handleChange} className={classes.Tabs}>
                    <Tab label="企業方匹配結果" style={{ backgroundColor: '#DAF7A6', fontWeight: 'bolder' }} />
                    <Tab label="投資者匹配結果" style={{ backgroundColor: '#5DADE2', fontWeight: 'bolder' }} />
                </Tabs>
                <div className={classes.Matching}>
                    <SwipeableViews index={value} onChangeIndex={handleChange} style={{ align: 'center', marginBottom: '10px' }}>
                        <div className={classes.ProMatchdata}>
                            <div>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <SupervisorAccountIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="投資人帳號" secondary="Jan 9, 2014" />
                                </ListItem>
                            </div>
                            {/* <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <FingerprintIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="投資到期日" secondary="Jan 7, 2014" />
                            </ListItem> */}
                            <div>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <MailIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="投資回報" secondary="July 20, 2014" />
                                </ListItem>
                            </div>
                            <div>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <PhoneInTalkIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="投資者資金" secondary="July 20, 2014" />
                                </ListItem>
                            </div>
                        </div>

                        <div className={classes.InvMatchdata}>
                            <div>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <SupervisorAccountIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="企業方帳號" secondary="Jan 9, 2014" />
                                </ListItem>
                            </div>
                            <div>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FingerprintIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="專案名稱" secondary="Jan 7, 2014" />
                                </ListItem>
                            </div>
                            <div>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <MailIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="投資總額" secondary="July 20, 2014" />
                                </ListItem>
                            </div>
                            <div>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <PhoneInTalkIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="專案利率" secondary="July 20, 2014" />
                                </ListItem>
                            </div>
                        </div>
                    </SwipeableViews>
                </div>
                <Button color='Primary' variant="contained" style={{ marginLeft: '930px' }}> Submit</Button>
            </div>

        </Sidebar>
    );
}

export default Txn;
