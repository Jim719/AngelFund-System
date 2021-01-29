// SPDX-License-Identifier: MIT
pragma solidity >=0.5.22 <0.9.0;
import "./user.sol";

contract ProjectData{
    Project_Data [] public Investment_event;
    mapping(string=>mapping(string=>Project_Data))public Investment_Project;
    
    struct Project_Data{
        string userID;
        string project_name;
        string project_indtroduce;
        string project_endday;
        uint256 Target_amount;
        uint256 interest_return;
    }
    
    function set_project(string memory id,string memory eventnumber,string memory project_Name,string memory project_Indtroduce,string memory project_Endday
    ,uint256 Target_Amount,uint256 interest_Return)public{
        Investment_Project[id][eventnumber] = Project_Data(id,project_Name , project_Indtroduce , project_Endday , Target_Amount , interest_Return);
        Investment_event.push(Project_Data(id,project_Name , project_Indtroduce , project_Endday , Target_Amount , interest_Return)) ;
    }
    
    function get_Userproject(string memory id,string memory eventnumber)public view returns(string memory,string memory,string memory,uint256,uint256){
        Project_Data memory pd = Investment_Project[id][eventnumber];
        return(pd.project_name,pd.project_indtroduce,pd.project_endday,pd.Target_amount,pd.interest_return);
    }
    
    function get_allproject() public view returns(bytes32[] memory,bytes32[] memory,bytes32[] memory,bytes32[] memory,uint256[] memory,uint256[] memory){
        bytes32[] memory idds = new  bytes32[](Investment_event.length);
        bytes32[] memory names = new  bytes32[](Investment_event.length);
        bytes32[] memory introdecues = new  bytes32[](Investment_event.length);
        bytes32[] memory enddays = new  bytes32[](Investment_event.length);
        uint256[] memory t_amounts = new  uint256[](Investment_event.length);
        uint256[] memory i_returns = new  uint256[](Investment_event.length);

        for(uint256 i=0 ; i<Investment_event.length ; i++){
            bytes32 na;
            bytes32 intro;
            bytes32 day;
            bytes32 idd;
            string memory n=Investment_event[i].project_name;
            assembly {
                na := mload(add(n, 32)) //String轉bytes32
            }
            
            string memory I=Investment_event[i].project_indtroduce;
            assembly {
                intro := mload(add(I, 32)) //String轉bytes32
            }
            string memory d=Investment_event[i].project_endday;
            assembly {
                day := mload(add(d, 32)) //String轉bytes32
            }
            string memory l=Investment_event[i].userID;
            assembly {
                idd := mload(add(l, 32)) //String轉bytes32
            }
            idds[i] = idd;
            names[i] = na;
            introdecues[i] = intro;
            enddays[i] = day;
            t_amounts[i] = Investment_event[i].Target_amount;
            i_returns[i] = Investment_event[i].interest_return;
        }
        
        return (idds,names,introdecues,enddays,t_amounts,i_returns);
    }
    
    // function getpro_count()public view returns(uint256){
    //     uint256 count = Investment_event.length;
    //     return count;
    // }
}