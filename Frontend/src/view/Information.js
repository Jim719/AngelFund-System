import { React, useState } from 'react';
import '../assets/CSS/Main.css';
import { makeStyles, TextField, Typography, Button } from '@material-ui/core';
import Sidebar from '../component/Sidebar'
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import MailIcon from '@material-ui/icons/Mail';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import ListItemText from '@material-ui/core/ListItemText';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import Info from '../assets/image/Info.jpg'
import { api_UpdateAccount } from '../api'

const useStyle = makeStyles({
    content: {
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        width: '1025px',
        backgroundColor: '#EFB28C'
    },
    banner: {
        display: 'flex',
        width: '40vw',
        height: 'auto',
        margin: 'auto'
    },
    Info: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
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

const Information = () => {
    const classes = useStyle();
    const [charger, setCharger] = useState("");
    const [ID_OR_companyNumber, setId_or_number] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");

    const submit = async (e) => {
        e.preventDefault()
        if (charger && ID_OR_companyNumber && email && tel) {
          const Account = await api_UpdateAccount({ID_OR_companyNumber, email,tel,charger});
          console.log(charger,ID_OR_companyNumber,email, tel);
          console.log('-------------------')
          console.log(Account);
        }
        else {
          alert('有空白欄位 ，請在試一次')
        }
      }

    return (
        <>
            <Sidebar>
                <div className={classes.content}>
                    <div >
                        <img src={Info} alt="Info" className={classes.banner} />
                    </div>

                    <div className={classes.Infomation}>
                        <Typography variant="h5" align='center' fontWeight='bolder'>個人資料<b /></Typography>
                        <form noValidate onSubmit={submit}>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography variant="h6" align='left'>負責人：</Typography>
                                <TextField
                                    onChange={(e) => setCharger(e.target.value)}
                                    variant="outlined"
                                    required
                                    id="Charger"
                                    label="負責人姓名"
                                    name="Charger"
                                    autoComplete="Charger"
                                    style={{ marginLeft: '150px' }}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>

                                <Typography variant="h6" align='left'>公司號或身分證號：</Typography>
                                <TextField
                                    onChange={(e) => setId_or_number(e.target.value)}
                                    variant="outlined"
                                    required
                                    id="Id_or_number"
                                    label="公司號或身分證號"
                                    name="Id_or_number"
                                    autoComplete="Id_or_number"
                                    style={{ marginLeft: '50px' }}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>

                                <Typography variant="h6" align='left'>信箱：</Typography>
                                <TextField
                                    onChange={(e) => setEmail(e.target.value)}
                                    variant="outlined"
                                    required
                                    id="Email"
                                    label="信箱"
                                    name="Email"
                                    autoComplete="Email"
                                    style={{ marginLeft: '171px' }}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>

                                <Typography variant="h6" align='left'>電話號碼：</Typography>
                                <TextField
                                    onChange={(e) => setTel(e.target.value)}
                                    variant="outlined"
                                    required
                                    id="Tel"
                                    label="電話號碼"
                                    name="Tel"
                                    autoComplete="Tel"
                                    style={{ marginLeft: '130px' }}
                                />
                            </div>
                            <Button type="submit" color='Primary' variant="contained" style={{ marginLeft: '560px' }}> Submit</Button>
                        </form>
                    </div>
                    <div className={classes.PersonalData}>
                        {/* <List className={classes.root}> */}
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <SupervisorAccountIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="負責人" secondary="Jan 9, 2014" />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <FingerprintIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="公司號或身分證號" secondary="Jan 7, 2014" />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <MailIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="信箱" secondary="July 20, 2014" />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <PhoneInTalkIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="電話號碼" secondary="July 20, 2014" />
                        </ListItem>
                        {/* </List> */}
                    </div>
                </div>
            </Sidebar>
        </>
    )

};

export default Information;
