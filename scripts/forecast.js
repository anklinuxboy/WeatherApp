const apiKey = 'YynPg8ucIprQnA11pqoLBcJmNUwZqgiY';

const getWeather = async (id) => {
    const baseUrl = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${apiKey}`;

    const response = await fetch(`${baseUrl}${query}`);
    if (response.status !== 200) {
        throw new Error(`Error fetching weather. Status: ${response.status}`);
    }
    const data = await response.json();
    return data[0];
}

const getCity = async (city) => {
    const baseUrl = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${apiKey}&q=${city}`

    const response = await fetch(`${baseUrl}${query}`);
    if (response.status !== 200) {
        throw new Error(`Error fetching city location. Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);

    return data[0];
}
