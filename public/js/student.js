//update Data;
import axios from 'axios';
import { showAlert } from './alert';


export const updatePhotoStudent = async (form) => {
        const url = 'http://127.0.0.1:3000/admin/edit-photo-student';
        axios({
            method: 'PATCH',
            url,
            data: form
        })
        .then(res => {
            if (res.data.status === "success") {
                showAlert('success', 'Cập Nhật Thanh Cong');
                window.setTimeout(() => {
                    location.assign('/admin/list-student-admission')
                }, 1500);
            }
        })
        .catch(err => {
            showAlert('error', err.response.data.message);
    })
}


export const updateDocumentStudent = async (form) => {
    const url = 'http://127.0.0.1:3000/admin/edit-document-student';
    axios({
        method: 'PATCH',
        url,
        data: form
    })
    .then(res => {
        if (res.data.status === "success") {
            showAlert('success', 'Cap Nhat Thanh Cong');
            window.setTimeout(() => {
                location.assign('/admin/list-student-admission')
            }, 1500);
        }
    })
    .catch(err => {
        showAlert('error', err.response.data.message);
    })
}

export const updateEnrollingStatus = async (data) => {
    const url = 'http://127.0.0.1:3000/admin/edit-study-student';
    axios({
        method: 'PATCH',
        url,
        data
    })
    .then(res => {
        if (res.data.status === "success") {
            showAlert('success', 'Cap Nhat Thanh Cong');
            window.setTimeout(() => {
                location.assign('/admin/list-student-study')
            }, 1500);
        }
    })
    .catch(err => {
        showAlert('error', err.response.data.message);
    })
}

export const updateTuition = async (data) => {
    const url = 'http://127.0.0.1:3000/admin/edit-tuition-student';
    axios({
        method: 'PATCH',
        url,
        data
    })
    .then(res => {
        if (res.data.status === "success") {
            showAlert('success', 'Cap Nhat Thanh Cong');
            window.setTimeout(() => {
                location.assign('/admin/list-student-fee')
            }, 1500);
        }
    })
    .catch(err => {
        showAlert('error', err.response.data.message);
    })
}

export const updateCodeNumber = async (data) => {
    const url = 'http://127.0.0.1:3000/admin/edit-codenumber-student';
    axios({
        method: 'PATCH',
        url,
        data
    })
    .then(res => {
        if (res.data.status === "success") {
            showAlert('success', 'Cap Nhat Thanh Cong');
            window.setTimeout(() => {
                location.assign('/admin/list-student-fee')
            }, 1500);
        }
    })
    .catch(err => {
        showAlert('error', err.response.data.message);
    })
}