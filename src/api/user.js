import requests from "./httpServices";


const userServices = {
    getCategories : () => requests.get('/category'),

    getHome: () => requests.get('/home'),

    addToCart: (body) => requests.post('/user/cart', body)
}

export default userServices;