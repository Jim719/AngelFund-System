import express from "express";
import logger from "morgan";
import cors from "cors";
import { connect_to_web3 } from "./function/web3";
import { getContractInstance, contract_call, contract_send, string_to_bytes32, bytes32_to_string } from "./function/contract";
import CreateManagement from "./build/contracts/CreateManagement.json";
import DataManagement from "./build/contracts/DataManagement.json";
import path from "./path.json";
import mongoose from "mongoose";
import User from './models/User_Model'
import Account from './models/User_Account_Models'
import ProjectData from './models/ProjectData_Model'
import FunderData from './models/FunderData_Model'
import MatchingData_Pro from './models/MatchingData_ProjectSide_Model'
import MatchingData_Fun from './models/MatchingData_FunderSide_Model'
import ProjectWallet from './models/ProjectWallet_Model'
import FunderWallet from './models/FunderWallet_Model'
require("dotenv").config(); //環境變數
const AF = express();
AF.use(express.json()); //回應能使用json格式
AF.use(logger("dev")); //顯示呼叫的api在console畫面
AF.use(cors({
    origin: ['http://localhost:3000',
        'http://172.20.10.5:3000'],
    credentials: true,

}));

mongoose.connect('mongodb://localhost:27017/angel_fund_platform');
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once("open", () => {
    console.log('------------------------------------------------------');
    console.log("MongoDB database connection established successfully");
    console.log("The database is " + connection.name);

});
const CM_Addr = path.CreateManagement;
const DM_Addr = path.DataManagement;
var usrAddr = new Map();
var current_user = 0;
var category;

//創建使用者
const create = async (req, res) => {
    const { id, password, kind } = req.body
    const web3 = await connect_to_web3();
    const accounts = await web3.eth.getAccounts();
    const contract = await getContractInstance(web3, CreateManagement.abi, CM_Addr);
    try {
        const txn_data = await contract_send(contract, 'create_user', [id, password, kind], {
            from: accounts[0],
            gas: 6000000,
        })
        const useraddr = await contract_call(contract, 'get_add', [id], {
            from: accounts[0],
            gas: 6000000,
        })
        current_user = id;
        category = kind;
        usrAddr.set(id, useraddr);

        await User({ //寫入User資料庫
            user_id: id,
            user_password: password,
            user_kind: kind,
        }).save();

        res.json(txn_data)
        console.log(txn_data);
        console.log(id, password, kind);
        console.log('創建成功');
    }
    catch (e) {
        console.log(e);
        res.json("創建失敗");
    }

}

//使用者登入
const login = async (req, res) => {
    const { id, password } = req.body;
    const web3 = await connect_to_web3();
    const accounts = await web3.eth.getAccounts();
    const contract = await getContractInstance(web3, CreateManagement.abi, CM_Addr);
    try {
        const loggin = await contract_call(contract, 'login', [id, password], {
            from: accounts[0],
            gas: 6000000,
        })
        let kind = await contract_call(contract, 'get_category', [id], {
            from: accounts[0],
            gas: 6000000,
        })
        const useraddr = await contract_call(contract, 'get_add', [id], {
            from: accounts[0],
            gas: 6000000,
        })
        current_user = id;
        category = kind;
        usrAddr.set(id, useraddr);

        let transferkind = bytes32_to_string(kind);
        current_user = id;
        category = transferkind;
        console.log(category);
        console.log(loggin);
        console.log(id, password);
        res.json(loggin);
    }
    catch (e) {
        console.log(e);
        res.json("創建失敗");
    }
}

