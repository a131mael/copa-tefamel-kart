export type Piloto = {
  id: number;
  nome: string;
  numero: number;
  foto?: string;
};

export type Resultado = {
  pilotoId: number;
  posicao: number;
  pontos: number;
  voltaRapida?: boolean;
};

export type Etapa = {
  slug: string;
  numero: number;
  titulo: string;
  data: string;
  local: string;
  status: "realizada" | "proxima" | "futura";
  descricao?: string;
  fotos: string[];
  videos: string[];
  resultados: Resultado[];
};

// Totais reais após 3 etapas (atualizar com resultados por etapa quando disponível)
export const TOTAIS_REAIS: Record<number, number> = {
  1:  49, // Kauan Costa
  2:  39, // Alex Dutra
  3:  38, // Artur Milani
  4:  35, // Bernardo Gonçalves
  5:  32, // Ariel Fidencio
  6:  31, // Guilherme Santana
  7:  25, // Abimael Fidencio
  8:  20, // André Lobo
  9:  17, // Gabriel Gomes
  10: 16, // Paulo Laux
  11: 14, // Lucas Ferreira
  12:  6, // Thiago Marchi
  13:  5, // Vitor Corrêa
  14:  3, // Aldevino Fidencio
  15:  0, // José Neves
};

export const PONTUACAO = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

export const PILOTOS: Piloto[] = [
  { id: 1,  nome: "Kauan Costa",        numero: 1  },
  { id: 2,  nome: "Alex Dutra",         numero: 2  },
  { id: 3,  nome: "Artur Milani",       numero: 3  },
  { id: 4,  nome: "Bernardo Gonçalves", numero: 4  },
  { id: 5,  nome: "Ariel Fidencio",     numero: 5  },
  { id: 6,  nome: "Guilherme Santana",  numero: 6  },
  { id: 7,  nome: "Abimael Fidencio",   numero: 7  },
  { id: 8,  nome: "André Lobo",         numero: 8  },
  { id: 9,  nome: "Gabriel Gomes",      numero: 9  },
  { id: 10, nome: "Paulo Laux",         numero: 10 },
  { id: 11, nome: "Lucas Ferreira",     numero: 11 },
  { id: 12, nome: "Thiago Marchi",      numero: 12 },
  { id: 13, nome: "Vitor Corrêa",       numero: 13 },
  { id: 14, nome: "Aldevino Fidencio",  numero: 14 },
  { id: 15, nome: "José Neves",         numero: 15 },
];

export const ETAPAS: Etapa[] = [
  {
    slug: "etapa-1",
    numero: 1,
    titulo: "1ª Etapa",
    data: "2025-02-15",
    local: "Speedway Music Park — Palhoça, SC",
    status: "realizada",
    descricao: "Abertura do campeonato com largada emocionante e disputa acirrada nas primeiras voltas.",
    fotos: [],
    videos: [],
    resultados: [], // aguardando resultados por etapa
  },
  {
    slug: "etapa-2",
    numero: 2,
    titulo: "2ª Etapa",
    data: "2025-03-15",
    local: "Speedway Music Park — Palhoça, SC",
    status: "realizada",
    descricao: "",
    fotos: [],
    videos: [],
    resultados: [],
  },
  {
    slug: "etapa-3",
    numero: 3,
    titulo: "3ª Etapa",
    data: "2025-04-12",
    local: "Speedway Music Park — Palhoça, SC",
    status: "realizada",
    descricao: "",
    fotos: [],
    videos: [],
    resultados: [],
  },
  {
    slug: "etapa-4",
    numero: 4,
    titulo: "4ª Etapa",
    data: "2025-05-17",
    local: "Speedway Music Park — Palhoça, SC",
    status: "proxima",
    fotos: [],
    videos: [],
    resultados: [],
  },
  {
    slug: "etapa-5",
    numero: 5,
    titulo: "5ª Etapa",
    data: "2025-06-14",
    local: "Speedway Music Park — Palhoça, SC",
    status: "futura",
    fotos: [],
    videos: [],
    resultados: [],
  },
  {
    slug: "etapa-6",
    numero: 6,
    titulo: "6ª Etapa",
    data: "2025-07-12",
    local: "Speedway Music Park — Palhoça, SC",
    status: "futura",
    fotos: [],
    videos: [],
    resultados: [],
  },
  {
    slug: "etapa-7",
    numero: 7,
    titulo: "7ª Etapa",
    data: "2025-08-16",
    local: "Speedway Music Park — Palhoça, SC",
    status: "futura",
    fotos: [],
    videos: [],
    resultados: [],
  },
  {
    slug: "etapa-8",
    numero: 8,
    titulo: "8ª Etapa",
    data: "2025-09-13",
    local: "Speedway Music Park — Palhoça, SC",
    status: "futura",
    fotos: [],
    videos: [],
    resultados: [],
  },
  {
    slug: "etapa-9",
    numero: 9,
    titulo: "9ª Etapa",
    data: "2025-10-18",
    local: "Speedway Music Park — Palhoça, SC",
    status: "futura",
    fotos: [],
    videos: [],
    resultados: [],
  },
  {
    slug: "etapa-10",
    numero: 10,
    titulo: "10ª Etapa — Grande Final",
    data: "2025-11-15",
    local: "Speedway Music Park — Palhoça, SC",
    status: "futura",
    fotos: [],
    videos: [],
    resultados: [],
  },
];

export function getClassificacao() {
  const porEtapa: Record<number, Record<string, number>> = {};
  for (const p of PILOTOS) porEtapa[p.id] = {};

  for (const etapa of ETAPAS) {
    for (const res of etapa.resultados) {
      if (porEtapa[res.pilotoId] !== undefined) {
        porEtapa[res.pilotoId][etapa.slug] = res.pontos;
      }
    }
  }

  return PILOTOS.map((p) => {
    // Usa totais reais se existirem, senão soma das etapas
    const computado = Object.values(porEtapa[p.id] ?? {}).reduce((a, b) => a + b, 0);
    const total = TOTAIS_REAIS[p.id] ?? computado;
    return { piloto: p, total, porEtapa: porEtapa[p.id] ?? {} };
  }).sort((a, b) => b.total - a.total);
}
