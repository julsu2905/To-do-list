import axios from "axios";
import { showAlert } from "./alert";

export const createTask = (
	taskName,
	dueDate,
	priority,
	assignedMember,
	projectName
) => {
	const url = `http://pmware.herokuapp.com/api/projects/${projectName}`;
	axios({
		method: "PUT",
		url,
		data: {
			taskName,
			dueDate,
			priority,
			assignedMember,
		},
	})
		.then((res) => {
			if (res.data.status === "success") {
				showAlert("success", "Create successfully!");
				window.setTimeout(() => {
					location.assign(`/project/${projectName}`);
				}, 1500);
			}
		})
		.catch((err) => {
			showAlert("error", err.response.data.message);
		});
};
