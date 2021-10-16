const { generateHotelTemplate } = require('./helpers.js');

const parsePatagoniaData = ({ hotel, hotels_data }) => {

    const hotel_id = hotel.id;

    if (!hotels_data[hotel_id]) hotels_data[hotel_id] = generateHotelTemplate(hotel_id);

    if (typeof hotel.destination === 'number') {
        hotels_data[hotel_id].destination_id = hotel.destination;
    }

    if (typeof hotel.name === 'string' && hotel.name.length > hotels_data[hotel_id].name.length) {
        hotels_data[hotel_id].name = hotel.name;
    }

    if (typeof hotel.lat === 'number' && typeof hotel.lng === 'number') {
        hotels_data[hotel_id].location.lat = hotel.lat;
        hotels_data[hotel_id].location.lng = hotel.lng;
    }

    if (typeof hotel.address === 'string' && hotel.address.length > hotels_data[hotel_id].location.address.length) {
        hotels_data[hotel_id].location.address = hotel.address;
    }

    if (typeof hotel.info === 'string' && hotel.info.length > hotels_data[hotel_id].description.length) {
        hotels_data[hotel_id].description = hotel.info;
    }

    if (Array.isArray(hotel.amenities) && hotel.amenities.length > hotels_data[hotel_id].amenities.length) {
        hotels_data[hotel_id].amenities = hotel.amenities;
    }

    if (typeof hotel.images === 'object') {
        if (Array.isArray(hotel.images['rooms'])) {
            hotels_data[hotel_id].images.rooms = [
                ...hotels_data[hotel_id].images.rooms,
                ...hotel.images['rooms']
                    .filter((image) => !hotels_data[hotel_id].images.rooms.find((i) => i.url === image.url))
                    .map((image) => {
                        return {
                            url: image.url,
                            caption: image.description,
                        }
                    })]
        }
        if (Array.isArray(hotel.images['amenities'])) {
            hotels_data[hotel_id].images.site = [
                ...hotels_data[hotel_id].images.site,
                ...hotel.images['amenities']
                    .filter((image) => !hotels_data[hotel_id].images.site.find((i) => i.url === image.url))
                    .map((image) => {
                        return {
                            url: image.url,
                            caption: image.description,
                        }
                    })]

        }
    }

}

module.exports = { parsePatagoniaData }


// SAMPLE HOTEL RESPONSE
//  {
//     "id": "iJhz",
//     "destination": 5432,
//     "name": "Beach Villas Singapore",
//     "lat": 1.264751,
//     "lng": 103.824006,
//     "address": "8 Sentosa Gateway, Beach Villas, 098269",
//     "info": "Located at the western tip of Resorts World Sentosa, guests at the Beach Villas are guaranteed privacy while they enjoy spectacular views of glittering waters. Guests will find themselves in paradise with this series of exquisite tropical sanctuaries, making it the perfect setting for an idyllic retreat. Within each villa, guests will discover living areas and bedrooms that open out to mini gardens, private timber sundecks and verandahs elegantly framing either lush greenery or an expanse of sea. Guests are assured of a superior slumber with goose feather pillows and luxe mattresses paired with 400 thread count Egyptian cotton bed linen, tastefully paired with a full complement of luxurious in-room amenities and bathrooms boasting rain showers and free-standing tubs coupled with an exclusive array of ESPA amenities and toiletries. Guests also get to enjoy complimentary day access to the facilities at Asia’s flagship spa – the world-renowned ESPA.",
//     "amenities": [
//       "Aircon",
//       "Tv",
//       "Coffee machine",
//       "Kettle",
//       "Hair dryer",
//       "Iron",
//       "Tub"
//     ],
//     "images": {
//       "rooms": [
//         {
//           "url": "https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/2.jpg",
//           "description": "Double room"
//         },
//         {
//           "url": "https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/4.jpg",
//           "description": "Bathroom"
//         }
//       ],
//       "amenities": [
//         {
//           "url": "https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/0.jpg",
//           "description": "RWS"
//         },
//         {
//           "url": "https://d2ey9sqrvkqdfs.cloudfront.net/0qZF/6.jpg",
//           "description": "Sentosa Gateway"
//         }
//       ]
//     }
//   }