import React from "react";
import MaxWidthWrapper from "./components/MaxWidthWrapper";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Trainingplan from "./components/Trainingplan";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <MaxWidthWrapper>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/training_plan/:plan_name" element={<Trainingplan />} /> 
      </Routes>
      </MaxWidthWrapper>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>

  );
}

export default App;
