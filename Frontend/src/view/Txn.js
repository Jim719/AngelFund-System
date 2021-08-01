import React from 'react';
import Sidebar from '../component/Sidebar'
import { Drawer, makeStyles, Typography, Button } from '@material-ui/core';
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
    Matchdata: {
        width: '100%',
        // height: '100px',
        // borderStyle: 'solid',
        display: 'flex',
        flexDirection: 'row ',
        backgroundColor: '#76D7C4'
    },
    Infomation: {
        width: '650px',
        height: '300px',
        padding: '10px',
        borderStyle: 'solid',
        align: 'center'
    },
    PersonalData: {
        width: '100%',
        // height: '100px',
        // borderStyle: 'solid',
        display: 'flex',
        flexDirection: 'row ',
        backgroundColor: '#76D7C4'
    }

});

const Txn = () => {
    const classes = useStyle();
    return (
        <Sidebar>

            <div className={classes.content}>
                <div >
                    <img src={txn} alt="txn" className={classes.banner} />
                </div>
                <Typography variant="h5" align='center' fontWeight='bolder' style={{ marginTop: '10px' }}>匹配資料</Typography>
                <div className={classes.Matchdata}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <SupervisorAccountIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="投資人帳號" secondary="Jan 9, 2014" />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <FingerprintIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="投資到期日" secondary="Jan 7, 2014" />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <MailIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="投資回報" secondary="July 20, 2014" />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <PhoneInTalkIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="投資者資金" secondary="July 20, 2014" />
                    </ListItem>
                </div>
                    <Button color='Primary' variant="contained" style={{ marginLeft: '930px' }}> Submit</Button>
            </div>
        </Sidebar>
    );
}

export default Txn;