//設定使用者基本資料
const updateAccount = async (req, res) => {
    const { ID_OR_companyNumber, email, tel, charger } = req.body;
    const web3 = await connect_to_web3();
    const accounts = await web3.eth.getAccounts();
    const contract = await getContractInstance(web3, CreateManagement.abi, CM_Addr);
    const useradddr = await usrAddr.get(current_user);
    try {
        const update = await contract_send(contract, 'update_user_account', [useradddr, ID_OR_companyNumber, email, tel, charger], {
            from: accounts[1],
            gas: 6000000,
        })
        const test = await Account({ //寫入Account資料庫
            user_id: current_user,
            ID_OR_CompanyNunumber: ID_OR_companyNumber,
            Email: email,
            PhoneNumber: tel,
            Charger: charger,
        }).save();
        console.log(update);
        console.log('創建成功');
        res.json(test);
    }
    catch (e) {
        res.json("創建失敗!");
        console.log(e);
    }

}
//取得使用者基本資料
const get_AccountInfo = async (req, res) => {
    // const { } = req.query;
    // const web3 = await connect_to_web3();
    // const accounts = await web3.eth.getAccounts();
    // const contract = await getContractInstance(web3, CreateManagement.abi, CM_Addr);
    // const useradddr = usrAddr.get(current_user);
    // if (category === "Enterprise") {
    //     const Einfo = await contract_call(contract, 'get_Enterprise_account', [useradddr], {
    //         from: accounts[0],
    //         gas: 6000000,
    //     })
    //     res.json(Einfo);
    // }
    // else if (category === "Funder") {
    //     const Finfo = await contract_call(contract, 'get_Funder_account', [useradddr], {
    //         from: accounts[0],
    //         gas: 6000000,
    //     })
    //     res.json(Finfo);
    // }
    const userDoc = await Account.findOne({ user_id: current_user }).lean().exec();
    res.json(userDoc);


}
var eventnumber = 1;
//輸入企業方投資專案資料
const set_ProjectData = async (req, res) => {
    const userDoc = await ProjectData.findOne({ user_id: current_user }).lean().exec();
    if (userDoc != null) {
        eventnumber++;
    }
    if (category === "Enterprise") {
        const { project_Name, project_Indtroduce, project_Endday, Target_Amount, interest_Return } = req.body;
        const web3 = await connect_to_web3();
        const accounts = await web3.eth.getAccounts();
        const contract = await getContractInstance(web3, DataManagement.abi, DM_Addr);
        const result = await contract_send(contract, 'set_ProjectData', [current_user, eventnumber, project_Name, project_Indtroduce, project_Endday, Target_Amount, interest_Return], {
            from: accounts[0],
            gas: 6000000,
        })
        res.json(result);

        const test = await ProjectData({ //寫入ProjectData資料庫
            user_id: current_user,
            eventnumber: eventnumber,
            project_Name: project_Name,
            project_Indtroduce: project_Indtroduce,
            project_Endday: project_Endday,
            Target_Amount: Target_Amount,
            interest_Return: interest_Return,
        }).save();
        console.log('創建成功');
        console.log(project_Name, project_Indtroduce, project_Endday, Target_Amount, interest_Return);
        // console.log("號碼"+userDoc.eventnumber)
        console.log("號碼" + eventnumber)
        // console.log(userDoc);
    }
    else {
        res.json("身分別錯誤");
    }
    console.log("身分為: " + category + ',ID是:' + current_user);
}
//取得特定企業方投資專案資料
const get_UniqueProjectData = async (req, res) => {
    const { eventnumber } = req.query;
    const web3 = await connect_to_web3();
    const accounts = await web3.eth.getAccounts();
    const contract = await getContractInstance(web3, DataManagement.abi, DM_Addr);
    const result = await contract_call(contract, 'get_UniqueProjectData', [current_user, eventnumber], {
        from: accounts[0],
        gas: 6000000,
    })
    res.json(result);
}

//取得所有企業方專案資料
const getAllProjectData = async (req, res) => {
    const { } = req.query;
    const web3 = await connect_to_web3();
    const accounts = await web3.eth.getAccounts();
    const contract = await getContractInstance(web3, DataManagement.abi, DM_Addr);
    const result = await contract_call(contract, 'getAllProjectData', [], {
        from: accounts[0],
        gas: 6000000,
    })
    // let newresult = bytes32_to_string(result["0"][0]);
    // res.json(newresult);
    const Prodata = await ProjectData.find({}).exec()
    res.json(Prodata);
    // res.json(result);
}

let investment_number = 1;
//輸入投資方投資資料
const set_FundertData = async (req, res) => {
    const userDoc = await FunderData.findOne({ user_id: current_user }).lean().exec();
    if (userDoc != null) {
        investment_number++;
    }
    if (category === "Funder") {
        const { investment_Duration, investment_Amount, investment_Return } = req.body;
        const web3 = await connect_to_web3();
        const accounts = await web3.eth.getAccounts();
        const contract = await getContractInstance(web3, DataManagement.abi, DM_Addr);
        const result = await contract_send(contract, 'set_FundertData', [current_user, investment_number, investment_Duration, investment_Return, investment_Amount], {
            from: accounts[0],
            gas: 6000000,
        })
        res.json(result);

        const test = await FunderData({ //寫入FunderData資料庫
            user_id: current_user,
            investment_number: investment_number,
            investment_Duration: investment_Duration,
            investment_Amount: investment_Amount,
            investment_Return: investment_Return,

        }).save();
        console.log('創建成功');
        console.log(test);
    }
    else {
        res.json("身分別錯誤")
    }
    console.log("身分為: " + category + ',ID是:' + current_user);
}

