import requests from "./httpServices";


const userServices = {
    getCategories : () => requests.get('category'),

    getHome: () => requests.get('home'),

    addToCart: (body) => requests.post('user/cart', body),

    syncCart: (body) => requests.post('user/cart',body), // this is not there 

    getCart: () => requests.get('user/cart'),

    addToWishList: (bookId) => requests.get(`user/wishlist/${bookId}`),

    getWishList: () => requests.get(`user/wishlist`),

    getProducts: () => requests.get(`products`),

    getProductsByCategoryId: (id) => requests.get(`products-category/${id}`),
}

export default userServices;