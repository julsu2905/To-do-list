import axios from 'axios';
import { showAlert } from './alert';


export const createTask = (projectName, data) => {
        const url = `http://127.0.0.1:9696/project/${projectName}`;
        axios({
            method: 'POST',
            url,
            data
        })
        .then(res => {
            if (res.data.status === "success") {
                showAlert('success', 'Create successfully!');
                window.setTimeout(() => {
                    location.assign(`/project/${projectName}`)
                }, 1500);
            }
        })
        .catch(err => {
            showAlert('error', err.response.data.message);
        })
}
