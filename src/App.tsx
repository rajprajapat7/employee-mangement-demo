import React from "react";
import "./App.css";
import "./output.css";
import Drawer from "./Drawer";
import { QueryClientProvider, QueryClient } from "react-query";
import Other from "./Other";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <div className="App ">
      <h3>Organization</h3>
      <QueryClientProvider client={queryClient}>
        {/* <Drawer /> */}
        <Other />
      </QueryClientProvider>
    </div>
  );
}

export default App;
