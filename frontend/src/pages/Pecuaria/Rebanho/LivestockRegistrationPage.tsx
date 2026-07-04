import PageTemplate from '../../PageTemplate';

export default function LivestockRegistrationPage() {
  return (
    <PageTemplate
      title="Cadastro de Animais"
      subtitle="Cadastre e mantenha informações do rebanho"
      icon="🐄"
    >
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-3xl">🐮</span>
              <div>
                <p className="font-medium">Animal #{String(i).padStart(3, '0')}</p>
                <p className="text-sm text-gray-500">Brinco: BR-12345-{i}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 border rounded text-sm">Editar</button>
            </div>
          </div>
        ))}
        <div className="flex justify-end">
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg">Adicionar Animal</button>
        </div>
      </div>
    </PageTemplate>
  );
}
