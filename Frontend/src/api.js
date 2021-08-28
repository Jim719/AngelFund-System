import axios from "axios";

export const test_serverAddress = "localhost:5000";
export const baseURL = `http://${test_serverAddress}`;
const request = axios.create({ baseURL: `${baseURL}`, withCredentials: true });

//帳號
export const apiCreate = (data) => request.post("/create",data);//創建帳號
export const apiLogin = (data) => request.post("/login",data);//登入帳號
export const api_GetUserName = () => request.get("/UserName");//登入帳號

//個人資料
export const api_UpdateAccount = (data) => request.post("/updateAccount",data);//個人資料輸入
export const api_GetAccountInfo = () => request.get("/get_AccountInfo");//個人資料取得

//投資資料
export const api_SetProjectData = (data) => request.post("/set_ProjectData",data);//企業方資料輸入
export const api_GetUniqueProjectData = () => request.get("/get_UniqueProjectData");//取得特定被投資專案資料
export const api_GetAllProjectData = () => request.get("/getAllProjectData");//取得所有被投資專案資料
export const api_SetFundertData = (data) => request.post("/set_FundertData",data);//輸入投資者欲投資資料
export const api_GetUniqueFunderData = () => request.get("/get_UniqueFunderData");//取得特定投資者欲投資資料
export const api_GetallFunderData = () => request.get("/get_allFunderData");//取得所有投資者欲投資資料

//匹配
export const api_Matching = () => request.post("/matching");//進行匹配
export const api_GetMatchingData = () => request.get("/get_MatchingData");//取得匹配成功資料
export const api_GetInvMatchingData = () => request.get("/get_InvMatchingData");//取得匹配成功資料
export const api_GetCounted = () => request.get("/get_counted");//取得匹配成功資料
export const api_GetDBMatchingData = () => request.get("/Get_DBMatchingData");//取得匹配成功資料
export const api_GetDBInvMatchingData = () => request.get("/Get_DBInvMatchingData");//取得匹配成功資料

//交易
export const api_Settxn= () => request.post("/set_txn");//交易開始
export const api_GetTXNEnterpriserWallet = () => request.get("/get_TXNEnterpriserWallet");//取得交易完成後企業方金額帳目
export const api_GetTXNFunderWallet = () => request.get("/get_TXNFunderWallet");//取得交易完成後投資方金額帳目
export const api_GetFunTxndata = () => request.get("/GetFunTxndata");//取得交易完成後投資方資料庫金額帳目
export const api_GetProTxndata = () => request.get("/GetProTxndata");//取得交易完成後企業方資料庫金額帳目
