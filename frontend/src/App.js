import "./App.css";
import FlavorOfTheDay from "./components/FlavorOfTheDay/FlavorOfTheDay";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Header />
        <FlavorOfTheDay />
        <Main />
      </DataProvider>
    </div>
  );
}

export default App;
