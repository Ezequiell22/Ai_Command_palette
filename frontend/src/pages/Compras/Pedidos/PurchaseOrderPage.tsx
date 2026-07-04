import PageTemplate from '../../PageTemplate';

export default function PurchaseOrderPage() {
  return (
    <PageTemplate
      title="Pedido de Compra"
      subtitle="Crie pedidos de compra de insumos agrícolas"
      icon="📥"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <label className="block text-sm font-medium mb-1">Fornecedor</label>
            <input type="text" className="w-full border rounded p-2" placeholder="Nome do fornecedor" />
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <label className="block text-sm font-medium mb-1">Data Entrega</label>
            <input type="date" className="w-full border rounded p-2" />
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <label className="block text-sm font-medium mb-2">Itens do Pedido</label>
          <div className="text-gray-400 text-center py-12">Adicione insumos (fertilizantes, defensivos, etc)</div>
        </div>
        <div className="flex justify-end gap-3">
          <button className="px-6 py-2 bg-gray-200 rounded-lg">Cancelar</button>
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg">Salvar Pedido</button>
        </div>
      </div>
    </PageTemplate>
  );
}
