import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import PricingPage from "@/pages/product";
import PurchasePage from "@/pages/purchase";
import StockPage from "@/pages/stock";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<PurchasePage />} path="/purchase" />
      <Route element={<PricingPage />} path="/product" />
      <Route element={<StockPage />} path="/stock" />

    </Routes>
  );
}

export default App;
