const express = require('express');
const web3 = require('web3');

const Wallet = require('../models/wallets');
const axios = require('../config/axiosConfig');


const router = express.Router();

router.post('/addWallet', async (req, res) => {
    const { walletAddress } = req.body;

    try {
        // check if wallet already exists
        let wallet = await Wallet.findOne({ address: walletAddress })

        if (wallet) {
            return res.status(400).json({ msg: 'Wallet already added' });
        }

        // if wallet doesn't exist add to database and save current wallet data
        const es = await axios.get('', {
            params: {
                module: 'account',
                action: 'balance',
                address: walletAddress,
                tag: 'latest',
                apikey: process.env.ETHERSCAN_APIKEY  
            }
        });

        // if issue getting added wallet data
        if(es.data.status !== '1') {
            // just save wallet address
            wallet = new Wallet({address: walletAddress});
            await wallet.save();
            return res.status(500).json({ msg: 'Error fetching wallet data...'})
        }

        // save wallet data
        wallet = new Wallet({
            address: walletAddress,
            balance: web3.utils.fromWei(es.data.result, 'ether')
        });
        await wallet.save();

        return res.json({ wallet })
        
        // add etherscan
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/all', async (req, res) => {
    try {
        const wallets = await Wallet.find({});
        return res.json(wallets);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error')
    }
});


router.get('/walletInfo', async (req,res) => {
    res.json({ msg: 'Wallet info endpoint '})
});

module.exports = router;