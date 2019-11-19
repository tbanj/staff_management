import http from './httpService';
import env from '../env'

const api = env.api + '/staff';
const token = localStorage.getItem('currentUser') || 'token'

class StaffService {

    create(body) {
        return http.post(api + '/create', body, {
            headers: { 'Authorization': `Bearer ${token}` }
        }
        )
    }
    getAll() {
        return http
    }
    uploadImg(formData) {
        return http.post(api + '/upload-pics', formData)
    }
}
export default StaffService;