const conta1 = [];
let myConta1;
let myconta2;

class contaBancaria{
    cosnructor(NomeTitular, SaldoConta, NumeroConta){
        this._nome = NomeTitular;
        this._saldo = SaldoConta;
        this._numeroconta = NumeroConta;
    }

    get nome(){
        return this._nome;
    }
    set nome(nomeDoTitular){
        this._nome = nomeDoTitular;
    }
    get saldo(){
        return this._saldo;s
    }
    set saldo(valorSado){
        this._saldo = valorSado;
    }
    get numconta(){
        return this._numeroconta;
    }
    set numconta(numIdConta){
        this._numeroconta = numIdConta;
    }
}



window.addEventListener  ("loade",saldoInicial(),atualizaSaldoDeposito() );

function atualizaSaldoDeposito(){
    
    // Recupera o valor do depósito armazenado no localStorage 
    const valorAfterDeposito = localStorage.getItem('afterDeposito');
    //alert("valor deposito " + valorDeposito)
    
    if(valorAfterDeposito){
        localStorage.setItem('saldoAtual', valorAfterDeposito)
        
        const myConta1 = new contaBancaria();  
        myConta1._saldo = valorAfterDeposito;
        
        //conta1.splice(2,1,myConta1._saldo);
    
        document.getElementById('saldo').textContent = myConta1._saldo;
    }
}

function saldoInicial(){
    let saldoInicio = 0;
    //if(inicialSaldo){
        const myConta1 = new contaBancaria();  
        myConta1._saldo = saldoInicio;
        conta1.splice(2,1,myConta1._saldo);
    
        document.getElementById('saldo').textContent = myConta1._saldo.toFixed(2);  
    //} 
}