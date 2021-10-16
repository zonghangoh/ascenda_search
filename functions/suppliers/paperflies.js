
const { generateHotelTemplate } = require('./helpers.js');

const parsePaperfliesData = ({ hotel, hotels_data }) => {
    const hotel_id = hotel.hotel_id;

    if (!hotels_data[hotel_id]) {
        hotels_data[hotel_id] = generateHotelTemplate(hotel_id);
    }

    if (typeof hotel.destination_id == 'number') {
        hotels_data[hotel_id].destination_id = hotel.destination_id;
    }

    if (typeof hotel.hotel_name == 'string' && hotel.hotel_name.length > hotels_data[hotel_id].name.length) {
        hotels_data[hotel_id].name = hotel.hotel_name;
    }

    if (typeof hotel.location.address == 'string' && hotel.location.address.length > hotels_data[hotel_id].location.address.length) {
        hotels_data[hotel_id].location.address = hotel.location.address;
    }

    if (typeof hotel.location.country == 'string' && hotel.location.country.length > hotels_data[hotel_id].location.country.length) {
        hotels_data[hotel_id].location.country = hotel.location.country;
    }

    if (typeof hotel.details == 'string' && hotel.details.length > hotels_data[hotel_id].description.length) {
        hotels_data[hotel_id].description = hotel.details;
    }

    if ([...hotel.amenities.general, ...hotel.amenities.room].length > hotels_data[hotel_id].amenities.length) {
        hotels_data[hotel_id].amenities = [...hotel.amenities.general, ...hotel.amenities.room];
    }

    if (Array.isArray(hotel.booking_conditions)) {
        hotels_data[hotel_id].booking_conditions = hotel.booking_conditions;
    }

    if (typeof hotel.images === 'object') {
        if (Array.isArray(hotel.images['rooms'])) {
            hotels_data[hotel_id].images.rooms = [
                ...hotels_data[hotel_id].images.rooms,
                ...hotel.images['rooms']
                    .filter((image) => !hotels_data[hotel_id].images.rooms.find((i) => i.url === image.link))
                    .map((image) => {
                        return {
                            url: image.link,
                            caption: image.caption,
                        }
                    })]
        }
        if (Array.isArray(hotel.images['site'])) {
            hotels_data[hotel_id].images.site = [
                ...hotels_data[hotel_id].images.site,
                ...hotel.images['site']
                    .filter((image) => !hotels_data[hotel_id].images.amenities.find((i) => i.url === image.link))
                    .map((image) => {
                        return {
                            url: image.link,
                            caption: image.caption,
                        }
                    })]

        }
    }
}

module.exports = { parsePaperfliesData }


// SAMPLE HOTEL RESPONSE
//  {
//     "hotel_id": "f8c9",
//     "destination_id": 1122,
//     "hotel_name": "Hilton Tokyo",
//     "location": {
//       "address": "160-0023, SHINJUKU-KU, 6-6-2 NISHI-SHINJUKU, JAPAN",
//       "country": "Japan"
//     },
//     "details": "This sleek high-rise property is 10 minutes' walk from Shinjuku train station, 6 minutes' walk from the Tokyo Metropolitan Government Building and 3 km from Yoyogi Park. The polished rooms offer Wi-Fi and flat-screen TVs, plus minibars, sitting areas, and tea and coffeemaking facilities. Suites add living rooms, and access to a club lounge serving breakfast and cocktails. A free shuttle to Shinjuku station is offered. There's a chic Chinese restaurant, a sushi bar, and a grill restaurant with an open kitchen, as well as an English pub and a hip cocktail lounge. Other amenities include a gym, rooftop tennis courts, and a spa with an indoor pool.",
//     "amenities": {
//       "general": [
//         "indoor pool",
//         "business center",
//         "wifi"
//       ],
//       "room": [
//         "tv",
//         "aircon",
//         "minibar",
//         "bathtub",
//         "hair dryer"
//       ]
//     },
//     "images": {
//       "rooms": [
//         {
//           "link": "https://d2ey9sqrvkqdfs.cloudfront.net/YwAr/i1_m.jpg",
//           "caption": "Suite"
//         },
//         {
//           "link": "https://d2ey9sqrvkqdfs.cloudfront.net/YwAr/i15_m.jpg",
//           "caption": "Double room"
//         }
//       ],
//       "site": [
//         {
//           "link": "https://d2ey9sqrvkqdfs.cloudfront.net/YwAr/i55_m.jpg",
//           "caption": "Bar"
//         }
//       ]
//     },
//     "booking_conditions": [
//       "All children are welcome. One child under 6 years stays free of charge when using existing beds. There is no capacity for extra beds in the room.",
//       "Pets are not allowed.",
//       "Wired internet is available in the hotel rooms and charges are applicable. WiFi is available in the hotel rooms and charges are applicable.",
//       "Private parking is possible on site (reservation is not needed) and costs JPY 1500 per day.",
//       "When booking more than 9 rooms, different policies and additional supplements may apply.",
//       "The hotel's free shuttle is offered from Bus Stop #21 in front of Keio Department Store at Shinjuku Station. It is available every 20-minutes from 08:20-21:40. The hotel's free shuttle is offered from the hotel to Shinjuku Train Station. It is available every 20-minutes from 08:12-21:52. For more details, please contact the hotel directly. At the Executive Lounge a smart casual dress code is strongly recommended. Attires mentioned below are strongly discouraged and may not permitted: - Night attire (slippers, Yukata robe, etc.) - Gym clothes/sportswear (Tank tops, shorts, etc.) - Beachwear (flip-flops, sandals, etc.) and visible tattoos. Please note that due to renovation works, the Executive Lounge will be closed from 03 January 2019 until late April 2019. During this period, guests may experience some noise or minor disturbances. Smoking preference is subject to availability and cannot be guaranteed."
//     ]
//   }