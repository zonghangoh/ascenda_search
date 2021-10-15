const axios = require('axios');
const { parseAcmeData } = require('./suppliers/acme.js')
const { parsePatagoniaData } = require('./suppliers/patagonia.js')
const { parsePaperfliesData } = require('./suppliers/paperflies.js')
const { endpoints } = require('../constants.js');

const populateHotelsData = async ({ hotels_data, endpoint }) => {
    try {
        const hotelsResponse = await axios.get(endpoint).then((response => response.status === 200 ? response.data : []));
        hotelsResponse.forEach((hotel) => {
            // in order to capture as much information as possible without overlapping, when parsing data for each unique hotel from different suppliers...
            // for string based fields such as hotel name and description, the supplier with the longest entry is selected.
            // for array based fields such as amenities, the supplier with the longest array of amenities is selected.
            // for amenities, it was considered whether or not it would be good to merge the arrays of different suppliers,
            // but it was decided that unintended overlapping entries might occur due to different spellings or capitalisation of the same amenity.
            if (endpoint === endpoints.ACME) parseAcmeData({ hotel: hotel, hotels_data: hotels_data });
            else if (endpoint === endpoints.PATAGONIA) parsePatagoniaData({ hotel: hotel, hotels_data: hotels_data });
            else if (endpoint === endpoints.PAPERFLIES) parsePaperfliesData({ hotel: hotel, hotels_data: hotels_data });
        })
    } catch (e) {
        console.log(e);
    }
    return;
}

const populateHotelsByDestination = ({ hotels_by_destination, hotels_data }) => {
    Object.values(hotels_data).forEach((hotel) => {
        if (!(hotel.destination_id in hotels_by_destination)) hotels_by_destination[hotel.destination_id] = [];
        hotels_by_destination[hotel.destination_id].push(hotel.id)
    })
}

module.exports = {
    populateHotelsData,
    populateHotelsByDestination
};