import axios from 'axios';
import { showAlert } from './alert';

export const login =  (email, password) => {
    const url = 'http://127.0.0.1:9696/api/login';   
    axios({ 
            method: 'POST',
            url,
            data: {
                email,
                password
            }
        })
        .then(res => {
            if (res.data.status === "success") {
                showAlert('success', 'Logged in successfully');
                window.setTimeout(() => {
                    location.assign('/home')
                }, 1500);
            }
        })
        .catch(err => {
            showAlert('error', err.response.data.message);
        })
}

export const logout = async() => {
    try {
        const res = await axios({
            method: 'GET',
            url: 'http://127.0.0.1:9696/api/logout',
        });
        if(res.data.status === 'success') {
            showAlert('success', 'Log out successfully');
            window.setTimeout(() => {
                location.assign('/login')
            }, 1500);
        }
    }catch(err) {
        showAlert('error', err);
        location.assign('/login');
    }
}