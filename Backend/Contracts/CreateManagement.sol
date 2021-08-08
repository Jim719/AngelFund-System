// SPDX-License-Identifier: MIT
pragma solidity >=0.5.22 <0.9.0;
import "./user.sol";
import "./EnterpriseAccount.sol";
import "./FunderAccount.sol";
import "./Account.sol";
import "./ProjectData.sol";
import "./FunderData.sol";
import "./DataManagement.sol";

contract CreateManagement{
    string _uid;
    // ProjectData PD = new ProjectData(); //實體化
    // FunderData FD = new FunderData(); //實體化
  
    // address public addr_pd = address(PD);
    // address public addr_fd = address(FD);
    
    address public whataddr;
    bytes32 Category;
    mapping(string => address) users;   //利用ID找尋使用者位址
    function create_user(string memory userid, string memory password,string memory kind) public { //取創建使用者
        bytes32 uid;
        bytes32 psd;
        bytes32 category;
        _uid=userid;
        assembly {
            uid := mload(add(userid, 32)) //String轉bytes32
        }
        assembly {
            psd := mload(add(password, 32)) //String轉bytes32
        }
        assembly {
            category := mload(add(kind, 32)) //String轉bytes32
        }
        
        if(keccak256(abi.encodePacked(kind)) == keccak256(abi.encodePacked("Enterprise"))){
            EnterpriseAccount uc = new EnterpriseAccount(); //實體化
            User u = new User(uid, psd, address(uc),category);   //實體化並傳入參數
            users[userid]=address(u);   //將user地址傳入mapping
            
        }
        else if(keccak256(abi.encodePacked(kind)) == keccak256(abi.encodePacked("Funder"))){
            FunderAccount Fuc = new FunderAccount(); //實體化
            User u = new User(uid, psd, address(Fuc),category);   //實體化並傳入參數
            users[userid]=address(u);   //將user地址傳入mapping
        }
    }
    
    function get_add(string memory Userid )public view returns(address){    //取地址陣列
        return users[Userid];
    }
    
    function update_user_account(address user_addr,string memory ID_OR_companyNumber,string memory e_addr ,string memory tel,string memory charger) public {
        User u = User(user_addr);   //取得User地址
        address ac_addr = u.get_account();  //取得Useraccount地址
        Account uc = Account(ac_addr);  //利用指定user位址做動作
        uc.set_info(ID_OR_companyNumber,e_addr ,tel,charger);
    }
    
    function get_Enterprise_account(address user_addr) public view returns(bytes32,bytes32,string memory,string memory,string memory,string memory){
        User u = User(user_addr);   //取得User地址
        address ac_addr = u.get_account();  //取得Useraccount地址
        EnterpriseAccount uc = EnterpriseAccount(ac_addr);  //利用指定user位址做動作
        string memory Ccode = uc.get_info_CompanyCode();    //取資料
        string memory E_addr= uc.get_info_emailAddr();
        string memory telnum= uc.get_info_telNum();
        string memory charge= uc.get_info_chairman();
        
        bytes32 id=u.get_userid();
        bytes32 pasd=u.get_password();
        
        return(id,pasd,Ccode,E_addr,telnum,charge);
    }
    
    function get_Funder_account(address user_addr) public view returns(bytes32,bytes32,string memory,string memory,string memory,string memory){
        User u = User(user_addr);   //取得User地址
        address ac_addr = u.get_account();  //取得Useraccount地址
        FunderAccount Fuc = FunderAccount(ac_addr);  //利用指定user位址做動作
        string memory idnum = Fuc.get_info_idnum();    //取資料
        string memory E_addr= Fuc.get_info_emailAddr();
        string memory telnum= Fuc.get_info_telNum();
        string memory currtAddr= Fuc.get_info_currentAddress();
        
        bytes32 id=u.get_userid();
        bytes32 pasd=u.get_password();
        
        return(id,pasd,idnum,E_addr,telnum,currtAddr);
    }
    
    function login(string memory userid,string memory password )public view returns(string memory){
        address addr=users[userid];
        User u = User(addr);
        bytes32 U_psd=u.get_password();
        bytes memory tempEmptyStringTest = bytes(password);
        bytes32 Psd;
        if (tempEmptyStringTest.length == 0) {
            Psd = 0x0;
        }

        assembly {
            Psd := mload(add(password, 32)) //String轉bytes32
        }
        
        if(keccak256(abi.encodePacked(U_psd)) == keccak256(abi.encodePacked(Psd))){
            return "login success";
        }
        else{
            return"login fail";
        }
    }
    
   function get_category(string memory userid)public view returns(bytes32){
        address addr=users[userid];
        User u = User(addr);
        bytes32 kind = u.get_category();
        return kind;
    }
    
    
    
}