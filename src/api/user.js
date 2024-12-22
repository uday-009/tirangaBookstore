import requests from "./httpServices";


const userServices = {
    getCategories : () => requests.get('/category'),

    getHome: () => requests.get('/home')
}

export default userServices;