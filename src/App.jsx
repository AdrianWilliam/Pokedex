import "./App.css";
import Pokemons from "./components/Pokemons/Pokemons";
import Details from "./pages/Details";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        <div className="top">
          <Link to="/">
            <h1>Pokedex</h1>
          </Link>
        </div>
        <main className="content">
          <div className="container-content">
            <Routes>
              <Route path="/" element={<Pokemons />} />
              <Route path="/pokemon/:name" element={<Details />} />
            </Routes>
          </div>
        </main>
        <footer>
          <div className="container">
            <p>Do you like pokemon?</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
