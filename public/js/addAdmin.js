import axios from 'axios';
import { showAlert } from './alert';


export const addAdmin = (data) => {
        const url = 'http://127.0.0.1:3000/api/v1/userAdmins';
        axios({
            method: 'POST',
            url,
            data
        })
        .then(res => {
            if (res.data.status === "success") {
                showAlert('success', 'Logged in successfully');
                window.setTimeout(() => {
                    location.assign('/admin/list-admin')
                }, 1500);
            }
        })
        .catch(err => {
            showAlert('error', err.response.data.message);
        })
}
