import React from "react";
import MaxWidthWrapper from "./components/MaxWidthWrapper";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Trainingplan from "./components/Trainingplan";
import Error from "./components/Error";
import { Toaster } from "react-hot-toast";
import Editplan from "./components/Editplan";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" reverseOrder={false}/>
      <Navbar />
      <MaxWidthWrapper>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/training_plan/:slug" element={<Trainingplan />} /> 
        <Route path="/editplan" element={<Editplan />} /> 
        <Route path="/error404" element={<Error />} /> 
      </Routes>
      </MaxWidthWrapper>
    </QueryClientProvider>

  );
}

export default App;
