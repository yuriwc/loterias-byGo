export class Lotofacil {
    private dezenas: Array<number>;
    private concurso: number;
    private acertos: number;

    constructor(dezenas: Array<number>, concurso: number) {
        this.validar(dezenas);
        this.dezenas = this.ordenaDezenas(dezenas);
        this.concurso = concurso;
        this.acertos = 0;
    }

    private validar(dezenas: Array<number>) {
        if (dezenas.length !== 15) {
            throw new Error("Deve ter exatamente 15 dezenas");
        }
        if (!dezenas.every(numero => numero >= 1 && numero <= 25)) {
            throw new Error("Dezenas devem estar entre 1 e 25");
        }
        if (new Set(dezenas).size !== dezenas.length) {
            throw new Error("Não pode ter dezenas repetidas");
        }
    }

    private ordenaDezenas(dezenas: Array<number>) {
        return dezenas.sort((a,b) => a - b)
    }

    incrementaAcerto() {
        this.acertos++;
    }

    get Dezenas() {
        return this.dezenas;
    }

    get Concurso() {
        return this.concurso;
    }

    get Acertos() {
        return this.acertos;
    }
}