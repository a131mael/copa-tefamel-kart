import { getClassificacao, ETAPAS } from "@/lib/data";

export default function ClassificacaoPage() {
  const classificacao = getClassificacao();
  const etapasRealizadas = ETAPAS.filter((e) => e.status === "realizada");

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Classificação Geral</h1>
      <div className="h-0.5 w-16 bg-[#F2C200] mb-2" />
      <p className="text-[#9CA3AF] text-sm mb-8">
        Após {etapasRealizadas.length} de 10 etapas
      </p>

      <div className="bg-[#2A2A32] border border-[#3A3A45] rounded-2xl overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-[#3A3A45]">
              <th className="text-left text-xs font-bold uppercase tracking-widest text-[#9CA3AF] px-5 py-3 w-14">Pos</th>
              <th className="text-left text-xs font-bold uppercase tracking-widest text-[#9CA3AF] px-4 py-3">Piloto</th>
              {etapasRealizadas.map((e) => (
                <th key={e.slug} className="text-center text-xs font-bold uppercase tracking-widest text-[#9CA3AF] px-3 py-3">
                  E{e.numero}
                </th>
              ))}
              <th className="text-right text-xs font-bold uppercase tracking-widest text-[#9CA3AF] px-5 py-3">Total</th>
            </tr>
          </thead>
          <tbody>
            {classificacao.map((c, i) => (
              <tr key={c.piloto.id} className="border-b border-[#3A3A45] last:border-0 hover:bg-white/[0.02] transition-colors">
                <td className="px-5 py-4">
                  <span className={
                    i === 0 ? "text-[#F2C200] font-black text-lg" :
                    i === 1 ? "text-[#D1D5DB] font-bold" :
                    i === 2 ? "text-[#CD7F32] font-bold" :
                    "text-[#9CA3AF] font-medium"
                  }>
                    {i + 1}º
                  </span>
                </td>
                <td className="px-4 py-4 font-semibold">{c.piloto.nome}</td>
                {etapasRealizadas.map((e) => {
                  const pts = c.porEtapa[e.slug];
                  return (
                    <td key={e.slug} className="px-3 py-4 text-center">
                      {pts !== undefined ? (
                        <span className="text-sm font-medium text-white">{pts}</span>
                      ) : (
                        <span className="text-[#3A3A45]">—</span>
                      )}
                    </td>
                  );
                })}
                <td className="px-5 py-4 text-right">
                  <span className="font-black text-[#F2C200] text-lg">{c.total}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-wrap gap-4 text-xs text-[#9CA3AF]">
        <span>E1–E{etapasRealizadas.length} = Etapas realizadas</span>
        <span>· Pontuação: 1º=25 · 2º=18 · 3º=15 · 4º=12 · 5º=10 · 6º=8 · 7º=6 · 8º=4 · 9º=2 · 10º=1</span>
      </div>
    </div>
  );
}
