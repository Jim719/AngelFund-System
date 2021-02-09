const Migrations = artifacts.require("Migrations");
const CreateManagement = artifacts.require("CreateManagement");
const User = artifacts.require("User");
const DataManagement = artifacts.require("DataManagement");
const Transaction = artifacts.require("Transaction");

var file_path = `${__dirname}/../path.json`;
var path = require(file_path);
var fs = require("fs");

module.exports = function (deployer) {
  var CM,DM;
  deployer.deploy(Migrations);
  deployer
    .then(function() {
      return deployer.deploy(CreateManagement);
    })
    .then(function(contract) {
      CM = contract.address;
      path.CreateManagement = CM;
      return deployer.deploy(DataManagement);
    })
    .then(function(contract){
      DM = contract.address;
      path.DataManagement = DM;

      fs.writeFile(file_path, JSON.stringify(path, null, 2), function (err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(path));
        console.log("writing to " + file_path);
      });

    })

};
