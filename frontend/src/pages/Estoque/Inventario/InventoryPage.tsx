import PageTemplate from '../../PageTemplate';

export default function InventoryPage() {
  return (
    <PageTemplate
      title="Inventário de Estoque"
      subtitle="Execute inventário físico dos produtos armazenados"
      icon="📦"
    >
      <div className="space-y-4">
        {['Soja', 'Milho', 'Trigo', 'Fertilizante'].map((prod, i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
            <div>
              <h4 className="font-medium">{prod}</h4>
              <p className="text-sm text-gray-500">Sistema: {Math.floor(Math.random() * 1000)} kg</p>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm">Físico:</label>
              <input type="number" className="border rounded w-24 p-1" />
              <span className="text-sm">kg</span>
            </div>
          </div>
        ))}
        <div className="flex justify-end">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg">Salvar Inventário</button>
        </div>
      </div>
    </PageTemplate>
  );
}
