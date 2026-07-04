import PageTemplate from '../../PageTemplate';

export default function AgronomicPrescriptionPage() {
  return (
    <PageTemplate
      title="Emitir Receituário Agronômico"
      subtitle="Emita receituário agronômico para aplicação de defensivos"
      icon="🌿"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <label className="block text-sm font-medium mb-1">Engenheiro Agrônomo</label>
            <input type="text" className="w-full border rounded p-2" placeholder="Nome completo" />
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <label className="block text-sm font-medium mb-1">CREA</label>
            <input type="text" className="w-full border rounded p-2" placeholder="Número do CREA" />
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <label className="block text-sm font-medium mb-2">Produtos/Defensivos</label>
          <div className="text-gray-400 text-center py-12">Adicione os produtos a serem aplicados</div>
        </div>
      </div>
    </PageTemplate>
  );
}
