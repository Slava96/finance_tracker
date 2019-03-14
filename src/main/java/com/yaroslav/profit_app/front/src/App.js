import React  from "react";
import { SnackbarProvider } from "notistack";
import "./App.css";
import MainBody from "./MainBody";
import TopNavBar from "./TopNavBar";

const App = () => (
  <div>
    <SnackbarProvider maxSnack={3} preventDuplicate>
      <div>
        <TopNavBar />
        <MainBody />
      </div>
    </SnackbarProvider>
  </div>
)

export default App;
