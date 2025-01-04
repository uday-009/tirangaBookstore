import requests from "./httpServices";


const userServices = {
    getCategories : () => requests.get('category'),

    getHome: () => requests.get('home'),

    addToCart: (body) => requests.post('user/cart', body),

    syncCart: (body) => requests.post('user/cart',body), // this is not there 

    getCart: () => requests.get('user/cart')
}

export default userServices;