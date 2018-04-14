const interfaces = require('os').networkInterfaces();
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});
let config = require('../config.json');
const interfaceAddresses = {};
const interfaceIndexPattern = /\[?(\d)]?/g;

const constructPromise = (func) => {
  return () => new Promise(func);
};

const getInterfaceAddress = (resolve) => {
  // Find all appropriate interfaces with their addresses
  Object.keys(interfaces).forEach((interfaceName) => {
    let alias = 0;

    interfaces[interfaceName].forEach((iface) => {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }

      if (alias < 1) {
        interfaceAddresses[interfaceName] = iface.address;
      }

      ++alias;
    });
  });

  // If interface name has already been configured earlier, return the appropriate address
  if (config.chosenInterfaceName){
    console.log("Using pre-selected interface:", config.chosenInterfaceName);
    resolve(interfaceAddresses[config.chosenInterfaceName]);
    return;
  }

  // If interface has not been selected, prompt to select one
  Object.keys(interfaceAddresses).forEach((interfaceName, index) => {
    console.log(`[${index}] ${interfaceName}`);
  });
  rl.question("Choose the interface [index]: ", (chosenIndex) => {
    chosenIndex = Number(interfaceIndexPattern.exec(chosenIndex)[1]);
    const chosenInterfaceName = Object.keys(interfaceAddresses)[chosenIndex];
    if(!chosenInterfaceName){
      console.log("Invalid interface index provided");
      process.exit();
    }
    config = {chosenInterfaceName};
    fs.writeFile('./config.json', JSON.stringify(config), () => {}); // Update config file
    rl.close();
    resolve(interfaceAddresses[config.chosenInterfaceName]);
  });
};

module.exports = constructPromise(getInterfaceAddress);