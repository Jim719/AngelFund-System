// SPDX-License-Identifier: MIT
pragma solidity >=0.5.22 <0.9.0;

contract User {
	address public infoAccount;
	address public PDFD_Account;
    bytes32 userid;
    bytes32 password;
    bytes32 category;
    

	constructor(bytes32 uid,bytes32 psd, address ac,bytes32 kind) public{
		userid=uid;
		password=psd;
		infoAccount=ac;
		category=kind;
	}

    function set_userid(string memory Id) public { //使用者帳號註冊
        bytes memory tempEmptyStringTest = bytes(Id);
        bytes32 idd;
        if (tempEmptyStringTest.length == 0) {
            idd = 0x0;
        }

        assembly {
            idd := mload(add(Id, 32)) //String轉bytes32
        }
        userid = idd;
    }

    function set_password(string memory Pword) public { //使用者密碼註冊
        bytes memory tempEmptyStringTest = bytes(Pword);
        bytes32 psd;
        if (tempEmptyStringTest.length == 0) {
            psd = 0x0;
        }

        assembly {
            psd := mload(add(Pword, 32)) //String轉bytes32
        }
        password = psd;
    }

    function get_password() public view returns (bytes32 psd) { //取密碼
        return password;
    }

    function get_userid() public view returns (bytes32) {   //取帳號
        return userid;
    }
    
    function get_account() public view returns (address) {  //取帳戶地址
        return infoAccount;
    }
    function get_category() public view returns (bytes32) {  //取帳戶地址
        return category;
    }
    // function get_PDFD_Account() public view returns (address) {  //取帳戶地址
    //     return PDFD_Account;
    // }

}
