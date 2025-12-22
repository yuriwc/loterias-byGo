import { useApostasStore } from "../../stores/apostas";
import { Lotofacil } from "../../../domain/model/lotofacil";

/**
 * Hook customizado para gerenciar apostas
 *
 * Este hook encapsula a lógica do store Zustand e fornece
 * uma interface mais amigável para os componentes
 */
export function useApostas() {
  // Conecta com o store Zustand
  const store = useApostasStore();

  /**
   * Cria um novo concurso
   * @param numeroConcurso - Número do concurso a ser criado
   */
  const criarConcurso = (numeroConcurso: number) => {
    store.criarConcurso(numeroConcurso);
  };

  /**
   * Adiciona uma nova aposta ao concurso atual
   * @param dezenas - Array com as 15 dezenas selecionadas
   */
  const adicionarAposta = (dezenas: number[]) => {
    if (!store.concursoAtual) {
      throw new Error("Nenhum concurso ativo");
    }

    // Cria a instância de Lotofacil com as dezenas
    const lotofacil = new Lotofacil(dezenas, store.concursoAtual.concurso);

    // Adiciona ao store
    store.adicionarAposta(lotofacil);
  };

  /**
   * Insere uma dezena sorteada no concurso atual
   * @param dezena - Número da dezena sorteada
   */
  const inserirDezena = (dezena: number) => {
    store.inserirDezena(dezena);
  };

  /**
   * Remove uma dezena sorteada do concurso atual
   * @param dezena - Número da dezena a ser removida
   */
  const removerDezena = (dezena: number) => {
    store.removerDezena(dezena);
  };

  /**
   * Limpa todas as apostas do concurso atual
   */
  const limparApostas = () => {
    store.limparApostas();
  };

  /**
   * Reseta todo o estado (concurso e apostas)
   */
  const resetar = () => {
    store.resetar();
  };

  // Retorna o estado e as funções
  return {
    // Estado
    concursoAtual: store.concursoAtual,
    apostas: store.apostas,

    // Computed values (valores derivados)
    temConcursoAtivo: store.concursoAtual !== null,
    quantidadeApostas: store.apostas.length,

    // Funções
    criarConcurso,
    adicionarAposta,
    inserirDezena,
    removerDezena,
    limparApostas,
    resetar,
  };
}