//取得特定投資方資料
const get_UniqueFunderData = async (req, res) => {
    const { investment_number } = req.query;
    const web3 = await connect_to_web3();
    const accounts = await web3.eth.getAccounts();
    const contract = await getContractInstance(web3, DataManagement.abi, DM_Addr);
    const result = await contract_call(contract, 'get_UniqueFunderData', [current_user, investment_number], {
        from: accounts[0],
        gas: 6000000,
    })
    res.json(result);
}
//取的所有投資方資料
const get_allFunderData = async (req, res) => {
    const { } = req.query;
    const web3 = await connect_to_web3();
    const accounts = await web3.eth.getAccounts();
    const contract = await getContractInstance(web3, DataManagement.abi, DM_Addr);
    const result = await contract_call(contract, 'get_allFunderData', [], {
        from: accounts[0],
        gas: 6000000,
    })
    const Prodata = await FunderData.find({}).exec()
    res.json(Prodata);
    // res.json(result);
}

//進行匹配
const matching = async (req, res) => {
    const { } = req.query;
    const web3 = await connect_to_web3();
    const accounts = await web3.eth.getAccounts();
    const contract = await getContractInstance(web3, DataManagement.abi, DM_Addr);
    const result = await contract_send(contract, 'matching', [], {
        from: accounts[0],
        gas: 6000000,
    })
    res.json(result);
}

//取得匹配資料寫入資料庫
const get_MatchingData = async (req, res) => {
    if (category === "Enterprise") {
        const { } = req.query;
        const web3 = await connect_to_web3();
        const accounts = await web3.eth.getAccounts();
        const contract = await getContractInstance(web3, DataManagement.abi, DM_Addr);
        const uid = string_to_bytes32(current_user);
        const result = await contract_call(contract, 'get_MatchingData', [uid], {
            from: accounts[0],
            gas: 6000000,
        })
        let newresult = bytes32_to_string(result["0"]);
        // res.json({
        //     userID: newresult,
        //     investment_Return: result["1"],
        //     investment_Amount: result["2"]

        // });

        const test = await MatchingData_Pro({ //寫入FunderData資料庫
            user_id: current_user,
            Funder_ID: newresult,
            investment_Return: result["1"],
            investment_Amount: result["2"],

        }).save();
        console.log('創建成功');
        console.log(test);
        res.json(test);
        // res.json( MDP.Funder_ID, MDP.investment_Return,MDP.investment_Amount);
    }
    else {
        res.json('不用執行')
    }
}

const Get_DBMatchingData =async (req,res) => {
    if (category === "Enterprise") {
        const { } = req.query;
        let MDP = await MatchingData_Pro.findOne({ user_id: current_user }).exec();
        res.json({
            userID: MDP.Funder_ID,
            investment_Return: MDP.investment_Return,
            investment_Amount: MDP.investment_Amount
        })
    }
    else {
        res.json('不用執行')
    }
}

//以投資者角度取得匹配資料寫入資料庫
const get_InvMatchingData = async (req, res) => {
    if (category === "Funder") {
        const { } = req.query;
        const web3 = await connect_to_web3();
        const accounts = await web3.eth.getAccounts();
        const contract = await getContractInstance(web3, DataManagement.abi, DM_Addr);
        const uid = string_to_bytes32(current_user);
        const result = await contract_call(contract, 'get_InvMatchingData', [uid], {
            from: accounts[0],
            gas: 6000000,
        })
        let newresult = bytes32_to_string(result["0"]);
        let names = bytes32_to_string(result["1"]);
        // res.json({
        //     userID: newresult,
        //     // investment_Duration: newdate,
        //     Name: names,
        //     Target_Amount: result["2"],
        //     interest_Return: result["3"]

        // });
        const test = await MatchingData_Fun({ //寫入FunderData資料庫
            user_id: current_user,
            Enterprise_ID: newresult,
            Project_Name: names,
            Target_Amount: result["2"],
            Interest_Return: result["2"],
        }).save();

        console.log('創建成功');
        console.log(test);
        res.json(test);
    }
    else {
        res.json('不用執行')
    }
}


