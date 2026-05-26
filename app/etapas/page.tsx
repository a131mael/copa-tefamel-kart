import Link from "next/link";
import { ETAPAS, PILOTOS } from "@/lib/data";

function formatDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function EtapasPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Etapas</h1>
      <div className="h-0.5 w-16 bg-[#F2C200] mb-8" />

      <div className="space-y-4">
        {ETAPAS.map((etapa) => {
          const vencedor = etapa.resultados.find((r) => r.posicao === 1);
          const pilotoVencedor = vencedor ? PILOTOS.find((p) => p.id === vencedor.pilotoId) : null;

          return (
            <Link
              key={etapa.slug}
              href={`/etapas/${etapa.slug}`}
              className={`block rounded-xl border p-5 transition-all hover:border-[#F2C200] group ${
                etapa.status === "realizada"
                  ? "border-[#3A3A45] bg-[#2A2A32]"
                  : etapa.status === "proxima"
                  ? "border-[#F2C200] bg-[#2A2A32]"
                  : "border-[#3A3A45] bg-[#1E1E24] opacity-60 hover:opacity-100"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm flex-shrink-0 ${
                    etapa.status === "realizada" ? "bg-[#3A3A45] text-white" :
                    etapa.status === "proxima" ? "bg-[#F2C200] text-black" :
                    "bg-[#1E1E24] border border-[#3A3A45] text-[#9CA3AF]"
                  }`}>
                    {etapa.numero}
                  </div>
                  <div>
                    <p className="font-bold text-white group-hover:text-[#F2C200] transition-colors">
                      {etapa.titulo}
                    </p>
                    <p className="text-[#9CA3AF] text-sm">{formatDate(etapa.data)}</p>
                    <p className="text-[#9CA3AF] text-xs mt-0.5">{etapa.local}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  {etapa.status === "realizada" && (
                    <span className="text-xs bg-[#1E1E24] border border-[#3A3A45] text-green-400 px-2 py-0.5 rounded-full">
                      Realizada
                    </span>
                  )}
                  {etapa.status === "proxima" && (
                    <span className="text-xs bg-[#F2C200]/10 border border-[#F2C200] text-[#F2C200] px-2 py-0.5 rounded-full">
                      Próxima
                    </span>
                  )}
                  {etapa.status === "futura" && (
                    <span className="text-xs bg-[#1E1E24] border border-[#3A3A45] text-[#9CA3AF] px-2 py-0.5 rounded-full">
                      Agendada
                    </span>
                  )}
                  {pilotoVencedor && (
                    <p className="text-xs text-[#9CA3AF] mt-1">
                      🏆 {pilotoVencedor.nome}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
