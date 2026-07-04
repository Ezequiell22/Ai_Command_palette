import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import IssueInvoicePage from './pages/Fiscal/NFE/IssueInvoicePage';
import AccountsReceivableSettlementPage from './pages/Financeiro/ContasReceber/AccountsReceivableSettlementPage';
import InventoryPage from './pages/Estoque/Inventario/InventoryPage';
import CropPlanningPage from './pages/Agricultura/Plantio/CropPlanningPage';
import AgronomicPrescriptionPage from './pages/Agricultura/Receituario/AgronomicPrescriptionPage';
import LivestockRegistrationPage from './pages/Pecuaria/Rebanho/LivestockRegistrationPage';
import MachineWorkOrderPage from './pages/Maquinas/Manutencao/MachineWorkOrderPage';
import PurchaseOrderPage from './pages/Compras/Pedidos/PurchaseOrderPage';
import SalesOrderPage from './pages/Comercial/PedidosVenda/SalesOrderPage';
import CropProfitabilityReportPage from './pages/Relatorios/Gerencial/CropProfitabilityReportPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/fiscal/nfe/emissao" replace />} />
          <Route path="/fiscal/nfe/emissao" element={<IssueInvoicePage />} />
          <Route path="/financeiro/receber/baixa" element={<AccountsReceivableSettlementPage />} />
          <Route path="/estoque/inventario" element={<InventoryPage />} />
          <Route path="/agricultura/plantio" element={<CropPlanningPage />} />
          <Route path="/agricultura/receituario" element={<AgronomicPrescriptionPage />} />
          <Route path="/pecuaria/rebanho" element={<LivestockRegistrationPage />} />
          <Route path="/maquinas/os" element={<MachineWorkOrderPage />} />
          <Route path="/compras/pedido" element={<PurchaseOrderPage />} />
          <Route path="/comercial/pedido" element={<SalesOrderPage />} />
          <Route path="/relatorios/rentabilidade-safra" element={<CropProfitabilityReportPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
