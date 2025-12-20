import type { Lotofacil } from "../lotofacil";

export class Concurso {
    private numerosSorteados: Array<number>
    private numeroConcurso: number;
    private apostas: Array<Lotofacil>

    constructor(numeroConcurso: number) {
        this.numeroConcurso = numeroConcurso;
        this.numerosSorteados = [];
        this.apostas = [];
    }
    

    validaNumerosSorteados() {
        return this.numerosSorteados.length < 15;
    }

    validaDezena(dezena: number) {
        return dezena >= 1 && dezena <= 25 && !this.numerosSorteados.includes(dezena)
    }

    inserirDezena(dezena: number) {
        if (!this.validaNumerosSorteados() || !this.validaDezena(dezena)) 
            throw new Error ('Erro ao inserir a dezena')
        this.numerosSorteados.push(dezena)

        //Varrer
        this.apostas.forEach(aposta => {
            if (aposta.Dezenas.includes(dezena)) {
                aposta.incrementaAcerto();
            }
        })
    }

    criarApostaLotofacil(lotofacil: Lotofacil) {
    if (lotofacil.Concurso !== this.numeroConcurso) {
        throw new Error("Aposta é de outro concurso");
    }
    this.apostas.push(lotofacil);
}

    get sorteados() {
        return this.numerosSorteados;
    }

    get Apostas() {
        return this.apostas;
    }

    get concurso() {
        return this.numeroConcurso;
    }
}