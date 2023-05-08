console.log('Calc loaded');

document.querySelector('.calc-calculate').addEventListener('click', function () {
	const numl=document.querySelector('[name="num1"]').value;
	const numl=document.querySelector('[name="num2"]').value;
	
	const sum = num1 + num2;
	
	document.querySelector('.calc-result').innerText = sum;
});