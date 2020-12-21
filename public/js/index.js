import "@babel/polyfill";
import { login, logout } from "./login";
import { showAlert } from "./alert";
import { updateSettings } from "./updateSettings";
import { addUser } from "./addUser";
import { createProject } from "./createProject";
import { createTask } from "./createTask";
import { addMember } from "./addMember";
import { changeTaskStatus } from "./changeStatus";
import { deleteTask } from "./deleteTask";
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
const setStatus = document.querySelector(".set-status");
//Login and logout
if (loginForm) {
	loginForm.addEventListener("submit", (e) => {
		e.preventDefault();
		console.log("alo");
		let email = document.querySelector("#email");
		let password = document.querySelector("#password");
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
		let passwordCurrent = document.getElementById("passwordCurrent").value;
		let password = document.getElementById("password").value;
		let passwordConfirm = document.getElementById("passwordConfirm").value;
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
		let email = document.getElementById("email").value;
		let password = document.getElementById("password").value;
		let passwordConfirm = document.getElementById("passwordConfirm").value;
		addUser({ email, password, passwordConfirm });
	});
}
if (addMemberForm) {
	addMemberForm.addEventListener("submit", (e) => {
		const pattern = new RegExp(/\w+$/);
		const obj = pattern.exec(window.location.href);
		if (!obj) showAlert("Something went wrong! Check URL!", 401);
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
		const dueDate = $("input[name='dueDate']").val();
		const priority = $("#priority").val();
		const assignedMember = $("#assignedMember").val();
		const pattern = new RegExp(/\w+$/);
		const obj = pattern.exec(window.location.href);
		if (!obj) showAlert("Something went wrong! Check URL!", 401);
		const thisProjectName = obj[0];
		if (assignedMember == 0) showAlert("Please assign a member!", 400);
		else
			createTask(taskName, dueDate, priority, assignedMember, thisProjectName);
	});
}

if (setStatus) {
	setStatus.addEventListener("submit", (e) => {
		e.preventDefault();
		const taskId = $("#taskId").val();
		const status = $("#status").val();
		const pattern = new RegExp(/\w+$/);
		const obj = pattern.exec(window.location.href);
		if (!obj) showAlert("Something went wrong! Check URL!", 401);
		const thisProjectName = obj[0];
		console.log(taskId, status, thisProjectName);
		if (status == 0) showAlert("Please choose a status!", 400);
		changeTaskStatus(taskId, status, thisProjectName);
	});
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
	$(".delete-task").each(() => {
		var $this = $(this);
		$this.on("click", (e) => {
			e.preventDefault();
			if ($(e.currentTarget.activeElement).hasClass("delete-task")) {
				var i = $(e.currentTarget.activeElement).data("index");
				var col = $(e.currentTarget.activeElement).data("col");
				const taskId = document.querySelector(`#${col}${i}`).value;
				const pattern = new RegExp(/\w+$/);
				const obj = pattern.exec(window.location.href);
				const thisProjectName = obj[0];
				if (!obj) showAlert("Something went wrong! Check URL!", 401);
				deleteTask(taskId, thisProjectName);
			}
		});
	});
});
