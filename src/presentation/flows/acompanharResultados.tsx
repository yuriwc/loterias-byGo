import GridSorteio from "../components/GridSorteio";
import ListaApostasComAcertos from "../components/ListaApostasComAcertos";
import { useApostas } from "../hooks/useApostas";

export default function AcompanharResultados() {
  const { concursoAtual, apostas, inserirDezena } = useApostas();

  const numerosSorteados = concursoAtual?.sorteados || [];
  const sorteioCompleto = numerosSorteados.length === 15;

  const handleInserirDezena = (dezena: number) => {
    try {
      inserirDezena(dezena);
    } catch (error) {
      console.error("Erro ao inserir dezena:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Cabeçalho */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Lotofácil
          </h1>
          <p className="text-gray-600">Acompanhar Resultados</p>
          {concursoAtual && (
            <p className="text-lg font-semibold text-primary mt-2">
              Concurso #{concursoAtual.concurso}
            </p>
          )}
        </div>

        {!concursoAtual ? (
          // Mensagem quando não há concurso ativo
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-gray-600 text-lg">
              Nenhum concurso ativo no momento.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Crie um concurso e adicione apostas primeiro.
            </p>
          </div>
        ) : (
          <>
            {/* Card de Sorteio */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                Inserir Números Sorteados
              </h2>
              <GridSorteio
                numerosSorteados={numerosSorteados}
                onInserirDezena={handleInserirDezena}
                disabled={sorteioCompleto}
              />

              {sorteioCompleto && (
                <div className="mt-4 p-4 bg-green-100 border border-green-500 rounded-lg text-center">
                  <p className="text-green-800 font-semibold">
                    ✓ Sorteio completo! Confira os resultados abaixo.
                  </p>
                </div>
              )}
            </div>

            {/* Card de Apostas com Acertos */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <ListaApostasComAcertos
                apostas={apostas}
                numerosSorteados={numerosSorteados}
              />
            </div>

            {/* Legendas */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-sm font-semibold mb-3 text-gray-700">
                Legenda de Premiação:
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-100 border-2 border-green-500 rounded"></div>
                  <span>15 acertos</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-100 border-2 border-blue-500 rounded"></div>
                  <span>13-14 acertos</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-100 border-2 border-yellow-500 rounded"></div>
                  <span>11-12 acertos</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-100 border-2 border-gray-300 rounded"></div>
                  <span>Sem prêmio</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
