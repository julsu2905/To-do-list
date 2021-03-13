import axios from 'axios';
import { showAlert } from './alert';

export const login =  (email, password) => {
    const url = 'http://pmware.herokuapp.com/api/login';   
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
            url: 'http://pmware.herokuapp.com/api/logout',
        });
        if(res.data.status === 'success') {
            showAlert('success', 'Log out successfully');
            res.locals.user = res.data.user;
            location.assign('/login');
        }
    }catch(err) {
        showAlert('error', err);
    }
}