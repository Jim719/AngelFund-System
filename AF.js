import express from "express";
import logger from "morgan";
import { connect_to_web3 } from "./function/web3";
import { getContractInstance, contract_call, contract_send, string_to_bytes32, bytes32_to_string } from "./function/contract";
import CreateManagement from "./build/contracts/CreateManagement.json";
import DataManagement from "./build/contracts/DataManagement.json";
import path from "./path.json";

require("dotenv").config(); //環境變數
const AF = express();
AF.use(express.json()); //回應能使用json格式
AF.use(logger("dev")); //顯示呼叫的api在console畫面

const CM_Addr = path.CreateManagement;
const DM_Addr = path.DataManagement;
var usrAddr = new Map();
var current_user = 0;
var category;

//創建使用者
const create = async (req, res) => {
    const { id, password, kind } = req.query
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
        res.json(txn_data)
    }
    catch (e) {
        res.json("創建失敗");
    }

}

//使用者登入
const login = async (req, res) => {
    const { id, password } = req.query;
    const web3 = await connect_to_web3();
    const accounts = await web3.eth.getAccounts();
    const contract = await getContractInstance(web3, CreateManagement.abi, CM_Addr);
    const loggin = await contract_call(contract, 'login', [id, password], {
        from: accounts[0],
        gas: 6000000,
    })
    let kind = await contract_call(contract, 'get_category', [id], {
        from: accounts[0],
        gas: 6000000,
    })
    let transferkind = bytes32_to_string(kind);
    current_user = id;
    category = transferkind;
    console.log(category);
    res.json(loggin);
}
//設定使用者基本資料
const updateAccount = async (req, res) => {
    const { ID_OR_companyNumber, email, tel, charger } = req.query;
    const web3 = await connect_to_web3();
    const accounts = await web3.eth.getAccounts();
    const contract = await getContractInstance(web3, CreateManagement.abi, CM_Addr);
    const useradddr = usrAddr.get(current_user);
    try {
        const update = await contract_send(contract, 'update_user_account', [useradddr, ID_OR_companyNumber, email, tel, charger], {
            from: accounts[1],
            gas: 6000000,
        })
        res.json(update);
    }
    catch (e) {
        res.json("創建失敗!");
    }

}
//取得使用者基本資料
const get_AccountInfo = async (req, res) => {
    const { } = req.query;
    const web3 = await connect_to_web3();
    const accounts = await web3.eth.getAccounts();
    const contract = await getContractInstance(web3, CreateManagement.abi, CM_Addr);
    const useradddr = usrAddr.get(current_user);
    if (category === "Enterprise") {
        const Einfo = await contract_call(contract, 'get_Enterprise_account', [useradddr], {
            from: accounts[0],
            gas: 6000000,
        })
        res.json(Einfo);
    }
    else if (category === "Funder") {
        const Finfo = await contract_call(contract, 'get_Funder_account', [useradddr], {
            from: accounts[0],
            gas: 6000000,
        })
        res.json(Finfo);
    }

}
//輸入企業方投資專案資料
const set_ProjectData = async (req, res) => {
    if (category === "Enterprise") {
        const { eventnumber, project_Name, project_Indtroduce, project_Endday, Target_Amount, interest_Return } = req.query;
        const web3 = await connect_to_web3();
        const accounts = await web3.eth.getAccounts();
        const contract = await getContractInstance(web3, DataManagement.abi, DM_Addr);
        const result = await contract_send(contract, 'set_ProjectData', [current_user, eventnumber, project_Name, project_Indtroduce, project_Endday, Target_Amount, interest_Return], {
            from: accounts[0],
            gas: 6000000,
        })
        res.json(result);
    }
    else {
        res.json("身分別無效");
    }
    console.log("身分為: "+category);
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
    res.json(result);
}

//輸入投資方投資資料
const set_FundertData = async (req, res) => {
    if (category === "Funder") {
        const { investment_number, investment_Duration, investment_Amount, investment_Return } = req.query;
        const web3 = await connect_to_web3();
        const accounts = await web3.eth.getAccounts();
        const contract = await getContractInstance(web3, DataManagement.abi, DM_Addr);
        const result = await contract_send(contract, 'set_FundertData', [current_user, investment_number, investment_Duration, investment_Return, investment_Amount], {
            from: accounts[0],
            gas: 6000000,
        })
        res.json(result);
    }
    else{
        res.json("身分別錯誤")
    }
    concole.log("身分為: "+category);
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
    res.json(result);
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

//取得匹配資料
const get_MatchingData = async (req, res) => {
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
    let newdate = bytes32_to_string(result["1"]);
    res.json({
        userID: newresult,
        investment_Duration: newdate,
        investment_Return: result["2"],
        investment_Amount: result["3"]

    });
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

const get_TXNEnterpriserWallet = async (req, res) => {
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
    res.json({
        userID: newresult,
        project_name: result["1"],
        Target_amount: result["2"],
        interest_rate: result["3"],
        current_amount: result["4"],
        interest_payable: result["5"]
    });
}

const get_TXNFunderWallet = async (req, res) => {
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
    let newresult = bytes32_to_string(result["0"]);
    res.json({
        userID: newresult,
        investment_Return: result["1"],
        investment_amount: result["2"],
        current_money: result["3"],
        interest_receivable: result["4"],
    });
}

AF.post('/create', create); //創建帳號
AF.get('/login', login);    //登入
AF.post('/updateAccount', updateAccount);       //輸入個人資料
AF.get('/get_AccountInfo', get_AccountInfo);    //取得個人資料
AF.post('/set_ProjectData', set_ProjectData);   //輸入被投資專案資料
AF.get('/get_UniqueProjectData', get_UniqueProjectData);    //取得特定被投資專案資料
AF.get('/getAllProjectData', getAllProjectData);    //取得所有被投資專案資料
AF.post('/set_FundertData', set_FundertData);       //輸入投資者欲投資資料
AF.get('/get_UniqueFunderData', get_UniqueFunderData);      //取得特定投資者欲投資資料
AF.get('/get_allFunderData', get_allFunderData);            //取得所有投資者欲投資資料
AF.post('/matching', matching);         //進行匹配
AF.get('/get_MatchingData', get_MatchingData);      //取得匹配成功資料
AF.get('/get_counted', get_counted);    //計算匹配次數
AF.post('/set_txn', set_txn);           //交易開始
AF.get('/get_TXNEnterpriserWallet', get_TXNEnterpriserWallet);  //取得交易完成後企業方金額帳目
AF.get('/get_TXNFunderWallet', get_TXNFunderWallet);            //取得交易完成後投資方金額帳目



AF.listen(process.env.LISTENING_PORT, () => {
    console.log(`AF listening at http://localhost:${process.env.LISTENING_PORT}`);
});


