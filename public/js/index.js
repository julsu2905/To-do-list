import "@babel/polyfill";
import { login, logout } from "./login";
import { showAlert } from "./alert";
import { updateSettings } from "./updateSettings";
import { addUser } from "./addUser";
import { createProject } from "./createProject";
import { createTask } from "./createTask";
import { addMember } from "./addMember";
import { changeTaskAssign } from "./changeAssign";
import { changeTaskStatus } from "./changeStatus";
require("events").EventEmitter.prototype._maxListeners = 100;

//DOM ELEMENT
const loginForm = document.querySelector(".form-login");
const logOutBtn = document.querySelector(".logout");
const adminDataForm = document.querySelector(".form-admin-data");
const adminPasswordForm = document.querySelector(".form-admin-password");
const signupForm = document.querySelector(".form-signup");
const addMemberForm = document.querySelector(".add-member");
const addTask = document.querySelector(".add-task");
const createProjectForm = document.querySelector(".createProject");
const changeStatus = document.querySelector(".change-status");
const changeAssign = document.querySelector("change-assign");

//Login and logout
if (loginForm) {
	loginForm.addEventListener("submit", (e) => {
		e.preventDefault();
		console.log("alo");
		const email = document.querySelector("#email");
		const password = document.querySelector("#password");
		login(email.value, password.value);
	});
}

if (logOutBtn) {
	logOutBtn.addEventListener("click", logout);
}

if (adminDataForm) {
	adminDataForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const form = new FormData();
		form.append("username", document.getElementById("username").value);
		form.append("email", document.getElementById("email").value);
		form.append("photo", document.getElementById("photo").files[0]);
		updateSettings(form, "data");
	});
}

if (adminPasswordForm) {
	adminPasswordForm.addEventListener("submit", async (e) => {
		e.preventDefault();
		document.querySelector(".btn-save-password").textContent = "Updating...";
		const passwordCurrent = document.getElementById("passwordCurrent").value;
		const password = document.getElementById("password").value;
		const passwordConfirm = document.getElementById("passwordConfirm").value;
		await updateSettings(
			{ passwordCurrent, password, passwordConfirm },
			"password"
		);
		document.querySelector(".btn-save-password").textContent = "Save password";
		document.getElementById("passwordCurrent").value = "";
		document.getElementById("password").value = "";
		document.getElementById("passwordConfirm").value = "";
	});
}

if (signupForm) {
	signupForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const email1 = document.getElementById("email").value;
		const password1 = document.getElementById("password").value;
		const passwordConfirm1 = document.getElementById("passwordConfirm").value;
		console.log(email1);
		console.log(password1);
		console.log(passwordConfirm1);
		addUser({ email1, password1, passwordConfirm1 });
	});
}
if (addMemberForm) {
	addMemberForm.addEventListener("submit", (e) => {
		const pattern = new RegExp(/\w+$/);
		const obj = pattern.exec(window.location.href);
		const InProjectName = obj[0];
		const email = document.getElementById("username").value;
		console.log(email, InProjectName);
		addMember(email, InProjectName);
		e.preventDefault();
	});
}
if (createProjectForm) {
	createProjectForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const projectName = $("input[name='projectName']").val();
		const description = $("input[name='description']").val();
		const memberQuantity = $("input[name='memberQuantity']").val();
		console.log({ projectName, description, memberQuantity });
		createProject({ projectName, description, memberQuantity });
	});
}
if (addTask) {
	addTask.addEventListener("submit", (e) => {
		e.preventDefault();
		const taskName = $("input[name='taskName']").val();
		const dueDate = $("input[name='dueDate']").val().date();
		const priority = $("#priority").val();
		const assignedMember = $("#assignedMember").val();
		const pattern = new RegExp(/\w+$/);
		const obj = pattern.exec(window.location.href);
		const thisProjectName = obj[0];
		if (assignedMember == 0) showAlert("Please assign a member!", 400);
		else
			createTask(taskName, dueDate, priority, assignedMember, thisProjectName);
	});
}
if(changeStatus){
	changeStatus.addEventListener('drop', (e) =>{
		e.preventDefault();
		const taskId = "";
		const status = "";
		const pattern = new RegExp(/\w+$/);
		const obj = pattern.exec(window.location.href);
		const thisProjectName = obj[0];
		changeTaskStatus(taskId,status,thisProjectName);
	})
}
if(changeAssign){
	changeAssign.addEventListener('submit', (e) =>{
		e.preventDefault();
		const taskId ="";
		const assignee = "";
		const pattern = new RegExp(/\w+$/);
		const obj = pattern.exec(window.location.href);
		const thisProjectName = obj[0];
		changeTaskAssign(taskId, assignee,thisProjectName); 
	})
}
//Page Admin
jQuery(function ($) {
	$(".sidebar-dropdown > a").click(function () {
		$(".sidebar-submenu").slideUp(200);
		if ($(this).parent().hasClass("active")) {
			$(".sidebar-dropdown").removeClass("active");
			$(this).parent().removeClass("active");
		} else {
			$(".sidebar-dropdown").removeClass("active");
			$(this).next(".sidebar-submenu").slideDown(200);
			$(this).parent().addClass("active");
		}
	});

	$("#close-sidebar").click(function () {
		$(".page-wrapper").removeClass("toggled");
	});
	$("#show-sidebar").click(function () {
		$(".page-wrapper").addClass("toggled");
	});
});
