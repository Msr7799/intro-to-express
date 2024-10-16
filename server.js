const express = require('express');

const app = express();

app.listen(3000, () => {
    console.log('Listening on port 3000')
})

app.get('/greetings/:name', (reg, res) => {
    res.send(`Hello there, ${reg.params.name}`);
});

app.get('/roll/:number', (reg, res) => {
    let num = reg.params.number;
    let responseMsg;

    if (!isNaN(reg.params.number)) {
        num++; // make sure the maximum number can be rolled
        responseMsg = `You rolled a ${Math.floor(Math.random() * num)}.`;
    } else {
        responseMsg = 'You must specify a number.';
    }

    res.send(responseMsg);
});

app.get('/collectibles/:index', (reg, res) => {
    let responseMsg;
    const collectibles = [
        { name: 'shiny ball', price: 5.95 },
        { name: 'autographed picture of a dog', price: 10 },
        { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
    ];

    const item = collectibles[reg.params.index];

    if (item) {
        responseMsg = `So, you want the ${item.name}? For ${item.price}, it can be yours!`;
    } else {
        responseMsg = 'This item is not yet in stock. Check back soon!';
    }

    res.send(responseMsg);
});

app.get('/hello', (req, res) => {
    res.send(`Hello there, ${req.query.name}! I hear you are ${req.query.age} years old!`);
});

app.get('/shoes', (reg, res) => {
    const shoes = [
        { name: "Birkenstocks", price: 50, type: "sandal" },
        { name: "Air Jordans", price: 500, type: "sneaker" },
        { name: "Air Mahomeses", price: 501, type: "sneaker" },
        { name: "Utility Boots", price: 20, type: "boot" },
        { name: "Velcro Sandals", price: 15, type: "sandal" },
        { name: "Jet Boots", price: 1000, type: "boot" },
        { name: "Fifty-Inch Heels", price: 175, type: "heel" }
    ];

    // get all acceptable queries
    const min = reg.query.min;
    const max = reg.query.max;
    const type = reg.query.type;

    // array of idexes to be removed
    let idxArray = [];

    shoes.forEach((shoe, index) => {
        // if query exists and if shoe does not meet criteria, push to idxArray
        if (type && shoe.type !== type) {
            idxArray.push(index);
        } else if (min && max && shoe.price < min && shoe.price > max) {
            idxArray.push(index);
        } else if (min && shoe.price < min) {
            idxArray.push(index);
        } else if (max && shoe.price > max) {
            idxArray.push(index);
        }
    })

    // reverse number of indexes.
    // The indexes to be deleted will be from highest to lowest, which will prevent shifting the array and deleting incorrect data
    idxArray = idxArray.reverse();

    idxArray.forEach(idx => {
        shoes.splice(idx, 1)
    });

    // return shoes with the request critera
    res.send(shoes);
});