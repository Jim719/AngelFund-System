// SPDX-License-Identifier: MIT
pragma solidity >=0.5.22 <0.9.0;
import "./ProjectData.sol";
import "./FunderData.sol";
import "./DataManagement.sol";

contract Transaction{
    bytes32 Enter_id;
    bytes32 Funder_id;
    address DM_addr;
    Enterprise_wallet ew;
    DataManagement DM;
    Funder_wallet fw;
    
    constructor(bytes32 enter_id,bytes32 funder_id,address addr)public{
         Enter_id = enter_id;
         Funder_id = funder_id;
         DM_addr = addr;
         DM = DataManagement(DM_addr);
    }
    struct Funder_wallet{
        bytes32 Funder_ID;
        uint256 investment_return;
        uint256 investment_amount;
        uint256 current_money;
        uint256 interest_receivable;
    }
    
    struct Enterprise_wallet{
        bytes32 Enter_id;
        string project_name;
        uint256 Target_amount;
        uint256 interest_return;
        uint256 current_amount;
        uint256 interest_payable;
    }
    
    function Txn()public { //執行交易，進行資金利息轉移
        bytes32 funderuserID;
        uint256 investment_return;
        uint256 investment_amount;
        (funderuserID,investment_return,investment_amount) = DM.get_MatchingData(Enter_id);
        fw = Funder_wallet(funderuserID,investment_return,investment_amount,0,0);
        
        string memory convertuserID;
        uint8 i = 0;
        while(i < 32 && Enter_id[i] != 0) {
            i++;
        }
        bytes memory bytesArray = new bytes(i);
        for (i = 0; i < 32 && Enter_id[i] != 0; i++) {
            bytesArray[i] = Enter_id[i];
        }
        convertuserID = string(bytesArray);
        
        string memory project_name;
        uint256 Target_amount;
        uint256 interest_return;
        (project_name,,,Target_amount,interest_return) = DM.get_UniqueProjectData(convertuserID,"1");
        ew = Enterprise_wallet(Enter_id,project_name,Target_amount,interest_return,0,0);
        
        fw.current_money = fw.investment_amount - ew.Target_amount;
        fw.interest_receivable = (ew.interest_return * ew.Target_amount)/100;
        ew.current_amount = ew.Target_amount;
        ew.interest_payable = (ew.interest_return * ew.Target_amount)/100;
    }
    
    function get_unterID()public view returns(bytes32){
        return Enter_id;
    }
    
    function get_FunderWallet()public view returns(bytes32,uint256,uint256,uint256,uint256){
        return(fw.Funder_ID,fw.investment_return,fw.investment_amount,fw.current_money,fw.interest_receivable);
    }
    
    function get_EnterpriseWallet()public view returns(bytes32,string memory,uint256,uint256,uint256,uint256){
        return(ew.Enter_id,ew.project_name,ew.Target_amount,ew.interest_return,ew.current_amount,ew.interest_payable);
    }
}