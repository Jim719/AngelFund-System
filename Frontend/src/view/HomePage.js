import React from 'react';
import '../assets/CSS/Main.css';
import { Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import Sidebar from '../component/Sidebar'
import Divider from '@material-ui/core/Divider';
import AngelFund from '../assets/image/AngelFund.png'
import BC from '../assets/image/Blockchain.png'
import AF from '../assets/image/AF.jpg'
import Iframe from 'iframe-react'
const useStyle = makeStyles({
    banner: {
        display: 'flex',
        width: '60%',
        height: 'auto',
        margin: 'auto'
    },
    Info: {
        display: 'flex',
        flexDirection: 'row'
    },
    photo: {
        display: 'flex',
        width: '100px',
        height: '100px',
        borderRadius: 50,
    },
    map: {
        width: '500px',
        height: " 200px",
        frameborder: " 0",
        style: " border：0"
    },
    location: {
        display: 'flex',
    }

});

const HomePage = () => {
    const classes = useStyle();
    return (
        <>
            <Sidebar>
                <div className='Background'>
                    <div >
                        <img src={AngelFund} alt="AngelFund" className={classes.banner} />
                    </div>
                    <Divider style={{ margin: '10px' }} />
                    <Typography variant="h4" align='center' fontWeight='bolder'>新興科技介紹<b /></Typography>
                    <Grid container spacing={2} className="Info">
                        <Grid item xs={12} sm={6} md={4}>
                            <div className="Info_new1">
                                <img src={BC} alt="BC" className={classes.photo} />
                                區塊鏈:
                                <ul>
                                    <li>交易透明，達到開放性。</li>
                                    <li>資料加密，達到匿名性。</li>
                                    <li>資料難以竄改，達到安全性。</li>
                                    <li>分散記錄所有交易，可追溯性。</li>
                                    <li>分散式系統，達到去中心化。</li>
                                </ul>

                            </div>

                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <div className="Info_new2">
                                <img src={AF} alt="AF" className={classes.photo} />
                                天使基金:
                                <ul>
                                    <li>投資新興而且快速成長中的科技公司，近年來偏向近成熟期的投資項目。</li>
                                    <li>協助新興的科技公司開發新產品。</li>
                                    <li>承擔投資的高風險並追求高報酬。</li>
                                    <li>以股權的型態投資於這些新興的科技公司。</li>
                                    <li>經由實際參與經營決策提供具附加價值的協助。</li>
                                </ul>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <div className="Info_new3">
                                <img src={BC} alt="BC" className={classes.photo} />
                                共享經濟
                                <ul>
                                    <li>低利用率的閒置資產（under-utilized idlel asset）。</li>
                                    <li>互動性（interaction）。</li>
                                    <li>暫時性的使用權（temporary access）。</li>
                                    {/* <li>分散記錄所有交易，可追溯性。</li>
                                    <li>分散式系統，達到去中心化。</li> */}
                                </ul>
                            </div>

                        </Grid>

                    </Grid>
                    <Divider style={{ margin: '10px' }} />
                    <Grid container spacing={2} className={classes.location}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant="h5" align='left' fontWeight='bolder'>Our Location<b /></Typography>
                            <iframe
                                title="This is a map"
                                className={classes.map}
                                src=" https://www.google.com/maps/embed/v1/place?key=AIzaSyC59As4FprMLaXgX8KqG2XKFZn8dK_X60Q&q=國立中興大學" allowfullscreen>
                            </ iframe>

                        </Grid>
                        <Grid item xs={12} sm={6} md={4} style={{ marginLeft: 'auto' }}>
                            <Typography variant="h5" align='left' fontWeight='bolder'>Send Message To Us<b /></Typography>
                            {/* <TextField variant='outlined' label='有話想跟我們說'  style={{width:'300px',height:'200px'}}/> */}
                            <input id="message" type="text" name="message"  style={{ width: '300px', height: '200px' }} />
                            <Button color='Primary' variant="contained" > Submit</Button>
                        </Grid>

                    </Grid>
                    <div className='Contact'>
                        <Typography variant="h5" align='left' fontWeight='bolder'>Contact us<b /></Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography>402台中市南區興大路145號<br />EMAIL : jim87719@gmail.com</Typography>
                            </Grid>
                        </Grid>
                    </div>

                </div>
            </Sidebar>
        </>
    )

};
export default HomePage;