export async function getData(params) {
  const url = getUrl(params);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "bf7c697f2bmsh5141cf769d29ccap1908b7jsnc06fab634542",
      "X-RapidAPI-Host":
        "cities-cost-of-living-and-average-prices-api.p.rapidapi.com",
    },
  });
  const responseJSON = await response.json();

  return responseJSON;
}

function getUrl(params) {
  if (params.type === "GET_PLACES" && !params.payload) {
    return "https://cities-cost-of-living-and-average-prices-api.p.rapidapi.com/countries";
  }
  if (params.type === "GET_PLACES" && params.payload) {
    return `https://cities-cost-of-living-and-average-prices-api.p.rapidapi.com/cities?country=${params.payload}`;
  }
  if (params.type === "GET_COST" && !params.payload.city) {
    return `https://cities-cost-of-living-and-average-prices-api.p.rapidapi.com/cost_of_living?country=${params.payload.country}`;
  }
  if (params.type === "GET_COST" && params.payload.city) {
    return `https://cities-cost-of-living-and-average-prices-api.p.rapidapi.com/cost_of_living?country=${params.payload.country}&city=${params.payload.city}`;
  }
}
