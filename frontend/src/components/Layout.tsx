import { Outlet, NavLink } from 'react-router-dom';
import { CommandPalette } from './CommandPalette';
import catalogData from '../catalog.json';
import { CatalogItem as CatalogItemType } from '../types/catalog';

export default function Layout() {
  const moduleItems = (catalogData as CatalogItemType[]).reduce((acc, item) => {
    if (!acc[item.module]) {
      acc[item.module] = [];
    }
    acc[item.module].push(item);
    return acc;
  }, {} as Record<string, CatalogItemType[]>);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-br from-green-800 to-green-900 text-white shadow-xl flex flex-col">
        <div className="p-6 border-b border-green-700">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <span className="text-2xl">🌾</span>
            ERP Agrícola
          </h1>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          {Object.entries(moduleItems).map(([module, items]) => (
            <div key={module} className="mb-6">
              <h2 className="text-xs font-semibold text-green-300 uppercase tracking-wider mb-3 px-2">
                {module}
              </h2>
              <ul className="space-y-1">
                {items.map((item) => (
                  <li key={item.id}>
                    <NavLink
                      to={item.route}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-green-700 text-white'
                            : 'text-green-100 hover:bg-green-700/50'
                        }`
                      }
                    >
                      <span>{item.title}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Pressione <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">Ctrl+L</kbd> para busca</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Usuário</span>
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-medium">
              U
            </div>
          </div>
        </header>

        <div className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </div>
      </main>

      <CommandPalette />
    </div>
  );
}
