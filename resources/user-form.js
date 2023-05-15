function displayToken(token) {
	const form = document.querySelector('.user-form');
	const newDiv = document.createElement('div');
	newDiv.classList.add("user-token");
	newDiv.innerText = "The token is: " + token;
	
	form.parentNode.replaceChild(newDiv, form);
}

document.querySelector('.user-form').addEventListener('submit', function (event) {
	const email = document.querySelector('.user-form [name="email"]').value;
	const password = document.querySelector('.user-form [name="password"]').value;
	const passwordConfirm = document.querySelector('.user-form [name="password_confirm"]').value;
	
	if (password !== passwordConfirm) {
			alert ('Passwords do not match');
		} else {
			fetch('https://reqres.in/api/register', {
				method: 'post',
				body: JSON.stringify ( {
					username:email,
					password:password,
				}),
			headers: {
				'Content-Type': 'application/json',
			},
			}).then(function (response) {
				response.json().then(function (data) {
					if (data.error); {
				} else if (data.token) {
					//do smth
					displayToken(data.token);
				} else {
					alert('Got unknown response');
				}
				});
				}) 
				
			}).catch(function (error){
				alert('Unknown error while sending the request!');
		});
		}
	event.preventDefault();
});