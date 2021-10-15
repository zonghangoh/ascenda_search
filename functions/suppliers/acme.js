const { generateHotelTemplate } = require('./helpers.js');

const parseAcmeData = ({ hotel, hotels_data }) => {

    const hotel_id = hotel.Id;

    if (!hotels_data[hotel_id]) hotels_data[hotel_id] = generateHotelTemplate(hotel_id);

    if (typeof hotel.DestinationId === 'number') {
        hotels_data[hotel_id].destination_id = hotel.DestinationId;
    }

    if (typeof hotel.Name === 'string' && hotel.Name.length > hotels_data[hotel_id].name.length) {
        hotels_data[hotel_id].name = hotel.Name;
    }

    if (typeof hotel.Latitude === 'number' && typeof hotel.Longitude === 'number') {
        hotels_data[hotel_id].location.lat = hotel.Latitude;
        hotels_data[hotel_id].location.lng = hotel.Longitude;
    }

    if (typeof hotel.Address === 'string' && hotel.Address.length > hotels_data[hotel_id].location.address.length) {
        hotels_data[hotel_id].location.address = hotel.Address;
    }

    if (typeof hotel.City === 'string' && hotel.City.length > hotels_data[hotel_id].location.city.length) {
        hotels_data[hotel_id].location.city = hotel.City;
    }

    if (typeof hotel.Country === 'string' && hotel.Country.length > hotels_data[hotel_id].location.country.length) {
        hotels_data[hotel_id].location.country = hotel.Country;
    }

    if (typeof hotel.PostalCode === 'string') {
        hotels_data[hotel_id].location.postal_code = hotel.PostalCode;
    }

    if (typeof hotel.Description === 'string' && hotel.Description.length > hotels_data[hotel_id].description.length) {
        hotels_data[hotel_id].description = hotel.Description;
    }

    if (Array.isArray(hotel.Facilities) && hotel.Facilities.length > hotels_data[hotel_id].amenities.length) {
        hotels_data[hotel_id].amenities = hotel.Facilities;
    }

}

module.exports = { parseAcmeData }


// SAMPLE HOTEL RESPONSE
// {
//     "Id": "iJhz",
//     "DestinationId": 5432,
//     "Name": "Beach Villas Singapore",
//     "Latitude": 1.264751,
//     "Longitude": 103.824006,
//     "Address": " 8 Sentosa Gateway, Beach Villas ",
//     "City": "Singapore",
//     "Country": "SG",
//     "PostalCode": "098269",
//     "Description": "  This 5 star hotel is located on the coastline of Singapore.",
//     "Facilities": [
//       "Pool",
//       "BusinessCenter",
//       "WiFi ",
//       "DryCleaning",
//       " Breakfast"
//     ]
// },