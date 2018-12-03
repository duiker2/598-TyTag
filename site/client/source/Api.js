import axios from 'axios';

class Api {

    constructor() {
        const url = 'http://localhost:5000/';
        axios.defaults.baseURL = url;
        // axios.defaults.withCredentials = true
    }

    tag() {
        axios.post('/tag/')
        .catch(error => {
            console.log(error);
        });
    }

    title() {
        axios.post('/title/')
        .catch(error => {
            console.log(error);
        });
    }


    link(article_id) {
        axios.post('/link/', article_id)
        .catch(error => {
            console.log(error);
        });
    }

    share(article_id, checked) {
        axios.post('/share/', article_id, checked)
        .catch(error => {
            console.log(error);
        });
    }

}

export default Api;
