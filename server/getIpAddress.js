const fs = require("fs");
const { networkInterfaces } = require("os");

const interfaces = networkInterfaces();
const { address } = interfaces.Ethernet.find(({ family }) => family === 'IPv4');

function getIPAddress() {
    return address;
};

module.exports = getIPAddress;
