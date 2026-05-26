import Link from "next/link";
import { notFound } from "next/navigation";
import { ETAPAS, PILOTOS } from "@/lib/data";

function formatDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export async function generateStaticParams() {
  return ETAPAS.map((e) => ({ slug: e.slug }));
}

export default async function EtapaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const etapa = ETAPAS.find((e) => e.slug === slug);
  if (!etapa) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link href="/etapas" className="text-[#9CA3AF] hover:text-[#F2C200] text-sm transition-colors mb-6 inline-block">
        ← Todas as etapas
      </Link>

      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">{etapa.titulo}</h1>
          <div className="h-0.5 w-16 bg-[#F2C200] mt-2 mb-3" />
          <p className="text-[#9CA3AF]">{formatDate(etapa.data)} · {etapa.local}</p>
        </div>
        <span className={`text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0 ${
          etapa.status === "realizada" ? "bg-[#3A3A45] text-green-400" :
          etapa.status === "proxima" ? "bg-[#F2C200] text-black" :
          "bg-[#3A3A45] text-[#9CA3AF]"
        }`}>
          {etapa.status === "realizada" ? "Realizada" :
           etapa.status === "proxima" ? "Próxima etapa" : "Agendada"}
        </span>
      </div>

      {etapa.descricao && (
        <p className="text-[#9CA3AF] mb-8 text-lg">{etapa.descricao}</p>
      )}

      {/* Resultados */}
      {etapa.resultados.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-black uppercase tracking-tight mb-4">Resultado</h2>
          <div className="bg-[#2A2A32] border border-[#3A3A45] rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#3A3A45]">
                  <th className="text-left text-xs font-bold uppercase tracking-widest text-[#9CA3AF] px-5 py-3 w-16">Pos</th>
                  <th className="text-left text-xs font-bold uppercase tracking-widest text-[#9CA3AF] px-4 py-3">Piloto</th>
                  <th className="text-right text-xs font-bold uppercase tracking-widest text-[#9CA3AF] px-5 py-3">Pontos</th>
                </tr>
              </thead>
              <tbody>
                {etapa.resultados
                  .sort((a, b) => a.posicao - b.posicao)
                  .map((r) => {
                    const piloto = PILOTOS.find((p) => p.id === r.pilotoId);
                    return (
                      <tr key={r.pilotoId} className="border-b border-[#3A3A45] last:border-0 hover:bg-white/[0.02] transition-colors">
                        <td className="px-5 py-3.5">
                          <span className={
                            r.posicao === 1 ? "text-[#F2C200] font-black text-lg" :
                            r.posicao === 2 ? "text-[#D1D5DB] font-bold" :
                            r.posicao === 3 ? "text-[#CD7F32] font-bold" :
                            "text-[#9CA3AF]"
                          }>
                            {r.posicao}º
                          </span>
                        </td>
                        <td className="px-4 py-3.5 font-semibold">{piloto?.nome}</td>
                        <td className="px-5 py-3.5 text-right font-black text-[#F2C200]">{r.pontos}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Fotos */}
      {etapa.fotos.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-black uppercase tracking-tight mb-4">Fotos</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {etapa.fotos.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Foto ${i + 1} da ${etapa.titulo}`}
                className="rounded-xl w-full aspect-video object-cover border border-[#3A3A45]"
              />
            ))}
          </div>
        </section>
      )}

      {/* Vídeos */}
      {etapa.videos.length > 0 && (
        <section>
          <h2 className="text-lg font-black uppercase tracking-tight mb-4">Vídeos</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {etapa.videos.map((url, i) => (
              <div key={i} className="aspect-video rounded-xl overflow-hidden border border-[#3A3A45]">
                <iframe
                  src={url}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {etapa.status !== "realizada" && etapa.resultados.length === 0 && (
        <div className="text-center py-16 text-[#9CA3AF]">
          <p className="text-4xl mb-4">🏁</p>
          <p className="font-medium">Resultados disponíveis após a corrida</p>
        </div>
      )}
    </div>
  );
}
