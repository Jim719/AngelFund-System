// SPDX-License-Identifier: MIT
pragma solidity >=0.5.22 <0.9.0;
import "./user.sol";
import "./Account.sol";
contract EnterpriseAccount is Account{
    string company_code;
    string email_addr;
    string tel_num;
    string chairman;
    

    function set_info(string memory c_code,string memory e_addr ,string memory tel,string memory charge)public override(Account){ //設定使用者資訊
        company_code=c_code;
        email_addr=e_addr;
        tel_num=tel;
        chairman=charge;
    }
    function get_info_CompanyCode()public view returns(string memory){
       return company_code;
    }
    function get_info_emailAddr()public view returns(string memory){
       return email_addr;
    }
    function get_info_telNum()public view returns(string memory){
       return tel_num;
    }
    function get_info_chairman()public view returns(string memory){
       return chairman;
    }
    
    

    
    
}