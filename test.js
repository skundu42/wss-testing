const assert = require('assert');
const { ethers} = require('ethers');

const provider = new ethers.providers.WebSocketProvider("");

const MyContract = require('./artifacts/contracts/MyContract.sol/MyContract.json');

describe('Commom WebSocket Tests', function () {
    it('Should establish a WebSocket connection', async function () {
        assert.ok(provider.connection.url);
    });

    it('Should listen for blocks', function (done) {
        provider.on("block", (blockNumber) => {
            
            assert.ok(blockNumber);
            provider.removeAllListeners("block");
            done();
        });
        this.timeout(100000);
    });

    it('Should listen for transactions', function (done) {
        const transactionHash = "0xae0593ba44f5798c7109101cfd24f94b7492b2d9976d20613fe7a7bf9ef94347";
        provider.once(transactionHash, (transaction) => {
            assert.ok(transaction);
            done();
        });
        this.timeout(100000);
    });

    it('Should listen for transaction confirmations', function (done) {
        this.timeout(10000); 

        const transactionHash = "0xae0593ba44f5798c7109101cfd24f94b7492b2d9976d20613fe7a7bf9ef94347";
        provider.once(transactionHash, (numConfirmations) => {
            assert.ok(numConfirmations);
            done();
        });
        this.timeout(100000);
    });

    describe('Get Balance Test', () => {
        it('should get the balance of an address', async () => {
          const balance = await provider.getBalance('0x245E2395712F888CeD1033C924115105dC32e388');
          assert(ethers.utils.formatEther(balance) >= 0);
        });
        this.timeout(100000);
      });

      describe('Get Transaction Receipt Test', () => {
        it('should get the transaction receipt', async () => {
          const receipt = await provider.getTransactionReceipt('0xae0593ba44f5798c7109101cfd24f94b7492b2d9976d20613fe7a7bf9ef94347');
          assert(receipt && receipt.transactionHash === '0xae0593ba44f5798c7109101cfd24f94b7492b2d9976d20613fe7a7bf9ef94347');
        });
      });

      describe('Get Gas Price Test', () => {
        it('should get the current gas price', async () => {
          const gasPrice = await provider.getGasPrice();
          assert(ethers.utils.formatEther(gasPrice) > 0);
        });
      });

});
