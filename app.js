const resultado = document.querySelector(".display");
const botoes = document.querySelectorAll(".botoes button");


console.log(botoes)

let numeroAtual = "";
let primeiroOperador = null;
let operador = null;
let reset = false;




botoes.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonText = button.innerText;
    if (/^[0-9,]+$/.test(buttonText)) {
      addDigito(buttonText);
    } else if (["+", "-", "x", "÷"].includes(buttonText)) {
      setOperador(buttonText);
    } else if (buttonText === "=") {
      calculo();
    } else if (buttonText === "C") {
      limpaCalculadora();
    } else if (buttonText === "±") {
      numeroAtual = (
        parseFloat(numeroAtual || primeiroOperador) * -1
      ).toString();
      atualizaResultado();
    } else if (buttonText === "%") {
      setPorcentagem();
    }
  });
});


function atualizaResultado(origemLimpa = false) {
  resultado.innerText = origemLimpa ? 0 : numeroAtual.replace(".", ",");
}

function addDigito(digito) {
  if (digito === "," && (numeroAtual.includes(",") || !numeroAtual)) return;

  if (reset) {
    numeroAtual = digito;
    reset = false;
  } else {
    numeroAtual += digito;
  }

  atualizaResultado();
}

function setOperador(newOperator) {
  if (numeroAtual) {
    calculo();

    primeiroOperador = parseFloat(numeroAtual.replace(",", "."));
    numeroAtual = "";
  }

  operador = newOperator;
}

function calculo() {
  if (operador === null || primeiroOperador === null) return;
  let segundoOperador = parseFloat(numeroAtual.replace(",", "."));
  let valorResultado;

  switch (operador) {
    case "+":
      valorResultado = primeiroOperador + segundoOperador;
      break;
    case "-":
      valorResultado = primeiroOperador - segundoOperador;
      break;
    case "x":
      valorResultado = primeiroOperador * segundoOperador;
      break;
    case "÷":
      valorResultado = primeiroOperador / segundoOperador;
      break;
    default:
      return;
  }

  if (valorResultado.toString().split(".")[1]?.length > 5) {
    numeroAtual = parseFloat(valorResultado.toFixed(5)).toString();
  } else {
    numeroAtual = valorResultado.toString();
  }

  operador = null;
  primeiroOperador = null;
  reset = true;
  percentageValue = null;
  atualizaResultado();
}

function setPorcentagem() {
  let resultado = parseFloat(numeroAtual) / 100;

  if (["+", "-"].includes(operador)) {
    resultado = resultado * (primeiroOperador || 1);
  }

  if (resultado.toString().split(".")[1]?.length > 5) {
    resultado = resultado.toFixed(5).toString();
  }

  numeroAtual = resultado.toString();
  atualizaResultado();
}

function limpaCalculadora() {
  numeroAtual = "";
  primeiroOperador = null;
  operador = null;
  atualizaResultado(true);
}