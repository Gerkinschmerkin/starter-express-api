const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();

app.get('/getnetworth', async (req, res) => {
    const INGAMENAME = req.query.IGN;
    const urlNW = "https://sky.shiiyu.moe/stats/${INGAMENAME}";

    try {
        const responseNW = await axios.get(urlNW);
        if (responseNW.status === 200) {
            const $ = cheerio.load(responseNW.data);
            const statNames = $('.stat-name');
            for (let i = 0; i < statNames.length; i++) {
                if ($(statNames[i]).text().trim() === 'Networth: ') {
                    const networthValue = $(statNames[i]).next().text().trim();
                    console.log(networthValue);
                    const NW = networthValue;
                    res.send(NW);
                    break;
                }
            }
        } else {
            res.send('not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