const Get_DBInvMatchingData = async (req, res) => {
    if (category === "Funder") {

        const { } = req.query;
        let MDF = await MatchingData_Fun.findOne({ user_id: current_user }).exec();
        res.json({
            userID: MDF.Enterprise_ID,
            Project_Name: MDF.Project_Name,
            Target_Amount: MDF.Target_Amount,
            Interest_Return: MDF.Interest_Return
        })
    }
    else {
        res.json('不用執行')
    }
}

//計算匹配成功次數
const get_counted = async (req, res) => {
    const { } = req.query;
    const web3 = await connect_to_web3();
    const accounts = await web3.eth.getAccounts();
    const contract = await getContractInstance(web3, DataManagement.abi, DM_Addr);
    const result = await contract_call(contract, 'get_counted', [], {
        from: accounts[0],
        gas: 6000000,
    })
    res.json(result);
}

//交易開始進行
const set_txn = async (req, res) => {
    const { } = req.query;
    const web3 = await connect_to_web3();
    const accounts = await web3.eth.getAccounts();
    const contract = await getContractInstance(web3, DataManagement.abi, DM_Addr);
    const uid = string_to_bytes32(current_user);
    const txn_addr = await contract_call(contract, 'get_Txnaddr', [uid], {
        from: accounts[0],
        gas: 6000000,
    })
    const result = await contract_send(contract, 'set_txn', [txn_addr], {
        from: accounts[0],
        gas: 6000000,
    })
    res.json(result);
}

const get_TXNEnterpriserWallet = async (req, res) => { //從區塊鏈上得到錢包金額 並寫置資料庫中
    if (category === "Enterprise") {
        const { } = req.query;
        const web3 = await connect_to_web3();
        const accounts = await web3.eth.getAccounts();
        const contract = await getContractInstance(web3, DataManagement.abi, DM_Addr);
        const uid = string_to_bytes32(current_user);
        const txn_addr = await contract_call(contract, 'get_Txnaddr', [uid], {
            from: accounts[0],
            gas: 6000000,
        })
        const result = await contract_call(contract, 'get_TXNEnterpriserWallet', [txn_addr], {
            from: accounts[0],
            gas: 6000000,
        })
        let newresult = bytes32_to_string(result["0"]);
        console.log(result);
        console.log("專案地址：" + txn_addr);

        // res.json({
        //     userID: newresult,
        //     project_name: result["1"],
        //     Target_amount: result["2"],
        //     interest_rate: result["3"],
        //     current_amount: result["4"],
        //     interest_payable: result["5"]
        // });

        const test = await ProjectWallet({ //寫入Project Wallet資料庫
            user_id: current_user,
            Project_Name: result["1"],
            Target_Amount: result["2"],
            Current_Amount: result["4"],
            Interest_Payable: result["5"],
        }).save();

        console.log('創建成功');
        console.log(test);

        let TPW = await ProjectWallet.findOne({ user_id: current_user }).exec();
        res.json({
            Project_Name: TPW.Project_Name,
            Target_Amount: TPW.Target_Amount,
            Current_Amount: TPW.Current_Amount,
            Interest_Payable: TPW.Interest_Payable,
        })

    }
    else {
        res.json('身分錯誤，請重新確認')
    }
}

