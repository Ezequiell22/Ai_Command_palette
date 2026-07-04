import PageTemplate from '../../PageTemplate';

export default function IssueInvoicePage() {
  return (
    <PageTemplate
      title="Emitir Nota Fiscal Eletrônica"
      subtitle="Emita NF-e para vendas de produtos agrícolas"
      icon="📄"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Cliente</h3>
            <input type="text" placeholder="Nome do cliente" className="w-full border rounded p-2" />
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2">CPF/CNPJ</h3>
            <input type="text" placeholder="000.000.000-00" className="w-full border rounded p-2" />
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Itens</h3>
          <div className="text-center text-gray-400 py-8">Adicione os produtos</div>
        </div>
        <div className="flex justify-end gap-3">
          <button className="px-6 py-2 bg-gray-200 rounded-lg">Cancelar</button>
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Emitir NF-e
          </button>
        </div>
      </div>
    </PageTemplate>
  );
}
