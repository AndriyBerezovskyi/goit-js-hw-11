const axios = require('axios');

const BASE_URL = "https://pixabay.com/api/"
const KEY = 'key=25388474-a691255b14410c0cf21f77955';
const imageType = "photo"
const orientation = "horizontal"

export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.perPage = 40;  
    }

    async fetchPictures() {
        const url = `${BASE_URL}?${KEY}&q=${this.searchQuery}&image_type=${imageType}&orientation=${orientation}&safesearch=true&per_page=${this.perPage}&page=${this.page}`
        const response = await axios.get(url)
        this.incrementPage()
        return await response;           
    }

    incrementPage() {
        this.page += 1
    }
    
    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
};