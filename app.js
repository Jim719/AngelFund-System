import express from "express";
import logger from "morgan";
import { connect_to_web3 } from "./function/web3";
import { getContractInstance, contract_call, contract_send, string_to_bytes32 } from "./function/contract";
import CreateManagement from "./build/contracts/CreateManagement.json";
import DataManagement from "./build/contracts/DataManagement.json";
import path from "./path.json";

require("dotenv").config(); //環境變數
const app = express();
app.use(express.json()); //回應能使用json格式
app.use(logger("dev")); //顯示呼叫的api在console畫面

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
    let loggin = await contract_call(contract, 'login', [id, password], {
        from: accounts[0],
        gas: 6000000,
    })
    current_user = id;
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
    const {} = req.query;
    const web3 = await connect_to_web3();
    const accounts = await web3.eth.getAccounts();
    const contract = await getContractInstance(web3, DataManagement.abi, DM_Addr);
    const result = await contract_call(contract, 'getAllProjectData', [], {
        from: accounts[0],
        gas: 6000000,
    })
    res.json(result);
}

//輸入投資方投資資料
const set_FundertData = async (req, res) => {
    const { investment_number,investment_Duration,investment_Amount ,investment_Return} = req.query;
    const web3 = await connect_to_web3();
    const accounts = await web3.eth.getAccounts();
    const contract = await getContractInstance(web3, DataManagement.abi, DM_Addr);
    const result = await contract_send(contract, 'set_FundertData', [current_user,investment_number,investment_Duration,investment_Return,investment_Amount], {
        from: accounts[0],
        gas: 6000000,
    })
    res.json(result);
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
    const {} = req.query;
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
    const {} = req.query;
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
    const {} = req.query;
    const web3 = await connect_to_web3();
    const accounts = await web3.eth.getAccounts();
    const contract = await getContractInstance(web3, DataManagement.abi, DM_Addr);
    const uid = string_to_bytes32(current_user);
    const result = await contract_call(contract, 'get_MatchingData', [uid], {
        from: accounts[0],
        gas: 6000000,
    })
    res.json(result);
}

const get_counted = async (req, res) => {
    const {} = req.query;
    const web3 = await connect_to_web3();
    const accounts = await web3.eth.getAccounts();
    const contract = await getContractInstance(web3, DataManagement.abi, DM_Addr);
    const result = await contract_call(contract, 'get_counted', [], {
        from: accounts[0],
        gas: 6000000,
    })
    res.json(result);
}




app.post('/create', create);
app.get('/login', login);
app.post('/updateAccount', updateAccount);
app.get('/get_AccountInfo', get_AccountInfo);
app.post('/set_ProjectData', set_ProjectData);
app.get('/get_UniqueProjectData', get_UniqueProjectData);
app.get('/getAllProjectData', getAllProjectData);
app.post('/set_FundertData', set_FundertData);
app.get('/get_UniqueFunderData', get_UniqueFunderData);
app.get('/get_allFunderData', get_allFunderData);
app.post('/matching', matching);
app.get('/get_MatchingData', get_MatchingData);
app.get('/get_counted', get_counted);

app.listen(process.env.LISTENING_PORT, () => {
    console.log(`App listening at http://localhost:${process.env.LISTENING_PORT}`);
});


