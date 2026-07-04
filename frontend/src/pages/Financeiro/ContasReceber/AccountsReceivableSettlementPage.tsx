import PageTemplate from '../../PageTemplate';

export default function AccountsReceivableSettlementPage() {
  return (
    <PageTemplate
      title="Baixa de Contas a Receber"
      subtitle="Realize a baixa financeira de títulos recebidos"
      icon="💰"
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2 text-left">Título</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Cliente</th>
              <th className="border border-gray-200 px-4 py-2 text-right">Valor</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Vencimento</th>
              <th className="border border-gray-200 px-4 py-2 text-center">Ação</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2">REC-{String(i).padStart(5, '0')}</td>
                <td className="border border-gray-200 px-4 py-2">Cliente {i}</td>
                <td className="border border-gray-200 px-4 py-2 text-right">R$ 1.000,00</td>
                <td className="border border-gray-200 px-4 py-2">01/01/2026</td>
                <td className="border border-gray-200 px-4 py-2 text-center">
                  <button className="px-4 py-1 bg-blue-600 text-white rounded text-sm">Baixar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageTemplate>
  );
}
