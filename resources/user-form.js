document.querySelector('.user-form').addEventListener('submit', function (event) {
	const password = document.querySelector('.user-form [name="password"]').value;
	const passwordConfirm = document.querySelector('.user-form [name="password_confirm"]').value;
	
	if (password !== passwordConfirm) {
			alert ('Passwords do not match');
		}
	event.preventDefault();
});