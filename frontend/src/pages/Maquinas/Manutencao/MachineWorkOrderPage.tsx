import PageTemplate from '../../PageTemplate';

export default function MachineWorkOrderPage() {
  return (
    <PageTemplate
      title="Ordem de Serviço de Máquinas"
      subtitle="Controle manutenção preventiva e corretiva de máquinas agrícolas"
      icon="🚜"
    >
      <div className="space-y-4">
        {['Trator 01', 'Colheitadeira 01', 'Plantadeira 01'].map((maquina, i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-3xl">🔧</span>
              <div>
                <p className="font-medium">{maquina}</p>
                <p className="text-sm text-gray-500">Próxima manutenção: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 border rounded text-sm">Histórico</button>
              <button className="px-3 py-1 bg-yellow-500 text-white rounded text-sm">Nova OS</button>
            </div>
          </div>
        ))}
      </div>
    </PageTemplate>
  );
}
