import axios from 'axios';
import { showAlert } from './alert';


export const deleteTask = (taskId,projectName) => {
        const url = `http://127.0.0.1:9696/api/tasks/${taskId}`;
        axios({
            method: 'DELETE',
            url,
            data :{
                projectName
            }
        })
        .then(res => {
            if (res.data.status === "success") {
                showAlert('success', 'Delete task successfully!');
                window.setTimeout(() => {
                    location.assign(`/project/${projectName}`)
                }, 1500);
            }
        })
        .catch(err => {
            showAlert('error', err.response.data.message);
        })
}
