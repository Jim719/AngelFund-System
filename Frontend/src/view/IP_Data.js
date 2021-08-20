import { React, useState, useEffect } from 'react';
import '../assets/CSS/Main.css';
import { Grid, makeStyles, TextField, Typography, Button } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Sidebar from '../component/Sidebar'
import Dataphoto from '../assets/image/Data.png'
import { Project_Data_Tbl, InvestData_Tbl } from '../component/MyTables'
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { api_SetFundertData, api_SetProjectData, api_GetAllProjectData,api_GetallFunderData } from '../api'


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
    Info: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    DataInfo: {
        width: '500px',
        height: '400px',
        border: '2px solid'
    },
    Tabs: {
        background: '#fff',
        // backgroundColor: '#DAF7A6'
    },
    Proslide: {
        backgroundColor: '#FEA900',
        width: '800px'
    },
    Invslide: {
        backgroundColor: '#B3DC4A',
        width: '800px'
    },

});

const Match = () => {
    const [value, setValue] = useState(0); //控制導覽列
    const [project_Name, setProName] = useState("");
    const [project_Indtroduce, setProInto] = useState("");
    const [project_Endday, setProEndday] = useState("");
    const [Target_Amount, setTargetAmount] = useState("");
    const [interest_Return, setProjectReturn] = useState("");
    const [investment_Duration, setInvestDuration] = useState("");
    const [investment_Amount, setInvestAmount] = useState("");
    const [investment_Return, setInvestReturn] = useState("");
    const [ProData, setProData] = useState([]);
    const [FunData, setFunData] = useState([]);

    const classes = useStyle();
    useEffect(() => { //於畫面render後執行,反覆抓取企業方資料
        ShowProData();
        ShowFunData();
    }, []);

    const ShowProData = async () => {
        const pdt = await api_GetAllProjectData();
        const rowData = pdt.data.map((item) => {
            //取得企業方專案資料 row data            
            return [
                item.user_id,
                item.eventnumber,
                item.project_Name,
                item.project_Indtroduce,
                item.project_Endday,
                item.Target_Amount,
                item.interest_Return,
            ];
        });
        setProData(rowData);
        console.log('hello start to print')
        console.log(rowData)
        // console.log(pdt)
        console.log(typeof (ProData));
    }
    const ShowFunData = async () => {
        const fdt = await api_GetallFunderData();
        const rowData = fdt.data.map((item) => {
            //取得投資方投資資料 row data            
            return [
                item.user_id,
                item.investment_number,
                item.investment_Duration,
                item.investment_Amount,
                item.investment_Return,                
            ];
        });
        setFunData(rowData);
        console.log('hello start to print')
        console.log(rowData)       
        console.log(typeof (FunData));
    }

    const Psubmit = async (e) => { //企業方資料送出
        e.preventDefault()
        if (project_Name && project_Indtroduce && project_Endday && Target_Amount && interest_Return) {
            const Pdata = await api_SetProjectData({ project_Name, project_Indtroduce, project_Endday, Target_Amount, interest_Return });
            console.log(Pdata);
            console.log('-------------------')
            ShowProData();
        }
        else {
            alert('有空白欄位 ，請在試一次')
        }
    }
    const Fsubmit = async (e) => { //投資方資料送出
        e.preventDefault()
        if (investment_Duration && investment_Return && investment_Amount) {
            const Fdata = await api_SetFundertData({ investment_Duration, investment_Amount, investment_Return });
            console.log(Fdata);
            console.log('-------------------')
            ShowFunData();
        }
        else {
            alert('有空白欄位 ，請在試一次')
        }
    }
    const handleChange = (event, newValue) => {
        localStorage.setItem("status_tab", newValue);
        setValue(newValue);
    };


    return (
        <>
            <Sidebar>
                <div className={classes.content}>
                    <div >
                        <img src={Dataphoto} alt="Dataphoto" className={classes.banner} />
                    </div >
                    <Typography variant="h5" align='center' fontWeight='bolder'>專案資料 OR 投資細項填寫</Typography>
                    <div>
                        <Grid container spacing={1}>
                            <Grid item xs={3} sm={6} md={6}>
                                <div className={classes.DataInfo}>
                                    <Typography variant="h5" align='center' fontWeight='bolder'>專案資料<b /></Typography>
                                    <form noValidate onSubmit={Psubmit}>
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <Typography variant="h6" align='left' style={{ margin: '8px' }}>專案名稱：</Typography>
                                            <TextField
                                                onChange={(e) => setProName(e.target.value)}
                                                variant="outlined"
                                                required
                                                id="ProName"
                                                label="專案名稱"
                                                name="ProName"
                                                autoComplete="ProName"
                                                style={{ marginLeft: '50px' }}
                                            />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>

                                            <Typography variant="h6" align='left' style={{ margin: '8px' }}>專案描述：</Typography>
                                            <TextField
                                                onChange={(e) => setProInto(e.target.value)}
                                                variant="outlined"
                                                required
                                                id="ProInto"
                                                label="專案描述"
                                                name="ProInto"
                                                autoComplete="ProInto"
                                                style={{ marginLeft: '50px' }}
                                            />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>

                                            <Typography variant="h6" align='left' style={{ margin: '8px' }}>專案截止日：</Typography>
                                            <TextField
                                                onChange={(e) => setProEndday(e.target.value)}
                                                variant="outlined"
                                                required
                                                id="ProEndday"
                                                label="專案截止日"
                                                name="ProEndday"
                                                autoComplete="ProEndday"
                                                style={{ marginLeft: '30px' }}
                                            />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>

                                            <Typography variant="h6" align='left' style={{ margin: '8px' }}>投資總額：</Typography>
                                            <TextField
                                                onChange={(e) => setTargetAmount(e.target.value)}
                                                variant="outlined"
                                                required
                                                id="TargetAmount"
                                                label="投資總額"
                                                name="TargetAmount"
                                                autoComplete="TargetAmount"
                                                style={{ marginLeft: '50px' }}
                                            />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>

                                            <Typography variant="h6" align='left' style={{ margin: '8px' }}>專案利率：</Typography>
                                            <TextField
                                                onChange={(e) => setProjectReturn(e.target.value)}
                                                variant="outlined"
                                                required
                                                id="ProjectReturn"
                                                label="專案利率(%)"
                                                name="ProjectReturn"
                                                autoComplete="ProjectReturn"
                                                style={{ marginLeft: '50px' }}
                                            />
                                        </div>
                                        <Button color='Primary' type="submit" variant="contained" style={{ marginLeft: '400px', marginTop: '10px' }}> Submit</Button>
                                    </form>

                                </div>
                            </Grid>
                            <Grid item xs={3} sm={6} md={6}>
                                <div className={classes.DataInfo}>
                                    <Typography variant="h5" align='center' fontWeight='bolder'>投資細項<b /></Typography>
                                    <form noValidate onSubmit={Fsubmit}>
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <Typography variant="h6" align='left' style={{ margin: '8px' }}>投資期間：</Typography>
                                            <TextField
                                                onChange={(e) => setInvestDuration(e.target.value)}
                                                variant="outlined"
                                                required
                                                id="InvestDuration"
                                                label="投資期間"
                                                name="InvestDuration"
                                                autoComplete="InvestDuration"
                                                style={{ marginLeft: '50px' }}
                                            />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>

                                            <Typography variant="h6" align='left' style={{ margin: '8px' }}>投資金額：</Typography>
                                            <TextField
                                                onChange={(e) => setInvestAmount(e.target.value)}
                                                variant="outlined"
                                                required
                                                id="InvestAmount"
                                                label="投資金額："
                                                name="InvestAmount"
                                                autoComplete="InvestAmount"
                                                style={{ marginLeft: '50px' }}
                                            />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>

                                            <Typography variant="h6" align='left' style={{ margin: '8px' }}>投資利息：</Typography>
                                            <TextField
                                                onChange={(e) => setInvestReturn(e.target.value)}
                                                variant="outlined"
                                                required
                                                id="InvestReturn"
                                                label="投資利息：(%)"
                                                name="InvestReturn"
                                                autoComplete="InvestReturn"
                                                style={{ marginLeft: '50px' }}
                                            />
                                        </div>

                                        <Button color='Secondary' type="submit" variant="contained" style={{ marginLeft: '400px', marginTop: '10px' }}> Submit</Button>
                                    </form>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    <Divider style={{ margin: "10px" }} />

                    <Typography variant="h5" fontWeight='bolder'>資料總表<b /></Typography>
                    <Tabs value={value} fullWidth onChange={handleChange} className={classes.Tabs}>
                        <Tab label="專案資料" style={{ backgroundColor: '#DAF7A6', fontWeight: 'bolder' }} />
                        <Tab label="投資者資訊" style={{ backgroundColor: '#5DADE2', fontWeight: 'bolder' }} />
                    </Tabs>
                    <SwipeableViews index={value} onChangeIndex={handleChange} style={{ align: 'center', width: '800px', marginBottom: '10px' }}>
                        <div className={classes.Proslide}>
                            <Project_Data_Tbl

                                tableData={ProData}
                            />
                        </div>
                        <div className={classes.Invslide}>
                            <InvestData_Tbl

                                tableData={FunData}
                            />
                        </div>
                    </SwipeableViews>
                </div>
            </Sidebar>
        </>
    )

};

export default Match;
