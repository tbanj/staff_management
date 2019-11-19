import http from './httpService.js';
import env from '../env.js'
const api = env.api + '/user';

export function getUsers() {
    return fetch(`${env.mock_api}/users`)
}

export function storeUser(data) {
    return fetch(`${env.mock_api}/user/register`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
}
export const createUser = (body) => {
    return http.post(api + '/register', body);
}
