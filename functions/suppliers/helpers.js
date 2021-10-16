const generateHotelTemplate = (id) => {
    return {
        "id": id,
        "destination_id": null,
        "name": '',
        "location": {
            "lat": null,
            "lng": null,
            "address": '',
            "city": '',
            "country": '',
            "postal_code": null
        },
        "description": '',
        "amenities": [],
        "images": { 'rooms': [], 'amenities': [], 'site': [] }, // {url, caption}
        "booking_conditions": []
    }
}

module.exports = { generateHotelTemplate };

