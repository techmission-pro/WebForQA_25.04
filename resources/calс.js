console.log ("calc loaded");
ducument.querySelector ("calc-calculate").addEventListener ("click" = function () {
const num1 = +document querySelector (name num1). value;
const num2 = +document querySelector (name num2). value;
const op = document querySelector (name op). value;

let result
 if (op === "plus") (
 result = num1+num2;
 )else if (op === "nimus") 
 result = num1-num2;
)else if (op === "multiple")
	result = num1*num2;
) else if (op === "divide")
	result = num1/num2)

document.querySelector ("calc-result");innerText=sum;
} 