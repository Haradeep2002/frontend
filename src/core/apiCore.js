import { API } from "../config";
import { isAuthenticated } from '../auth';
const queryString = require('query-string')

export const getProducts = (sortBy) => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method: 'GET',
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const getCategories = (token) => {
    return fetch(`${API}/categories`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getFilteredProducts = (skip,limit,filters={}) => {
    const data ={limit,skip,filters}
    return fetch(`${API}/products/by/search`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const list = (params) => {
    const query = queryString.stringify(params)
    return fetch(`${API}/products/search?${query}`, {
        method: 'GET',
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const read = (id) => {
    return fetch(`${API}/product/${id}`, {
        method: 'GET',
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}


export const listRelated = (id) => {
    return fetch(`${API}/products/related/${id}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getBraintreeClientToken = (userId,token) => {
    return fetch(`${API}/braintree/getToken/${userId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const processPayment = (userId,token,paymentdata) => {
    return fetch(`${API}/braintree/payment/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(paymentdata)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const createOrder = (userId,token,createOrder) => {
    return fetch(`${API}/order/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify({order:createOrder})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const createBlog = (userId,token,createOrder) => {
    console.log(userId,token,createOrder)
    return fetch(`${API}/blog/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify({id:createOrder})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getBlogs = () => {
    return fetch(`${API}/blogs`, {
        method: 'GET',
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
