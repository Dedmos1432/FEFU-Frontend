import { useState } from "react";
import "./App.css";
import videocardData from "./data";
import Table from "./Components/Table";

function App() {
  return (
    <div className="App">
      <Table data={videocardData} amountRows="15" isVisiablePagin={true} />
    </div>
  );
}

export default App;
