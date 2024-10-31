//let saldo = 0;


const bttdeposito = document.getElementById('btnDeposito');

bttdeposito.addEventListener('click', deposito); 

function deposito(){

    const valorDeposito = document.getElementById('input-deposito').value;
    //const xDeposito = valorDeposito
    localStorage.setItem("entradaDeposito", valorDeposito);
    console.log(valorDeposito);

   
    

    //if (!isNaN(valorDeposito) && valorDeposito > 0) {
}
    
        //console.log(saldo)
        //atualizarSaldo();
        //document.getElementById('valorDeposito').value = ''; // Limpa o campo de entrada
    //} else {
       // alert('Por favor, insira um valor válido para o depósito.');
    //}

