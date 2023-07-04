import React, { useState } from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PokemonDetailsPage from "./pages/PokemonDetailsPage";
import ErrorBoundary from "./pages/ErrorBoundary";
import RootLayout from "./pages/RootLayout";


const App = () => {

//   const [random, setRandom] = useState(0)

//   function generateRandomPokemon(){
//     setRandom(Math.floor(Math.random() * 200 ))
// }



  return (
    <Router>
        <Routes>
          <Route
            path="/"
            element={<RootLayout />}
          >
            <Route path={"/pokemon-project"} element={<Home />} />
            <Route path="/pokemon/:id" element={<PokemonDetailsPage />} />
            <Route path="*" element={<ErrorBoundary />} />
          </Route>
        </Routes>
    </Router>
  );
};

export default App;
