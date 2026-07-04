import PageTemplate from '../../PageTemplate';

export default function CropProfitabilityReportPage() {
  return (
    <PageTemplate
      title="Relatório de Rentabilidade por Safra"
      subtitle="Visualize indicadores financeiros e produtivos por safra"
      icon="📊"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Produção Total', value: '15.000 sacas', icon: '🌾' },
            { label: 'Receita Bruta', value: 'R$ 1.200.000,00', icon: '💰' },
            { label: 'Custos Totais', value: 'R$ 800.000,00', icon: '💸' },
            { label: 'Lucro Líquido', value: 'R$ 400.000,00', icon: '📈' },
          ].map((stat, i) => (
            <div key={i} className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold mb-4">Gráficos (simulação)</h3>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            Gráfico de rentabilidade por safra
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
