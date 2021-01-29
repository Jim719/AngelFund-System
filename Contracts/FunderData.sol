// SPDX-License-Identifier: MIT
pragma solidity >=0.5.22 <0.9.0;
import "./user.sol";

contract FunderData{
    mapping(string=>mapping(string=>Funder_Data))public  funder_f;
    Funder_Data[] public Funder_event;
    struct Funder_Data{
        string userID;
        string investment_duration;
        uint256 investment_return;
        uint256 investment_amount;
        uint256 statement;
    }
    
    function set_funding(string memory id,string memory investment_number,string memory investment_Duration,uint256 investment_Return,uint256 investment_Amount)public{
        funder_f[id][investment_number]=Funder_Data(id,investment_Duration,investment_Return,investment_Amount,1);
        Funder_event.push(Funder_Data(id,investment_Duration,investment_Return,investment_Amount,1));
        
    }
    
    function get_funding(string memory id ,string memory investment_number)public view returns(string memory,string memory,uint256,uint256,uint256){
       Funder_Data memory fd = funder_f[id][investment_number];
        return(fd.userID,fd.investment_duration,fd.investment_return,fd.investment_amount,fd.statement);
    }
    
    function get_allfundig()public view returns(bytes32[] memory,bytes32[] memory,uint256[] memory,uint256[] memory,uint256[] memory){
        bytes32[] memory ids= new  bytes32[](Funder_event.length); 
        bytes32[] memory duration= new  bytes32[](Funder_event.length);
        uint256[] memory i_returns = new  uint256[](Funder_event.length);
        uint256[] memory i_amounts = new  uint256[](Funder_event.length);
        uint256[] memory statements = new  uint256[](Funder_event.length);
        
         for(uint256 i=0 ; i<Funder_event.length ; i++){
            bytes32 pa;
            string memory n=Funder_event[i].investment_duration;
            assembly {
                pa := mload(add(n, 32)) //String轉bytes32
            }
            
            bytes32 idd;
            string memory d=Funder_event[i].userID;
            assembly {
                idd := mload(add(d, 32)) //String轉bytes32
            }
            ids[i] = idd;
            duration[i] = pa;
            i_returns[i] = Funder_event[i].investment_return;
            i_amounts[i] = Funder_event[i].investment_amount;
            statements[i] = Funder_event[i].statement;
         }
        
        return(ids,duration,i_returns,i_amounts,statements);
        
    }
    // function getdata_count()public view returns(uint256){
    //     uint256 count = Funder_event.length;
    //     return count;
    // }
}