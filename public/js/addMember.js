import axios from 'axios';
import { showAlert } from './alert';


export const addMember = (email,projectName) => {
        const url = `http://127.0.0.1:9696/api/projects/${projectName}`;
        axios({
            method: 'POST',
            url,
            data :{
                email
            }
        })
        .then(res => {
            if (res.data.status === "success") {
                showAlert('success', 'Added succesfully!');
                window.setTimeout(() => {
                    location.assign(`/project/${projectName}`)
                }, 1500);
            }
        })
        .catch(err => {
            showAlert('error', err.response.data.message);
        })
}
