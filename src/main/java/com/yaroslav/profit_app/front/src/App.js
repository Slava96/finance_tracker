import React, { Component } from "react";
import { SnackbarProvider } from "notistack";
import "./App.css";
import "../node_modules/react-vis/dist/style.css";
import MainBody from "./MainBody";
import TopNavBar from "./TopNavBar";

class App extends Component {
  render() {
    return (
      <div>
        <SnackbarProvider maxSnack={3} preventDuplicate>
          <div>
            <TopNavBar />
            <MainBody />
          </div>
        </SnackbarProvider>
      </div>
    );
  }
}

export default App;
