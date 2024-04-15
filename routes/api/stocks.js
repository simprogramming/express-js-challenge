const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const stocks = require('../../Stocks');

// Get all stocks
router.get('/', (req, res) => res.json(stocks));

// Get single stock
router.get('/:id', (req, res) => {
    const found = stocks.some(stock => stock.id === parseInt(req.params.id));

    if(found){
        res.json(stocks.filter(stock => stock.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: 'Member not found'});
    }
});

// create stock
router.post('/', (req, res) => {
    const newStock = {
        id: uuid.v4(),
        name: req.body.name,
        symbol: req.body.symbol,
        price: req.body.price
    }

    if(!newStock.name || !newStock.symbol) {
        return res.status(400).json({ msg: 'Please include name and symbol'});
    } 

    stocks.push(newStock);
    res.json(stocks);
});

// Update Stock
router.put('/:id', (req, res) => {
    const found = stocks.some(stock => stock.id === parseInt(req.params.id));

    if(found){
        const updateStock = req.body;
        stocks.forEach(stock => {
            if(stock.id === parseInt(req.params.id)) {
                stock.name = updateStock.name ? updateStock.name : stock.name;
                stock.symbol = updateStock.symbol ? updateStock.symbol : stock.symbol;

                res.json({msg: "stock updated.", stock})
            }
        });
    } else {
        res.status(400).json({ msg: 'Member not found'});
    }
});

module.exports = router;