import React from "react";
import MaxWidthWrapper from "./components/MaxWidthWrapper";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <>
      <Navbar />
      <MaxWidthWrapper>
        <Dashboard />
      </MaxWidthWrapper>
    </>
  );
}

export default App;
