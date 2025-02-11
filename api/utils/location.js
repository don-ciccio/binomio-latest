const axios = require("axios");

exports.getAddressCordinates = async (address, API_KEY) => {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
    )}&key=${API_KEY}`;
    let response;

    try {
        response = await axios.get(url);

        if (response.status == 200) {
            if (response.data.status == "OK") {
                let data = response.data.results[0].geometry.location;
                let formattedAddress =
                    response.data.results[0].formatted_address;
                return {
                    status: true,
                    data: data,
                    formattedAddress: formattedAddress,
                };
            }

            if (response.data.status == "ZERO_RESULTS") {
                console.log("flsfklsfkls");
                return {
                    status: false,
                    data: "No coordinates was found for the entered address",
                };
            }
        }
    } catch (e) {
        console.log(e);
        return {
            status: false,
            data: "Encountered an error while connecting to the server",
        };
    }
};
