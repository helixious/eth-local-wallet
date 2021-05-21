const {default : Wallet} = require('ethereumjs-wallet');

module.exports = class LocalWallet {
    constructor() {
        const {instance, publicKey, privateKey} = this.generate();
        this.instance = instance;
        this.publicKey = publicKey;
        this.privateKey = privateKey;
    }
    generate() {
        let instance = Wallet.generate();
        let publicKey = instance.getChecksumAddressString().toLowerCase();
        let privateKey = instance.getPrivateKeyString();
        return {instance, publicKey, privateKey};
    }
    exportWallet = (password) => {
        return new Promise((resolve, reject) => {
            if (!password || typeof password !== 'string') return reject(new Error('missing password | incorrect password format'));
    
            try {
                let secureWallet = this.instance.toV3(password, {
                    kdf: "pbkdf2"
                })
                resolve(secureWallet);
            } catch (e) {
                reject(e);
            }
        })
    }
    importWallet = (secureWallet, password) => {
        return new Promise((resolve, reject) => {
            if((!password || typeof password  !== 'string') && !jsonStore) return reject(new Error('check jsonStore, password parameters'));
            try {
                const instance = Wallet.fromV3(secureWallet, password);
                this.instance = instance;
                resolve(instance);
            } catch(e) {
                reject(e);
            }
        })
    }
}