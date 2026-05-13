import React from "react";
import "./style/App.css";
import Navbar from "./components/Navbar";
import Gallery from "./components/Gallery";
import Content from "./components/Content";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Navbar active="2" />
      <Gallery />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
