// SPDX-License-Identifier: MIT
pragma solidity >=0.5.22 <0.9.0;
import "./ProjectData.sol";
import "./FunderData.sol";
import "./user.sol";
import "./Transaction.sol";

contract DataManagement{
    //利用企業戶ID對應到Funder ID,並將Funder 資料利用Struct儲存
     mapping(bytes32 => address) Txn_addr;
    mapping(bytes32 => match_funder) public match_result;
    struct match_funder{
        bytes32 userID;
        bytes32 investment_duration;
        uint256 investment_return;
        uint256 investment_amount;
    }
    ProjectData PD = new ProjectData(); //實體化
    FunderData FD = new FunderData(); //實體化
    address addr_pd = address(PD);
    address addr_fd = address(FD);
    uint counted;
    //輸入企業方投資專案資料
    function set_ProjectData(string memory id,string memory eventnumber,string memory project_Name,string memory project_Indtroduce,string memory project_Endday
    ,uint256 Target_Amount,uint256 interest_Return)public{
        ProjectData pd = ProjectData(addr_pd);
        pd.set_project(id,eventnumber,project_Name,project_Indtroduce,project_Endday,Target_Amount,interest_Return);
    }
    
    //取得特定企業使用者投資專案
    function get_UniqueProjectData(string memory id,string memory eventnumber)public view returns(string memory,string memory,string memory,uint256,uint256){
        ProjectData pd = ProjectData(addr_pd);
        string memory name;
        string memory intro;
        string memory date;
        uint256 t_money;
        uint256 i_returns;
        (name,intro,date,t_money,i_returns)=pd.get_Userproject(id,eventnumber);
        return (name,intro,date,t_money,i_returns);
    }
    //取得所有企業投資專案
    function getAllProjectData()public view returns(bytes32[] memory,bytes32[] memory,bytes32[] memory,bytes32[] memory,uint256[] memory,uint256[] memory){
        ProjectData pd = ProjectData(addr_pd);
        bytes32[] memory idds;
        bytes32[] memory names;
        bytes32[] memory introdecues;
        bytes32[] memory enddays;
        uint256[] memory t_amounts;
        uint256[] memory i_returns;
        
        (idds,names,introdecues,enddays,t_amounts,i_returns)=pd.get_allproject();
        return(idds,names,introdecues,enddays,t_amounts,i_returns);
    }
    
    //輸入投資方投資條件
    function set_FundertData(string memory id,string memory investment_number,string memory investment_Duration,uint256 investment_Return,uint256 investment_Amount)public{
        FunderData fd = FunderData(addr_fd);
        fd.set_funding(id,investment_number,investment_Duration,investment_Return,investment_Amount);
    }
    //取得特定投資方投資條件
    function get_UniqueFunderData(string memory id,string memory investment_number)public view returns(string memory,string memory,uint256,uint256,uint256){
        FunderData fd = FunderData(addr_fd);
        string memory idd;
        string memory duration;
        uint256 benefit;
        uint256 money;
        uint256 statement;
        (idd,duration,benefit,money,statement)=fd.get_funding(id,investment_number);
        return (idd,duration,benefit,money,statement);
    }
    //取得所有投資方投資資料
    function get_allFunderData()public view returns(bytes32[] memory,bytes32[] memory,uint256[] memory,uint256[] memory,uint256[] memory){
        FunderData fd = FunderData(addr_fd);
        bytes32[] memory idds;
        bytes32[] memory duration;
        uint256[] memory payment;
        uint256[] memory i_amounts;
        uint256[] memory statements;
        (idds,duration,payment,i_amounts,statements)=fd.get_allfundig();
        return(idds,duration,payment,i_amounts,statements);
    }
    //Matching以企業專案角度遍歷所有適合的Funder
    function matching()public{
        bytes32[] memory pro_idds;
        uint256[] memory t_amounts;
        uint256[] memory i_returns;
        
        bytes32[] memory fun_idds;
        bytes32[] memory duration;
        uint256[] memory interest;
        uint256[] memory i_amounts;
        uint256[] memory statements;
        uint count;
        (pro_idds,,,,t_amounts,i_returns)=DataManagement.getAllProjectData();
        (fun_idds,duration,interest,i_amounts,statements)=DataManagement.get_allFunderData();
        
        for(uint i = 0 ; i <pro_idds.length ; i++){
            uint256 n = pro_idds.length; 
            for(uint j=0 ; j<fun_idds.length ; j++){ 
                if(interest[j] <= i_returns[i] && i_amounts[j] >= t_amounts[i] && statements[j] != 0){
                    n = j;
                }
            }
            if(n != pro_idds.length){
                match_result[pro_idds[i]] = match_funder(fun_idds[n],duration[n],interest[n],i_amounts[n]);
                statements[n] = 0;
                Transaction Txn = new Transaction(pro_idds[i],fun_idds[n],address(this));
                Txn_addr[pro_idds[i]] = address(Txn);
                count++;
            }
        }
        counted = count;
    }
    // 取得匹配資料
    function get_MatchingData(bytes32  id)public view returns( bytes32 ,bytes32,uint256,uint256) {
        match_funder memory mf = match_result[id];
        return(mf.userID,mf.investment_duration,mf.investment_return,mf.investment_amount);
    }
    
    function get_counted()public view returns(uint){
        return counted;
    }
    // 取得交易合約地址
    function get_Txnaddr(bytes32 enterID)public view returns(address){
        return Txn_addr[enterID];
    }
    // 進行交易function
    function set_txn(address addr)public{
        Transaction txnn= Transaction(addr);
        txnn.Txn();
    }
    // 取得投資方交易後資金狀態
    function get_TXNFunderWallet(address addr)public view returns(bytes32,uint256,uint256,uint256,uint256){
        Transaction txnn= Transaction(addr);
        bytes32 Fiddd;
        uint256 investment_return; 
        uint256 investment_amount; 
        uint256 current_amount; 
        uint256 interest_receivable; 
        (Fiddd,investment_return,investment_amount,current_amount,interest_receivable) = txnn.get_FunderWallet();
        return (Fiddd,investment_return,investment_amount,current_amount,interest_receivable);
    }
    // 取得企業戶交易後資金狀態
    function get_TXNEnterpriserWallet(address addr)public view returns(bytes32,string memory,uint256,uint256,uint256,uint256){
        Transaction txnn= Transaction(addr);
        bytes32 Enter_id;
        string memory project_name;
        uint256 Target_amount;
        uint256 interest_return; 
        uint256 current_amount;
        uint256 interest_payable; 
        (Enter_id,project_name,Target_amount,interest_return,current_amount,interest_payable) = txnn.get_EnterpriseWallet();
        return (Enter_id,project_name,Target_amount,interest_return,current_amount,interest_payable);
    }
}