# eth-local-wallet

A lightweight ethereumjs-wallet implementation that makes creating a local Ethereum wallet easy and safe!

## Installation

Use the package manager [npm](https://npmjs.org) to install eth-local-wallet.

```bash
npm install eth-local-wallet
```

## Example
Dapps need wallets to interface with the UI. However, not every client has access to the Metamask browser extension, nor do many know how to set one up. This module uses ethereumjs-wallet to setup up a local wallet that could be used inside the browser and can also be safely stored inside localStorage.

``` node
const Wallet = require('eth-local-wallet');

(async() => {
    // 0. initiates new wallet
    const localWallet = new Wallet();

    // 1. safely export wallet with password encryption
    let password = '12345678';
    let secureWallet = await localWallet.exportWallet(password);

    // 2. import wallet. Overides existing localwallet variables
    await localWallet.importWallet(secureWallet, password);

    console.log(localWallet.publicKey); //0xa782f......
    console.log(localWallet.privateKey); //0x5fd4......

    // 3. adhoc generate public, private, and wallet instance parameters. This does NOT override existing localwallet variables
    let {publicKey, privateKey, instance} = localWallet.generate();
})();
```

## methods


##### `localWallet`.importWallet(secureWallet<wallet/string>, password<string>);
Extracts and mounts imported wallet params to `localWallet`

##### `localWallet`.exportWallet(password);
Returns encrypted wallet

##### `localWallet`.generate();
Returns new wallet

# license

MIT,
