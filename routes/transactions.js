const express = require('express');
const web3 = require('web3');

const Transaction = require('../models/transactions');
const Wallet = require('../models/wallets');
const axios = require('../config/axiosConfig');

const router = express.Router();

router.post('/all', async (req, res) => {
    const { walletAddress } = req.body;
    try {
        let wallet = await Wallet.findOne({ address: walletAddress })

        if (wallet) {
            const es = await axios.get('', {
                params: {
                    module: 'account',
                    action: 'txlist',
                    address: walletAddress,
                    startblock: 0,
                    endblock: 99999999,
                    page: 1,
                    offset: 10,
                    sort: 'asc',
                    apikey: process.env.ETHERSCAN_APIKEY 
                }
            });

            // if issue getting wallet transactions
            if(es.data.status !== '1') {
                return res.status(500).json({ msg: 'Issue fetching transaction data...'})
            }

            const transactions = es.data.result.map(tx => ({
                timeStamp: tx.timeStamp,
                from: tx.from,
                to: tx.to,
                value: tx.value,
                gas: tx.gas,
                gasPrice: tx.gasPrice,
                isError: tx.isError,
                txreceipt_status: tx.txreceipt_status,
                hash: tx.hash,
                confirmations: tx.confirmations
            }));

            return res.json(transactions);
        } else {
            return res.status(404).json({ msg: 'Wallet data not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
})

module.exports = router;