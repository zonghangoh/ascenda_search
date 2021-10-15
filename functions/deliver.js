const searchByHotels = ({ hotel_ids, hotels_data }) => {

    if (hotel_ids.length == 0) return Object.values(hotels_data);

    const results = [];
    hotel_ids.forEach((id) => {
        if (hotels_data[id]) {
            results.push(hotels_data[id])
        }
    })

    return results;

}

const searchByDestination = ({ destination_id, hotels_by_destination, hotels_data }) => {

    const results = [];

    if (hotels_by_destination[destination_id]) {
        hotels_by_destination[destination_id].forEach((id) => {
            results.push(hotels_data[id])
        })
    }

    return results;

}

module.exports = {
    searchByHotels,
    searchByDestination
};