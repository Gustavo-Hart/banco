let saldo = 0;
window.onload = (atualizarSaldo);

function atualizarSaldo () {

    const entradaDeposito=localStorage.getItem("entradaDeposito")
    document.getElementById('saldo').textContent = `Saldo: ${entradaDeposito}`;
};

document.getElementById('btnDeposito').addEventListener('click', function() {

    const valorDeposito = parseFloat(document.getElementById('valorDeposito').value);


    if (!isNaN(valorDeposito) && valorDeposito > 0) {
      saldo += valorDeposito;
        localStorage.setItem("entradaDeposito", saldo);
    
        console.log(saldo)
        atualizarSaldo();
        document.getElementById('valorDeposito').value = ''; // Limpa o campo de entrada
    } else {
        alert('Por favor, insira um valor válido para o depósito.');
    }
});
let pix;


i