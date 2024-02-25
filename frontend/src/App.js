import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.css";
import React from "react";
import Home from "./pages/Home";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Signup from "./pages/Signup";
import Quiz from "./pages/Quiz";
import InitSignup from "./pages/InitSignup";
import Results from "./pages/Results";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/signin" Component={InitSignup} />
          <Route path="/quiz" Component={Quiz}/>
          <Route path="/signup" Component={Signup}/>
          <Route path={"/result"} Component={Results}></Route>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
