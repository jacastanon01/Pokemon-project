import React from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PokemonDetailsPage from "./pages/PokemonDetailsPage";
import ErrorBoundary from "./pages/ErrorBoundary";
import RootLayout from "./pages/RootLayout";
import Pokedex from "./pages/Pokedex";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path={"/pokemon-project"} element={<Home />} />
          <Route path="/pokemon/:id" element={<PokemonDetailsPage />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="*" element={<ErrorBoundary />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
