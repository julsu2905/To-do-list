import { login, logout } from './login';
import { updateSettings } from './updateSettings';
import { addUser } from './addUser';
import { createProject } from './createProject';




//DOM ELEMENT
const loginForm = document.querySelector('.form-login');
const logOutBtn = document.querySelector('.logout');
const adminDataForm = document.querySelector('.form-admin-data');
const adminPasswordForm = document.querySelector('.form-admin-password');
const signupForm = document.querySelector('.form-signup');

//Login and logout
if (loginForm) {
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.querySelector("#email");
        const password = document.querySelector("#password");
        login(email.value, password.value);
    });
};

if (logOutBtn) {
    logOutBtn.addEventListener('click', logout);
};


if (adminDataForm) {
    adminDataForm.addEventListener('submit', e => {
        e.preventDefault();
        const form = new FormData();
        form.append('username', document.getElementById('username').value);
        form.append('email', document.getElementById('email').value);
        form.append('photo', document.getElementById('photo').files[0]);
        updateSettings(form, 'data');
    });
};

if (adminPasswordForm) {
    adminPasswordForm.addEventListener('submit', async e => {
        e.preventDefault();
        document.querySelector('.btn-save-password').textContent = 'Updating...';
        const passwordCurrent = document.getElementById('passwordCurrent').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm').value;
        await updateSettings(
            { passwordCurrent, password, passwordConfirm },
            'password'
        );
        document.querySelector('.btn-save-password').textContent = 'Save password';
        document.getElementById('passwordCurrent').value = '';
        document.getElementById('password').value = '';
        document.getElementById('passwordConfirm').value = '';
    });
};

if (signupForm) {
    signupForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm').value;
        console.log(email);
        console.log(password);
        console.log(passwordConfirm);
        addUser({ email, password, passwordConfirm });
    });
}


//Page Admin
jQuery(function ($) {
    $(".sidebar-dropdown > a").click(function () {
        $(".sidebar-submenu").slideUp(200);
        if (
            $(this)
                .parent()
                .hasClass("active")
        ) {
            $(".sidebar-dropdown").removeClass("active");
            $(this)
                .parent()
                .removeClass("active");
        } else {
            $(".sidebar-dropdown").removeClass("active");
            $(this)
                .next(".sidebar-submenu")
                .slideDown(200);
            $(this)
                .parent()
                .addClass("active");
        }
    });

    $("#close-sidebar").click(function () {
        $(".page-wrapper").removeClass("toggled");
    });
    $("#show-sidebar").click(function () {
        $(".page-wrapper").addClass("toggled");
    });
    $(".createProject").on('submit', (e) => {
        e.preventDefault();
        const name = $(".projectName").value;
        const des = $(".description").value;
        const memQuantity = $("memberQuantity").value;
        createProject({name,des,memQuantity});
    })
});




