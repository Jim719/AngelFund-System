import web3 from "web3";
//取得合約實體
export const getContractInstance = async (web3, contractABI, address) => {
	const networkId = await web3.eth.net.getId(); // 取得區塊鏈網路ID
	const deployedAddress = address; //取得合約發布地址

	// 建立合約實體
	const instance = new web3.eth.Contract(contractABI, deployedAddress);
	return instance;
};

//呼叫合約call
export const contract_call = async (contract, method, params = [], options = {}) => {
	try {
		let result = await contract.methods[method](...params).call(options);
		return result;
	} catch (error) {
		console.log(error);
		return false;
	}
};

//呼叫合約send
export const contract_send = async (contract, method, params, options = {}) => {
	try {
		let result = await contract.methods[method](...params).send(options);
		return result;
	} catch (error) {
		console.log(error);
		return false;
	}
};
//字元轉換string_to_bytes32
export const string_to_bytes32 = (s) => {
	let s_hex = web3.utils.stringToHex(s);
	let s_bytes = web3.utils.padRight(s_hex, 64); // ? 0x0000....共補滿(32*2)-2個位元
	return s_bytes;
};
//字元轉換bytes32_to_string
export const bytes32_to_string = (b) => {
	let b_string = web3.utils.hexToString(b);
	return b_string;
};