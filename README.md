
# ascenda_search

API endpoint: https://ascenda-search.herokuapp.com/search

**GET parameters:** 
hotels[]: *String* OR destination: *String*

**General Approach:**
1. Data Procurement

	a) Fetch responses from all 3 supplier endpoints 

	b) While looping through the hotels from each response, populate a global variable *hotels_data* which maps *hotel_id* to its relevant data that follows the following schema:

		{
			"id": String,
			"destination_id":  int,
			"name":  String,
			"location": {
				"lat":  double,
				"lng":  double,
				"address":  String,
				"city":  String,
				"country":  String,
				"postal_code":  String
			},
			"description":  String,
			"amenities": [String],
			"images": { 	
				'rooms': [{url: String, caption: String}],  	
				'amenities': [{url: String, caption: String}] 
			},  
			"booking_conditions": [String]
		}
	In order to capture as much information as possible without overlapping, when parsing data for each unique hotel from different suppliers...
	i) for string based fields such as hotel name and description, the supplier with the longest entry is selected.
	ii) for array based fields such as amenities, the supplier with the longest array of amenities is selected.
 
	 For amenities, it was considered whether or not it would be good to merge the arrays of different suppliers, but it was decided that unintended overlapping entries might occur due to different spellings or capitalisation of the same amenity.
	 
	c) After which, populate another global variable *hotels_by_destination* which maps *destination_id* to its relevant *hotel_ids*.
	
2. Data Search
	
	It is assumed that only one filtering parameter is used per request.
	When no parameters are selected, all hotels are fetched.

	Data search is done via simple key value pair look ups using the global variables *hotels_data* and *hotels_by_destination*.
		
