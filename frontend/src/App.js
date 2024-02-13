import "./App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <DataProvider>
          <Header />
          <Main />
        </DataProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
