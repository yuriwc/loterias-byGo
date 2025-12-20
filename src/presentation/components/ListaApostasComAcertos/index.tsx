import type { Lotofacil } from "../../../domain/model/lotofacil";

interface ListaApostasComAcertosProps {
  apostas: Lotofacil[];
  numerosSorteados: number[];
}

export default function ListaApostasComAcertos({
  apostas,
  numerosSorteados
}: ListaApostasComAcertosProps) {
  // Função para verificar se uma dezena foi sorteada
  const foiSorteada = (dezena: number) => numerosSorteados.includes(dezena);

  // Função para obter cor baseada na quantidade de acertos
  const getCorAcertos = (acertos: number) => {
    if (acertos === 15) return "bg-green-100 border-green-500";
    if (acertos >= 13) return "bg-blue-100 border-blue-500";
    if (acertos >= 11) return "bg-yellow-100 border-yellow-500";
    return "bg-gray-100 border-gray-300";
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          Apostas ({apostas.length})
        </h2>
        {numerosSorteados.length === 15 && (
          <p className="text-sm text-gray-600">
            Sorteio completo!
          </p>
        )}
      </div>

      {apostas.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          Nenhuma aposta cadastrada
        </p>
      ) : (
        <div className="space-y-3">
          {apostas.map((aposta, index) => (
            <div
              key={index}
              className={`p-4 border-2 rounded-lg ${getCorAcertos(aposta.Acertos)}`}
            >
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm font-medium text-gray-700">
                  Aposta #{index + 1}
                </p>
                <p className="text-lg font-bold">
                  {aposta.Acertos} acerto{aposta.Acertos !== 1 ? 's' : ''}
                </p>
              </div>

              {/* Grid de dezenas da aposta */}
              <div className="flex flex-wrap gap-2">
                {aposta.Dezenas.map((dezena) => (
                  <span
                    key={dezena}
                    className={`
                      inline-flex items-center justify-center
                      w-10 h-10 rounded-lg font-mono font-bold text-sm
                      ${foiSorteada(dezena)
                        ? 'bg-green-500 text-white'
                        : 'bg-white text-gray-700 border border-gray-300'
                      }
                    `}
                  >
                    {dezena}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
