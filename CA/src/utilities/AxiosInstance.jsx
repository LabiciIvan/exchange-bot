import axios from 'axios';

const AxiosInstance = axios.create({
    baseURL : 'http://localhost:8000/EB/api/v1',
    headers: {
        Accept: 'application/json',
        trusted: 'EB'
    },
    responseType: 'json',
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    proxy: {
        protocol: 'http',
        host: 'localhost',
        port: 5500,
      },

})
export default AxiosInstance;