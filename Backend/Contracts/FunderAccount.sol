// SPDX-License-Identifier: MIT
pragma solidity >=0.5.22 <0.9.0;
import "./user.sol";
import "./Account.sol";
contract FunderAccount is Account {
    string ID_number;
    string email_addr;
    string tel_num;
    string currentAddress;
    

    function set_info(string memory IDnum,string memory e_addr ,string memory tel,string memory CurrentAddr)public override(Account){ //設定使用者資訊
        ID_number=IDnum;
        email_addr=e_addr;
        tel_num=tel;
        currentAddress=CurrentAddr;
    }
    function get_info_idnum()public view returns(string memory){
       return ID_number;
    }
    function get_info_emailAddr()public view returns(string memory){
       return email_addr;
    }
    function get_info_telNum()public view returns(string memory){
       return tel_num;
    }
    function get_info_currentAddress()public view returns(string memory){
       return currentAddress;
    }
    

    
}