const readline = require('readline');

class ContaBancaria {
    static contas = [];
    static contadorContas = 1;

    constructor(titular, saldoInicial) {
        this.titular = titular;
        this.saldo = saldoInicial;
        this.numeroConta = ContaBancaria.contadorContas++;

        ContaBancaria.contas.push(this);
    }

    deposito(valor) {
        this.saldo += valor;
    }

    saque(valor) {
        if (valor > this.saldo) {
            console.log('Saldo Insuficiente');
            return;
        }
        this.saldo -= valor;
    }

    consultarSaldo() {
        console.log(`Saldo atual: ${this.saldo}`);
    }

    static criarConta(titular, saldoInicial) {
        return new ContaBancaria(titular, saldoInicial);
    }

    static getContaPorNumero(numeroConta) {
        return ContaBancaria.contas.find(conta => conta.numeroConta === numeroConta);
    }

    static listarContas() {
        console.log('Lista de Contas:');
        ContaBancaria.contas.forEach(conta => {
            console.log(`Código da conta: ${conta.numeroConta}, Titular: ${conta.titular}, Saldo: ${conta.saldo}`);
        });
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function pergunta(texto) {
    return new Promise(resolve => {
        rl.question(texto, resolve);
    });
}

async function obterValorValidado(mensagem) {
    let valor;
    while (true) {
        const entrada = await pergunta(mensagem);
        valor = parseFloat(entrada);
        if (!isNaN(valor) && valor > 0) {
            return valor;
        }
        console.log('Entrada inválida. Por favor, insira um número válido maior que zero.');
    }
}

async function obterSaldoInicial() {
    return await obterValorValidado('Saldo inicial: ');
}

async function menu() {
    let opcao;
    do {
        console.log('1 - Criar nova conta');
        console.log('2 - Depositar');
        console.log('3 - Sacar');
        console.log('4 - Consultar saldo');
        console.log('5 - Listar todas as contas');
        console.log('6 - Sair');

        opcao = await pergunta('Escolha uma opção: ');

        switch (opcao) {
            case '1':
                const titular = await pergunta('Nome do titular: ');
                const saldoInicial = await obterSaldoInicial();
                const novaConta = ContaBancaria.criarConta(titular, saldoInicial);
                console.log(`Conta criada com sucesso! Número da conta: ${novaConta.numeroConta}`);
                break;
            case '2':
                const numeroDeposito = parseInt(await pergunta('Número da conta: '));
                const contaDeposito = ContaBancaria.getContaPorNumero(numeroDeposito);
                if (contaDeposito) {
                    const valorDeposito = await obterValorValidado('Valor a depositar: ');
                    contaDeposito.deposito(valorDeposito);
                    console.log(`Depósito de ${valorDeposito} realizado com sucesso!`);
                } else {
                    console.log('Conta não encontrada.');
                }
                break;
            case '3':
                const numeroSaque = parseInt(await pergunta('Número da conta: '));
                const contaSaque = ContaBancaria.getContaPorNumero(numeroSaque);
                if (contaSaque) {
                    const valorSaque = await obterValorValidado('Valor a sacar: ');
                    contaSaque.saque(valorSaque);
                    if (valorSaque <= contaSaque.saldo) {
                        console.log(`Saque de ${valorSaque} realizado com sucesso!`);
                    }
                } else {
                    console.log('Conta não encontrada.');
                }
                break;
            case '4':
                const numeroConsulta = parseInt(await pergunta('Número da conta: '));
                const contaConsulta = ContaBancaria.getContaPorNumero(numeroConsulta);
                if (contaConsulta) {
                    contaConsulta.consultarSaldo();
                } else {
                    console.log('Conta não encontrada.');
                }
                break;
            case '5':
                ContaBancaria.listarContas();
                break;
            case '6':
                console.log('Saindo...');
                break;
            default:
                console.log('Opção inválida. Tente novamente.');
        }
    } while (opcao !== '6');
    rl.close();
}

menu();
