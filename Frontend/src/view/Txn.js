import { React, useState,useEffect } from 'react';
import Sidebar from '../component/Sidebar'
import { makeStyles, Typography, Button, Divider } from '@material-ui/core';
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
import { api_Matching, api_GetMatchingData, api_GetInvMatchingData ,api_Settxn,api_GetTXNEnterpriserWallet,api_GetTXNFunderWallet} from '../api'


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
    const [value, setValue] = useState(0); //匹配資料設定值
    const classes = useStyle();
    const handleChange = (event, newValue) => {
        localStorage.setItem("status_tab", newValue);
        setValue(newValue);
    };
    const [Txnvalue, setTxnValue] = useState(0); //匹配資料設定值
    const TxnhandleChange = (event, newValue) => {
        localStorage.setItem("status_tab", newValue);
        setTxnValue(newValue);
    };
    const [prodata, setProdata] = useState('');//企業方匹配結果
    const [fundata, setFundata] = useState('');//投資方匹配結果
    const [TxnProdata, setTxnProdata] = useState('');//企業方匹配結果
    const [TxnFundata, setTxnFundata] = useState('');//投資方匹配結果

    useEffect(() => {
        ShowData();
        ShowTxnData();
    }, []);

    const ShowData= async()=>{ //匹配資料顯示於畫面
        const Match_Prodata = await api_GetMatchingData();
        const Match_Fundata = await api_GetInvMatchingData();
        setProdata(Match_Prodata.data);
        setFundata(Match_Fundata.data);
    }
    const ShowTxnData= async()=>{ //交易資料顯示於畫面
        const Match_Prodata = await api_GetMatchingData();
        const Match_Fundata = await api_GetInvMatchingData();
        setProdata(Match_Prodata.data);
        setFundata(Match_Fundata.data);
    }
    const SubmmitMatch= async()=>{ //呼叫匹配過程，並將結果呼叫出來
        const match = await api_Matching();
        const Match_Prodata = await api_GetMatchingData();
        const Match_Fundata = await api_GetInvMatchingData();
        setProdata(Match_Prodata.data);
        setFundata(Match_Fundata.data);
        console.log('匹配資料'+match);
        console.log('企業資料:'+Match_Prodata.data);
        console.log('投資方資料'+Match_Fundata.data);

    }
    const SubmmitTxn= async()=>{ //呼叫交易過程，並將結果呼叫出來
        const Txn = await api_Settxn();
        const Txn_Prodata = await api_GetTXNEnterpriserWallet();
        const Txn_Fundata = await api_GetTXNFunderWallet();
        setTxnProdata(Txn_Prodata.data);
        setTxnFundata(Txn_Fundata.data);
        console.log('交易資料'+Txn);
        console.log('企業資料:'+Txn_Prodata.data);
        console.log('投資方資料'+Txn_Fundata.data);
        // console.log('我備案到囉')
    }
    return (
        <Sidebar>
            <div className={classes.content}>
                <div >
                    <img src={txn} alt="txn" className={classes.banner} />
                </div>
                <Typography variant="h5" align='center' fontWeight='bolder' style={{ marginTop: '10px' }}>匹配資料</Typography>
                <Tabs value={value} fullWidth onChange={handleChange} className={classes.Tabs}>
                    <Tab label="企業方匹配結果" style={{ backgroundColor: '#DAF7A6', fontWeight: 'bolder' }} />
                    <Tab label="投資方匹配結果" style={{ backgroundColor: '#5DADE2', fontWeight: 'bolder' }} />
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
                                    <ListItemText primary="投資人帳號" secondary={prodata ? prodata.userID : "---"} />
                                </ListItem>
                            </div>
                
                            <div>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <MailIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="投資回報" secondary={prodata ? prodata.investment_Return : "---"} />
                                </ListItem>
                            </div>
                            <div>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <PhoneInTalkIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="投資者資金" secondary={prodata ? prodata.investment_Amount : "---"}  />
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
                                    <ListItemText primary="企業方帳號" secondary={fundata ? fundata.userID : "---"} />
                                </ListItem>
                            </div>
                            <div>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FingerprintIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="專案名稱" secondary={fundata ? fundata.Project_Name : "---"}  />
                                </ListItem>
                            </div>
                            <div>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <MailIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="投資總額" secondary={fundata ? fundata.Target_Amount : "---"} />
                                </ListItem>
                            </div>
                            <div>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <PhoneInTalkIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="專案利率" secondary={fundata ? fundata.Interest_Return : "---"}  />
                                </ListItem>
                            </div>
                        </div>
                    </SwipeableViews>
                </div>
                <Button color='Primary' onClick={() => { SubmmitMatch()}} variant="contained" style={{ marginLeft: '930px' }}> Submit</Button>

                <Divider/>

                <Typography variant="h5" align='center' fontWeight='bolder' style={{ marginTop: '10px' }}>交易進行</Typography>
                <Tabs value={Txnvalue} fullWidth onChange={TxnhandleChange} className={classes.Tabs}>
                    <Tab label="企業方交易" style={{ backgroundColor: '#DAF7A6', fontWeight: 'bolder' }} />
                    <Tab label="投資方交易" style={{ backgroundColor: '#5DADE2', fontWeight: 'bolder' }} />
                </Tabs>
                 <div className={classes.Matching}>
                    <SwipeableViews index={Txnvalue} onChangeIndex={TxnhandleChange} style={{ align: 'center', marginBottom: '10px' }}>
                        <div className={classes.ProMatchdata}>
                            <div>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <SupervisorAccountIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="專案名稱" secondary={TxnProdata ? TxnProdata.Project_Name : "---"} />
                                </ListItem>
                            </div>
                            <div>

                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <FingerprintIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="目標金額" secondary={TxnProdata ? TxnProdata.Target_Amount : "---"}/>
                            </ListItem>
                            </div>
                            <div>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <MailIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="當前金額" secondary={TxnProdata ? TxnProdata.Current_Amount : "---"} />
                                </ListItem>
                            </div>
                            <div>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <PhoneInTalkIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="應付利息" secondary={TxnProdata ? TxnProdata.Interest_Payable : "---"} />
                                </ListItem>
                            </div>
                        </div>

                        <div className={classes.InvMatchdata}>
                            <div>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <PhoneInTalkIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="專案名稱" secondary={TxnFundata ? TxnFundata.Project_Name : "---"}  />
                                </ListItem>
                            </div>
                            <div>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <SupervisorAccountIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="投資金額" secondary={TxnFundata ? TxnFundata.Investment_Amount : "---"}  />
                                </ListItem>
                            </div>
                            <div>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FingerprintIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="當前金額" secondary={TxnFundata ? TxnFundata.Current_Amount : "---"}  />
                                </ListItem>
                            </div>
                            <div>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <MailIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="可收取利息" secondary={TxnFundata ? TxnFundata.Interest_Receivable : "---"}  />
                                </ListItem>
                            </div>
                        </div>
                    </SwipeableViews>
                </div>
                <Button color='Secondary'  onClick={() => { SubmmitTxn()}}  variant="contained" style={{ marginLeft: '930px' }}> start</Button>
                


                
            </div>

        </Sidebar>
    );
}

export default Txn;
