import http from './httpService.js';
import env from '../env.js'

export function getUsers() {
    return fetch(`${env.mock_api}/users`)
}

export function storeUser(data) {
    return fetch(`${env.mock_api}/users`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
}

