import axios from 'axios';
import { showAlert } from './alert';


export const addUser = (data) => {
        const url = 'http://127.0.0.1:9696/api/users';
        axios({
            method: 'POST',
            url,
            data
        })
        .then(res => {
            if (res.data.status === "success") {
                showAlert('success', 'Sign up successfully');
                window.setTimeout(() => {
                    location.assign('/login')
                }, 1500);
            }
        })
        .catch(err => {
            showAlert('error', err.response.data.message);
        })
}
