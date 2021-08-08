// SPDX-License-Identifier: MIT
pragma solidity >=0.5.22 <0.9.0;
abstract contract Account{
    function set_info(string memory IDnum,string memory e_addr ,string memory tel,string memory CurrentAddr)public virtual;
    
}