const get_TXNFunderWallet = async (req, res) => {
    if (category === "Funder") {
        const { } = req.query;
        const web3 = await connect_to_web3();
        const accounts = await web3.eth.getAccounts();
        const contract = await getContractInstance(web3, DataManagement.abi, DM_Addr);
        const uid = string_to_bytes32(current_user);
        const txn_addr = await contract_call(contract, 'get_Txnaddr', [uid], {
            from: accounts[0],
            gas: 6000000,
        })
        const result = await contract_call(contract, 'get_TXNFunderWallet', [txn_addr], {
            from: accounts[0],
            gas: 6000000,
        })
        const Ent_result = await contract_call(contract, 'get_TXNEnterpriserWallet', [txn_addr], {
            from: accounts[0],
            gas: 6000000,
        })
        let newresult = bytes32_to_string(result["0"]);
        console.log(result);
        console.log("專案地址：" + txn_addr);
        // res.json({
        //     userID: newresult,
        //     investment_Return: result["1"],
        //     investment_amount: result["2"],
        //     current_money: result["3"],
        //     interest_receivable: result["4"],
        // });

        const test = await FunderWallet({ //寫入Project Wallet資料庫
            user_id: current_user,
            Project_Name: Ent_result["1"],
            Investment_Amount: result["2"],
            Current_Amount: result["3"],
            Interest_Receivable: result["4"],
        }).save();

        res.json({ test });
        // let TFW = await FunderWallet.findOne({ user_id: current_user }).exec();
        // res.json({
        //     Project_Name: TFW.Project_Name,
        //     Investment_Amount: TFW.Investment_Amount,
        //     Current_Amount: TFW.Current_Amount,
        //     Interest_Receivable: TFW.Interest_Receivable,
        // })
        console.log('創建成功');
        console.log(test);

    }
    else {
        res.json('身分錯誤，請重新確認')
    }
}

const GetProTxndata = async (req, res) => {  //從資料庫取出 企業方錢包金額
    if (category === "Enterprise") {

        const { } = req.query;
        let TPW = await ProjectWallet.findOne({ user_id: current_user }).exec();
        res.json({
            Project_Name: TPW.Project_Name,
            Target_Amount: TPW.Target_Amount,
            Current_Amount: TPW.Current_Amount,
            Interest_Payable: TPW.Interest_Payable,
        })
    }
    else {
        res.json('身分錯誤，請重新確認')
    }
}

const GetFunTxndata = async (req, res) => {  //從資料庫取出 投資者錢包金額
    if (category === "Funder") {

        const { } = req.query;
        let TFW = await FunderWallet.findOne({ user_id: current_user }).exec();
        res.json({
            Project_Name: TFW.Project_Name,
            Investment_Amount: TFW.Investment_Amount,
            Current_Amount: TFW.Current_Amount,
            Interest_Receivable: TFW.Interest_Receivable,
        })
    }
    else {
        res.json('身分錯誤，請重新確認')
    }
}

//資料創建
AF.post('/create', create); //創建帳號
AF.post('/login', login);    //登入

//個人資料輸入
AF.post('/updateAccount', updateAccount);       //輸入個人資料
AF.get('/get_AccountInfo', get_AccountInfo);    //取得個人資料

//投資專案條件
AF.post('/set_ProjectData', set_ProjectData);   //輸入被投資專案資料
AF.get('/get_UniqueProjectData', get_UniqueProjectData);    //取得特定被投資專案資料
AF.get('/getAllProjectData', getAllProjectData);    //取得所有被投資專案資料
AF.post('/set_FundertData', set_FundertData);       //輸入投資者欲投資資料
AF.get('/get_UniqueFunderData', get_UniqueFunderData);      //取得特定投資者欲投資資料
AF.get('/get_allFunderData', get_allFunderData);            //取得所有投資者欲投資資料

//匹配
AF.post('/matching', matching);         //進行匹配
AF.get('/get_MatchingData', get_MatchingData);      //取得匹配成功資料
AF.get('/get_InvMatchingData', get_InvMatchingData);      //取得匹配成功資料
AF.get('/get_counted', get_counted);    //計算匹配次數
AF.get('/Get_DBMatchingData', Get_DBMatchingData);      //從資料庫中取得匹配成功資料
AF.get('/Get_DBInvMatchingData', Get_DBInvMatchingData);      //從資料庫中取得匹配成功資料
//交易
AF.post('/set_txn', set_txn);           //交易開始
AF.get('/get_TXNEnterpriserWallet', get_TXNEnterpriserWallet);  //取得交易完成後企業方金額帳目
AF.get('/get_TXNFunderWallet', get_TXNFunderWallet);            //取得交易完成後投資方金額帳目
AF.get('/GetFunTxndata', GetFunTxndata); //從資料庫取得投資者錢包
AF.get('/GetProTxndata', GetProTxndata); //從資料庫取得企業方錢包

AF.listen(process.env.LISTENING_PORT, () => {
    console.log(`AF listening at http://localhost:${process.env.LISTENING_PORT}`);
});


