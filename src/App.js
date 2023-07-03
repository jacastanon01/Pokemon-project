import React, { useState } from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PokemonDetailsPage from "./pages/PokemonDetailsPage";
import ErrorBoundary from "./pages/ErrorBoundary";

const App = () => {
  const [offset, setOffset] = useState(0);
  return (
    <Router>
      <Header />
      <Container>
        <Routes>
          <Route
            path="/Pokemon-project"
            element={<Home offset={offset} setOffset={setOffset} />}
          />
          <Route path="/pokemon/:id" element={<PokemonDetailsPage />} />
          <Route path="*" element={<ErrorBoundary />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
