import { React, useState } from 'react';
import '../assets/CSS/Main.css';
import { Grid, makeStyles, TextField, Typography, Button } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Sidebar from '../component/Sidebar'
import Dataphoto from '../assets/image/Data.png'
import MyTables from '../component/MyTables'
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


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
    const classes = useStyle();
    const tableHead = [  //資料表頭
        {
            Headname: "姓名",
        },
        {
            Headname: "電話",
        },
        {
            Headname: "專案描述",
        },
        {
            Headname: "投資金額",
        },
    ];
    function proData(Name, phone, info, money) {
        return { Name, phone, info, money };
    }

    const tableData = [ //專案資料
        proData('Frozen yoghurt', 159, "擴建廠房增加營收", "19,283,000"),
        proData('Ice cream sandwich', 237, "新產品上市增加營收", "723,562,300"),
        proData('Eclair', 262, "合併公司增加營收", "34,843,500"),

    ];
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
                                    <form noValidate>
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <Typography variant="h6" align='left' style={{ margin: '8px' }}>專案名稱：</Typography>
                                            <TextField
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
                                                variant="outlined"
                                                required
                                                id="ProjectReturn"
                                                label="專案利率(%)"
                                                name="ProjectReturn"
                                                autoComplete="ProjectReturn"
                                                style={{ marginLeft: '50px' }}
                                            />
                                        </div>
                                        <Button color='Primary' variant="contained" style={{ marginLeft: '400px', marginTop: '10px' }}> Submit</Button>
                                    </form>

                                </div>
                            </Grid>
                            <Grid item xs={3} sm={6} md={6}>
                                <div className={classes.DataInfo}>
                                    <Typography variant="h5" align='center' fontWeight='bolder'>投資細項<b /></Typography>
                                    <form noValidate>
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <Typography variant="h6" align='left' style={{ margin: '8px' }}>投資期間：</Typography>
                                            <TextField
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
                                                variant="outlined"
                                                required
                                                id="InvestReturn"
                                                label="投資利息：(%)"
                                                name="InvestReturn"
                                                autoComplete="InvestReturn"
                                                style={{ marginLeft: '50px' }}
                                            />
                                        </div>

                                        <Button color='Secondary' variant="contained" style={{ marginLeft: '400px', marginTop: '10px' }}> Submit</Button>
                                    </form>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    <Divider style={{ margin: "10px" }} />
                    
                        <Typography variant="h5" fontWeight='bolder'>資料總表<b /></Typography>
                        <Tabs value={value} fullWidth onChange={handleChange} className={classes.Tabs}>
                            <Tab label="專案資料" style={{ backgroundColor: '#DAF7A6' ,fontWeight:'bolder'}} />
                            <Tab label="投資者資訊" style={{ backgroundColor: '#5DADE2', fontWeight:'bolder' }} />
                        </Tabs>
                        <SwipeableViews index={value} onChangeIndex={handleChange} style={{align:'center',width:'800px',marginBottom:'10px'}}>
                            <div className={classes.Proslide}>
                                <MyTables
                                    tableHead={tableHead}
                                    tableData={tableData}
                                />
                            </div>
                            <div className={classes.Invslide}>
                                <MyTables
                                    tableHead={tableHead}
                                    tableData={tableData}
                                />
                            </div>
                        </SwipeableViews>
                    

                </div>
            </Sidebar>
        </>
    )

};

export default Match;
