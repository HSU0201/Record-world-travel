exports.handler = async function(event, context) {
    const data = {
        cities: [
            {
                id: "38a1",
                cityName: "Piqueras",
                country: "Spain",
                emoji: "🇪🇸",
                date: "2024-06-03T08:50:12.732Z",
                notes: "",
                position: {
                    lat: "40.682095344099",
                    lng: "-1.7138671875000002"
                }
            },
            {
                id: "0d26",
                cityName: "Pibrac",
                country: "France",
                emoji: "🇫🇷",
                date: "2024-06-03T08:50:25.293Z",
                notes: "",
                position: {
                    lat: "43.62882136309421",
                    lng: "1.2524414062500002"
                }
            },
            {
                id: "03e9",
                cityName: "Idanha-a-Nova",
                country: "Portugal",
                emoji: "🇵🇹",
                date: "2024-06-03T08:50:26.882Z",
                notes: "",
                position: {
                    lat: "39.94573752692845",
                    lng: "-7.294921875000001"
                }
            }
        ]
    };

    return {
        statusCode: 200,
        body: JSON.stringify(data),
    };
};
