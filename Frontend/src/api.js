import axios from "axios";

export const test_serverAddress = "localhost:3000";
export const baseURL = `http://${test_serverAddress}`;
const request = axios.create({ baseURL: `${baseURL}`, withCredentials: true });

//帳號
export const apiCreate = () => request.post("/create");//創建帳號
export const apiLogin = () => request.get("/login");//登入帳號

//個人資料
export const api_UpdateAccount = () => request.post("/updateAccount");//個人資料輸入
export const api_GetAccountInfo = () => request.get("/get_AccountInfo");//個人資料取得

//投資資料
export const api_SetProjectData = () => request.post("/set_ProjectData");//企業方資料輸入
export const api_GetUniqueProjectData = () => request.get("/get_UniqueProjectData");//取得特定被投資專案資料
export const api_GetAllProjectData = () => request.get("/getAllProjectData");//取得所有被投資專案資料
export const api_SetFundertData = () => request.post("/set_FundertData");//輸入投資者欲投資資料
export const api_GetUniqueFunderData = () => request.get("/get_UniqueFunderData");//取得特定投資者欲投資資料
export const api_GetallFunderData = () => request.get("/get_allFunderData");//取得所有投資者欲投資資料

//匹配
export const api_Matching = () => request.post("/matching");//進行匹配
export const api_GetMatchingData = () => request.get("/get_MatchingData");//取得匹配成功資料
export const api_GetInvMatchingData = () => request.get("/get_InvMatchingData");//取得匹配成功資料
export const api_GetCounted = () => request.get("/get_counted");//取得匹配成功資料

//交易
export const api_Settxn= () => request.get("/set_txn");//交易開始
export const api_GetTXNEnterpriserWallet = () => request.get("/get_TXNEnterpriserWallet");//取得交易完成後企業方金額帳目
export const api_GetTXNFunderWallet = () => request.get("/get_TXNFunderWallet");//取得交易完成後投資方金額帳目
