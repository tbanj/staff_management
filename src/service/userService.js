import http from './httpService.js';
import env from '../env.js';
import jwt_decode from 'jwt-decode';
import Storage from '../service/Storage.js';

const StorageData = new Storage();
const api = env.api + '/user';

export function getUsers() {
    return fetch(`${env.mock_api}/users`)
}

export const createUser = (body) => {
    return http.post(api + '/register', body);
}


export function getCurrentUser() {
    try {
        const jwt = StorageData.getItemsFromStorage()
        return jwt_decode(jwt);

    } catch (error) {
        return null;
    }
}

export function getAllUsers() {
    return http.get(api);
}

export function logout() {
    StorageData.clearItemsFromStorage();
} 
