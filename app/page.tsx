import Link from "next/link";
import { ETAPAS, getClassificacao, PILOTOS } from "@/lib/data";

function formatDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function Countdown({ date }: { date: string }) {
  const target = new Date(date + "T12:00:00");
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return <span className="text-[#F2C200] font-bold">Hoje!</span>;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return (
    <div className="flex gap-4 mt-2">
      <div className="text-center">
        <div className="text-4xl font-black text-[#F2C200]">{days}</div>
        <div className="text-xs text-[#9CA3AF] uppercase tracking-widest">dias</div>
      </div>
    </div>
  );
}

export default function Home() {
  const proximaEtapa = ETAPAS.find((e) => e.status === "proxima");
  const realizadas = ETAPAS.filter((e) => e.status === "realizada");
  const ultimaRealizada = realizadas[realizadas.length - 1];
  const classificacao = getClassificacao().slice(0, 5);
  const etapasRealizadas = ETAPAS.filter((e) => e.status === "realizada");

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-16">

      {/* Hero */}
      <section className="relative rounded-2xl overflow-hidden bg-[#1E1E24] border border-[#3A3A45] p-8 md:p-14">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F2C200] via-[#F2C200] to-transparent" />
        <div className="max-w-2xl">
          <span className="inline-block bg-[#F2C200] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
            2025 · Temporada em andamento
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-2">
            COPA<br />
            <span className="text-[#F2C200]">TEFAMEL</span><br />
            DE KART
          </h1>
          <p className="text-[#9CA3AF] mt-4 text-lg">
            10 etapas · Palhoça, SC · {realizadas.length} etapas realizadas
          </p>
          <div className="flex gap-3 mt-6">
            <Link href="/classificacao" className="bg-[#F2C200] text-black font-bold px-5 py-2.5 rounded-lg hover:bg-[#C9A000] transition-colors text-sm">
              Ver Classificação
            </Link>
            <Link href="/etapas" className="border border-[#3A3A45] text-white font-medium px-5 py-2.5 rounded-lg hover:border-[#F2C200] hover:text-[#F2C200] transition-colors text-sm">
              Todas as Etapas
            </Link>
          </div>
        </div>
        {/* Racing stripes decoration */}
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 opacity-10 flex gap-2 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex-1 bg-[#F2C200] skew-x-[-8deg]" />
          ))}
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Próxima etapa */}
        {proximaEtapa && (
          <section className="bg-[#2A2A32] border border-[#3A3A45] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#9CA3AF]">Próxima Etapa</h2>
              <span className="bg-[#F2C200] text-black text-xs font-bold px-2 py-0.5 rounded-full">
                {proximaEtapa.numero}ª etapa
              </span>
            </div>
            <p className="text-2xl font-black text-white">{proximaEtapa.titulo}</p>
            <p className="text-[#9CA3AF] text-sm mt-1">{formatDate(proximaEtapa.data)}</p>
            <p className="text-[#9CA3AF] text-sm">{proximaEtapa.local}</p>
            <Countdown date={proximaEtapa.data} />
            <Link
              href={`/etapas/${proximaEtapa.slug}`}
              className="mt-4 inline-block text-sm text-[#F2C200] hover:underline"
            >
              Ver detalhes →
            </Link>
          </section>
        )}

        {/* Última etapa */}
        {ultimaRealizada && (
          <section className="bg-[#2A2A32] border border-[#3A3A45] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#9CA3AF]">Última Etapa</h2>
              <span className="bg-[#3A3A45] text-[#9CA3AF] text-xs font-bold px-2 py-0.5 rounded-full">
                Realizada
              </span>
            </div>
            <p className="text-2xl font-black text-white">{ultimaRealizada.titulo}</p>
            <p className="text-[#9CA3AF] text-sm mt-1">{formatDate(ultimaRealizada.data)}</p>
            <p className="text-[#9CA3AF] text-sm">{ultimaRealizada.local}</p>
            <div className="mt-4 space-y-1.5">
              {ultimaRealizada.resultados.slice(0, 3).map((r, i) => {
                const piloto = PILOTOS.find((p) => p.id === r.pilotoId);
                const medal = ["🥇", "🥈", "🥉"][i];
                return (
                  <div key={r.pilotoId} className="flex items-center justify-between">
                    <span className="text-sm">
                      {medal} {piloto?.nome}
                    </span>
                    <span className="text-[#F2C200] text-sm font-bold">{r.pontos} pts</span>
                  </div>
                );
              })}
            </div>
            <Link
              href={`/etapas/${ultimaRealizada.slug}`}
              className="mt-4 inline-block text-sm text-[#F2C200] hover:underline"
            >
              Resultado completo →
            </Link>
          </section>
        )}
      </div>

      {/* Top 5 classificação */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black uppercase tracking-tight">Classificação Geral</h2>
          <Link href="/classificacao" className="text-sm text-[#F2C200] hover:underline">
            Ver completa →
          </Link>
        </div>
        <div className="bg-[#2A2A32] border border-[#3A3A45] rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#3A3A45]">
                <th className="text-left text-xs font-bold uppercase tracking-widest text-[#9CA3AF] px-5 py-3 w-12">Pos</th>
                <th className="text-left text-xs font-bold uppercase tracking-widest text-[#9CA3AF] px-4 py-3">Piloto</th>
                <th className="text-right text-xs font-bold uppercase tracking-widest text-[#9CA3AF] px-5 py-3">Pontos</th>
              </tr>
            </thead>
            <tbody>
              {classificacao.map((c, i) => (
                <tr key={c.piloto.id} className="border-b border-[#3A3A45] last:border-0 hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3.5">
                    <span className={
                      i === 0 ? "text-[#F2C200] font-black text-lg" :
                      i === 1 ? "text-[#D1D5DB] font-bold" :
                      i === 2 ? "text-[#CD7F32] font-bold" :
                      "text-[#9CA3AF] font-medium"
                    }>
                      {i + 1}º
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-semibold">{c.piloto.nome}</td>
                  <td className="px-5 py-3.5 text-right font-black text-[#F2C200]">{c.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Calendário */}
      <section>
        <h2 className="text-xl font-black uppercase tracking-tight mb-4">Calendário 2025</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {ETAPAS.map((e) => (
            <Link
              key={e.slug}
              href={`/etapas/${e.slug}`}
              className={`rounded-xl border p-4 transition-all hover:border-[#F2C200] ${
                e.status === "realizada"
                  ? "border-[#3A3A45] bg-[#1E1E24] opacity-80"
                  : e.status === "proxima"
                  ? "border-[#F2C200] bg-[#2A2A32]"
                  : "border-[#3A3A45] bg-[#1A1A20]"
              }`}
            >
              <div className="flex items-start justify-between">
                <span className={`text-xs font-bold uppercase ${
                  e.status === "proxima" ? "text-[#F2C200]" : "text-[#9CA3AF]"
                }`}>
                  Etapa {e.numero}
                </span>
                {e.status === "realizada" && (
                  <span className="text-green-500 text-xs">✓</span>
                )}
                {e.status === "proxima" && (
                  <span className="text-[#F2C200] text-xs">●</span>
                )}
              </div>
              <p className="text-white font-bold text-sm mt-1 leading-tight">{e.titulo}</p>
              <p className="text-[#9CA3AF] text-xs mt-1">
                {new Date(e.data + "T12:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Instagram embed */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-black uppercase tracking-tight">Instagram</h2>
          <a
            href="https://www.instagram.com/copatefameldekart/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#9CA3AF] hover:text-[#F2C200] text-sm transition-colors"
          >
            @copatefameldekart ↗
          </a>
        </div>
        <a
          href="https://www.instagram.com/copatefameldekart/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-[#2A2A32] border border-[#3A3A45] rounded-2xl p-6 hover:border-[#F2C200] transition-colors group"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0">
            <svg width="22" height="22" fill="white" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </div>
          <div>
            <p className="font-bold text-white group-hover:text-[#F2C200] transition-colors">@copatefameldekart</p>
            <p className="text-[#9CA3AF] text-sm">Veja fotos e vídeos das corridas no Instagram</p>
          </div>
        </a>
      </section>
    </div>
  );
}
