import SeletorConcurso from "../components/seletor-concurso";
import GridNumeros from "../components/GridNumeros";
import { Button } from "@heroui/react";
import { useApostas } from "../hooks/useApostas";
import { useState } from "react";

export default function InserirAposta() {
  // Hook customizado para gerenciar apostas
  const { concursoAtual, apostas, criarConcurso, adicionarAposta } = useApostas();

  // Estado local para as dezenas selecionadas (antes de virar aposta)
  const [dezenasSelecionadas, setDezenasSelecionadas] = useState<number[]>([]);

  const handleAdicionarAposta = () => {
    if (dezenasSelecionadas.length === 15) {
      adicionarAposta(dezenasSelecionadas);
      setDezenasSelecionadas([]); // Limpa seleção após adicionar
    }
  };

  const handleLimparSelecao = () => {
    setDezenasSelecionadas([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Cabeçalho */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Lotofácil
          </h1>
          <p className="text-gray-600">Criar nova aposta</p>
        </div>

        {/* Card Principal */}
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          {/* Seletor de Concurso */}
          <div className="pb-4 border-b border-gray-200">
            <SeletorConcurso onCriarConcurso={criarConcurso} />
          </div>

          {/* Grid de Números */}
          <div>
            <GridNumeros
              dezenasSelecionadas={dezenasSelecionadas}
              onToggleDezena={(dezenas) => setDezenasSelecionadas(dezenas)}
              disabled={!concursoAtual}
            />
          </div>

          {/* Ações */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Button
              variant="primary"
              className="flex-1"
              onClick={handleAdicionarAposta}
              isDisabled={!concursoAtual || dezenasSelecionadas.length !== 15}
            >
              Adicionar Aposta
            </Button>
            <Button
              variant="secondary"
              className="flex-1"
              onClick={handleLimparSelecao}
              isDisabled={dezenasSelecionadas.length === 0}
            >
              Limpar Seleção
            </Button>
          </div>
        </div>

        {/* Lista de Apostas */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            Apostas Criadas ({apostas.length})
          </h2>
          {apostas.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Nenhuma aposta criada ainda
            </p>
          ) : (
            <div className="space-y-3">
              {apostas.map((aposta, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <p className="text-sm text-gray-600 mb-2">
                    Aposta #{index + 1}
                  </p>
                  <p className="font-mono text-lg">
                    {aposta.Dezenas.join(" - ")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
