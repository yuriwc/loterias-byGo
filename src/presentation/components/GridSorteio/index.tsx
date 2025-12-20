import { Button } from "@heroui/react";

interface GridSorteioProps {
  numerosSorteados: number[];
  onInserirDezena: (dezena: number) => void;
  disabled?: boolean;
}

export default function GridSorteio({
  numerosSorteados,
  onInserirDezena,
  disabled = false
}: GridSorteioProps) {
  const numeros = Array.from({ length: 25 }, (_, i) => i + 1);

  const handleClick = (numero: number) => {
    if (disabled) return;

    // Só permite adicionar se o número ainda não foi sorteado
    if (!numerosSorteados.includes(numero)) {
      onInserirDezena(numero);
    }
  };

  const isSorteado = (numero: number) => numerosSorteados.includes(numero);
  const limiteAtingido = numerosSorteados.length >= 15;

  return (
    <div className="flex flex-col gap-4">
      {/* Contador */}
      <div className="text-center">
        <p className="text-lg font-semibold">
          Números Sorteados: {numerosSorteados.length}/15
        </p>
      </div>

      {/* Grid 5x5 */}
      <div className="grid grid-cols-5 gap-2">
        {numeros.map((numero) => {
          const sorteado = isSorteado(numero);
          return (
            <Button
              key={numero}
              variant={sorteado ? "primary" : "ghost"}
              size="lg"
              isDisabled={disabled || (sorteado || limiteAtingido)}
              onClick={() => handleClick(numero)}
              className="w-full aspect-square text-lg font-bold"
            >
              {numero}
            </Button>
          );
        })}
      </div>

      {/* Preview dos números sorteados ordenados */}
      {numerosSorteados.length > 0 && (
        <div className="text-center">
          <p className="text-sm text-gray-600">Números sorteados (ordem):</p>
          <p className="text-md font-mono">
            {[...numerosSorteados].sort((a, b) => a - b).join(" - ")}
          </p>
        </div>
      )}
    </div>
  );
}
