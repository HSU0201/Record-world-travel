// exports.handler = async function(event, context) {
//     const cities = [
//       {
//         id: "38a1",
//         cityName: "Piqueras",
//         country: "Spain",
//         emoji: "🇪🇸",
//         date: "2024-06-03T08:50:12.732Z",
//         notes: "",
//         position: {
//           lat: "40.682095344099",
//           lng: "-1.7138671875000002"
//         }
//       },
//       {
//         id: "0d26",
//         cityName: "Pibrac",
//         country: "France",
//         emoji: "🇫🇷",
//         date: "2024-06-03T08:50:25.293Z",
//         notes: "",
//         position: {
//           lat: "43.62882136309421",
//           lng: "1.2524414062500002"
//         }
//       },
//       {
//         id: "03e9",
//         cityName: "Idanha-a-Nova",
//         country: "Portugal",
//         emoji: "🇵🇹",
//         date: "2024-06-03T08:50:26.882Z",
//         notes: "",
//         position: {
//           lat: "39.94573752692845",
//           lng: "-7.294921875000001"
//         }
//       }
//     ];

//     return {
//       statusCode: 200,
//       body: JSON.stringify(cities)
//     };
//   };

// /.netlify/functions/cities.js

// 定義城市資料
const cities = [
  {
    id: "38a1",
    cityName: "Piqueras",
    country: "Spain",
    emoji: "🇪🇸",
    date: "2024-06-03T08:50:12.732Z",
    notes: "",
    position: {
      lat: "40.682095344099",
      lng: "-1.7138671875000002",
    },
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
      lng: "1.2524414062500002",
    },
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
      lng: "-7.294921875000001",
    },
  },
];

// 導出 Netlify Function 的處理函式
exports.handler = async (event, context) => {
  // 確認請求方法
  switch (event.httpMethod) {
    case "GET":
      // 如果是 GET 請求，回傳所有城市資料
      return {
        statusCode: 200,
        body: JSON.stringify(cities),
      };
    case "POST":
      // 如果是 POST 請求，處理新增城市的邏輯
      try {
        const newCity = JSON.parse(event.body);
        cities.push(newCity);
        return {
          statusCode: 200,
          body: JSON.stringify(newCity),
        };
      } catch (error) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Invalid data format" }),
        };
      }
    case "DELETE":
      // 如果是 DELETE 請求，處理刪除城市的邏輯
      const cityIdToDelete = event.queryStringParameters.id;
      const indexToDelete = cities.findIndex(
        (city) => city.id === cityIdToDelete
      );
      if (indexToDelete !== -1) {
        const deletedCity = cities.splice(indexToDelete, 1)[0];
        return {
          statusCode: 200,
          body: JSON.stringify(deletedCity),
        };
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: "City not found" }),
        };
      }
    default:
      // 如果是其他類型的請求，回傳 Method Not Allowed
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method Not Allowed" }),
      };
  }
};
