import { Input, Button } from "@heroui/react";
import { useState } from "react";

interface SeletorConcursoProps {
  onCriarConcurso: (numero: number) => void;
}

export default function SeletorConcurso({ onCriarConcurso }: SeletorConcursoProps) {
  const [numeroConcurso, setNumeroConcurso] = useState<string>("");

  const handleCriarConcurso = () => {
    const numero = parseInt(numeroConcurso);
    if (numero && numero > 0) {
      onCriarConcurso(numero);
      setNumeroConcurso(""); // Limpa o input após criar
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <label className="text-sm font-medium">Número do Concurso</label>
      <div className="flex gap-2 items-center">
        <Input
          type="number"
          aria-label="Número do Concurso"
          placeholder="Ex: 3200"
          value={numeroConcurso}
          onChange={(e) => setNumeroConcurso(e.target.value)}
          className="flex-1"
        />
        <Button
          variant="primary"
          onClick={handleCriarConcurso}
          isDisabled={!numeroConcurso || parseInt(numeroConcurso) <= 0}
        >
          Criar Concurso
        </Button>
      </div>
    </div>
  );
}
