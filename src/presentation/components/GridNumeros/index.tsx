import { Button } from "@heroui/react";

interface GridNumerosProps {
  dezenasSelecionadas: number[];
  onToggleDezena: (dezenas: number[]) => void;
  disabled?: boolean;
}

export default function GridNumeros({
  dezenasSelecionadas,
  onToggleDezena,
  disabled = false
}: GridNumerosProps) {
  const numeros = Array.from({ length: 25 }, (_, i) => i + 1);

  const toggleDezena = (numero: number) => {
    if (disabled) return;

    if (dezenasSelecionadas.includes(numero)) {
      // Remove se já está selecionado
      onToggleDezena(dezenasSelecionadas.filter((n) => n !== numero));
    } else {
      // Adiciona se ainda não atingiu o limite de 15
      if (dezenasSelecionadas.length < 15) {
        onToggleDezena([...dezenasSelecionadas, numero]);
      }
    }
  };

  const isSelecionado = (numero: number) => dezenasSelecionadas.includes(numero);
  const limiteAtingido = dezenasSelecionadas.length >= 15;

  return (
    <div className="flex flex-col gap-4">
      {/* Contador */}
      <div className="text-center">
        <p className="text-lg font-semibold">
          Dezenas Selecionadas: {dezenasSelecionadas.length}/15
        </p>
      </div>

      {/* Grid 5x5 */}
      <div className="grid grid-cols-5 gap-2">
        {numeros.map((numero) => {
          const selecionado = isSelecionado(numero);
          return (
            <Button
              key={numero}
              variant={selecionado ? "primary" : "ghost"}
              size="lg"
              isDisabled={disabled || (!selecionado && limiteAtingido)}
              onClick={() => toggleDezena(numero)}
              className="w-full aspect-square text-lg font-bold"
            >
              {numero}
            </Button>
          );
        })}
      </div>

      {/* Preview das dezenas ordenadas */}
      {dezenasSelecionadas.length > 0 && (
        <div className="text-center">
          <p className="text-sm text-gray-600">Dezenas ordenadas:</p>
          <p className="text-md font-mono">
            {[...dezenasSelecionadas].sort((a, b) => a - b).join(" - ")}
          </p>
        </div>
      )}
    </div>
  );
}
