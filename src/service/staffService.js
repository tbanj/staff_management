import http from './httpService';
import env from '../env';
import Storage from '../service/Storage.js';

const api = env.api + '/staff';
const token = localStorage.getItem('currentUser') || 'token'
const StorageData = new Storage();
class StaffService {

    create(body) {
        return http.post(api + '/create', body, {
            headers: { 'Authorization': `Bearer ${token}` }
        }
        )
    }
    getAll(token) {
        return http.get(api, {
            headers: { 'Authorization': `Bearer ${this.getToken()}` }
        });
    }
    uploadImg(formData) {
        return http.post(api + '/upload-pics', formData)
    }

    getToken() {
        try {
            const token = StorageData.getItemsFromStorage();
            console.log(token)
            return token
        } catch (error) {
            return null;
        }
    }

    staffDetail(data) {
        return http.get(api + `/view/${data}`);
    }
}
export default StaffService;