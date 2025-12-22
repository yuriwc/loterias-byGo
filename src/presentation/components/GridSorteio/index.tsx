import { Button } from "@heroui/react";

interface GridSorteioProps {
  numerosSorteados: number[];
  onInserirDezena: (dezena: number) => void;
  onRemoverDezena?: (dezena: number) => void;
  disabled?: boolean;
}

export default function GridSorteio({
  numerosSorteados,
  onInserirDezena,
  onRemoverDezena,
  disabled = false
}: GridSorteioProps) {
  const numeros = Array.from({ length: 25 }, (_, i) => i + 1);

  const handleClick = (numero: number) => {
    if (disabled) return;

    const sorteado = numerosSorteados.includes(numero);

    if (sorteado && onRemoverDezena) {
      // Remove o número se já foi sorteado
      onRemoverDezena(numero);
    } else if (!sorteado) {
      // Adiciona o número se ainda não foi sorteado
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
          const podeRemover = sorteado && onRemoverDezena && !disabled;
          const podeAdicionar = !sorteado && !limiteAtingido && !disabled;

          return (
            <Button
              key={numero}
              variant={sorteado ? "primary" : "ghost"}
              size="lg"
              isDisabled={disabled || (!podeRemover && !podeAdicionar)}
              onClick={() => handleClick(numero)}
              className={`w-full aspect-square text-lg font-bold ${
                podeRemover ? 'cursor-pointer hover:opacity-80' : ''
              }`}
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
