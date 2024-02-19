import "./App.css";
import Flavors from "./components/Flavors/Flavors";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import OrderDetail from "./components/OrderDetail/OrderDetail";
import Orders from "./components/Orders/Orders";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <DataProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/sabores" element={<Flavors />} />
              <Route path="/pedidos/:oid" element={<OrderDetail />} />
              <Route path="/pedidos" element={<Orders />} />
            </Routes>
          </DataProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
