import {create} from 'zustand'
import { persist } from 'zustand/middleware'
import { Concurso } from '../../../domain/model/concurso'
import { Lotofacil } from '../../../domain/model/lotofacil'

interface ApostasStore {
    //Estado
    concursoAtual: Concurso | null;
    apostas: Lotofacil[];

    //Actions
    criarConcurso: (numeroConcurso: number) => void;
    adicionarAposta: (lotofacil: Lotofacil) => void;
    inserirDezena: (dezena: number) => void;
    limparApostas: () => void;
    resetar: () => void;
}

// Tipos para serialização
interface SerializedConcurso {
    numeroConcurso: number;
    numerosSorteados: number[];
}

interface SerializedAposta {
    dezenas: number[];
    concurso: number;
    acertos: number;
}

// Serialização customizada para classes
const customStorage = {
    getItem: (name: string) => {
        const str = localStorage.getItem(name)
        if (!str) return null

        try {
            const { state } = JSON.parse(str)

            // Reconstruir as instâncias de classes
            if (state.concursoAtual) {
                const concurso = new Concurso(state.concursoAtual.numeroConcurso)
                // Restaurar números sorteados
                state.concursoAtual.numerosSorteados.forEach((n: number) => {
                    try {
                        concurso.inserirDezena(n)
                    } catch {
                        // Ignora erros de validação ao restaurar
                    }
                })
                state.concursoAtual = concurso
            }

            if (state.apostas) {
                state.apostas = state.apostas.map((a: SerializedAposta) =>
                    new Lotofacil(a.dezenas, a.concurso)
                )
            }

            return { state }
        } catch {
            return null
        }
    },
    setItem: (name: string, value: { state: ApostasStore }) => {
        const { state } = value

        // Serializar para JSON puro
        const serialized = {
            state: {
                concursoAtual: state.concursoAtual ? {
                    numeroConcurso: state.concursoAtual.concurso,
                    numerosSorteados: state.concursoAtual.sorteados,
                } as SerializedConcurso : null,
                apostas: state.apostas.map((a: Lotofacil) => ({
                    dezenas: a.Dezenas,
                    concurso: a.Concurso,
                    acertos: a.Acertos
                } as SerializedAposta))
            }
        }

        localStorage.setItem(name, JSON.stringify(serialized))
    },
    removeItem: (name: string) => localStorage.removeItem(name)
}

export const useApostasStore = create<ApostasStore>()(
    persist(
        (set, get) => ({
            //Estado Inicial
            concursoAtual: null,
            apostas: [],

            // CRIAR NOVO CONCURSO
            criarConcurso: (numeroConcurso: number) => {
                const concurso = new Concurso(numeroConcurso);
                set({concursoAtual: concurso, apostas: []})
            },

            //ADICIONAR APOSTA AO CONCURSO ATUAL
            adicionarAposta: (lotofacil: Lotofacil) => {
                const { concursoAtual } = get();
                if(!concursoAtual) {
                    throw new Error("Nenhum concurso ativo")
                }

                concursoAtual.criarApostaLotofacil(lotofacil);
                set((state) => ({
                    apostas: [...state.apostas, lotofacil]
                }))
            },

            inserirDezena: (dezena: number) => {
                const {concursoAtual, apostas} = get();  // ← Pegar apostas também
                if(!concursoAtual) {
                    throw new Error("Nenhum concurso ativo.")
                }

                concursoAtual.inserirDezena(dezena);
                // Atualiza concurso E apostas (que foram modificadas internamente)
                set({ concursoAtual, apostas: [...apostas] });  // ← Spread apostas
            },

            // Limpar todas as apostas
            limparApostas: () => {
                const { concursoAtual } = get();
                if (concursoAtual) {
                    // Criar novo concurso vazio com mesmo número
                    const novoConcurso = new Concurso(concursoAtual.concurso);
                    set({ concursoAtual: novoConcurso, apostas: [] });
                } else {
                    set({ apostas: [] });
                }
            },
            //resetar
            resetar: () => {
                set({concursoAtual: null, apostas: [] })
            },
        }),
        {
            name: 'lotofacil-apostas-storage',
            storage: customStorage,
        }
    )
)