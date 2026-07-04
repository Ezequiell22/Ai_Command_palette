import PageTemplate from '../../PageTemplate';

export default function CropPlanningPage() {
  return (
    <PageTemplate
      title="Planejamento de Plantio"
      subtitle="Planeje o plantio por talhão, cultura e safra"
      icon="🌱"
    >
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <label className="block text-sm font-medium mb-1">Talhão</label>
          <select className="w-full border rounded p-2">
            <option>Talhão 01</option>
            <option>Talhão 02</option>
          </select>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <label className="block text-sm font-medium mb-1">Cultura</label>
          <select className="w-full border rounded p-2">
            <option>Soja</option>
            <option>Milho</option>
          </select>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <label className="block text-sm font-medium mb-1">Safra</label>
          <select className="w-full border rounded p-2">
            <option>2025/2026</option>
          </select>
        </div>
      </div>
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold mb-3">Atividades Planejadas</h3>
        <div className="text-gray-400 text-center py-12">Adicione atividades de plantio</div>
      </div>
    </PageTemplate>
  );
}
