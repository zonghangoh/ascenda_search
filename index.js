
const { populateHotelsData, populateHotelsByDestination } = require('./functions/procure.js');
const { searchByHotels, searchByDestination } = require('./functions/deliver.js');
const { endpoints } = require('./constants');

const express = require('express')
const app = express()
const port = 3000

const hotels_data = {}; // maps hotel_id to hotel data
const hotels_by_destination = {}; // maps destination_id to hotel_ids

app.get('/search', (req, res) => {
    const { destination, hotels } = req.query;
    // it is assumed that only one fitering parameter is used per request
    // when no parameters are selected, all hotels are fetched
    try {
        if (hotels) return res.send(searchByHotels({ hotel_ids: hotels, hotels_data }))
        else if (destination) return res.send(searchByDestination({ destination_id: destination, hotels_by_destination, hotels_data }))
        else res.send(searchByHotels({ hotel_ids: [], hotels_data }))
    } catch (e) { console.log(e) };

    return res.sendStatus(400);
})

const initData = async () => {
    await Promise.all([
        endpoints.ACME, endpoints.PATAGONIA, endpoints.PAPERFLIES
    ].map((endpoint) => populateHotelsData({ hotels_data, endpoint })));
    populateHotelsByDestination({ hotels_by_destination, hotels_data });
}

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
    initData();
})