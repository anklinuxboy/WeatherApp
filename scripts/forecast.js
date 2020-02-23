class Forecast {
    constructor() {
        this.apiKey = 'YynPg8ucIprQnA11pqoLBcJmNUwZqgiY';
        this.cityURL = 'http://dataservice.accuweather.com/locations/v1/cities/search';
        this.weatherURL = 'http://dataservice.accuweather.com/currentconditions/v1/';
    }

    async getWeather(id) {
        const query = `${id}?apikey=${this.apiKey}`;
    
        const response = await fetch(`${this.weatherURL}${query}`);
        if (response.status !== 200) {
            throw new Error(`Error fetching weather. Status: ${response.status}`);
        }
        const data = await response.json();
        return data[0];
    }
    
    async getCity(city) {
        const query = `?apikey=${this.apiKey}&q=${city}`
    
        const response = await fetch(`${this.cityURL}${query}`);
        if (response.status !== 200) {
            throw new Error(`Error fetching city location. Status: ${response.status}`);
        }
        const data = await response.json();
        return data[0];
    }

    async updateCityDetails(city) {
        const cityDetails = await this.getCity(city);
        const weatherDetails = await this.getWeather(cityDetails.Key);
    
        return {
            cityDetails,
            weatherDetails
        };
    }
}
