import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AppBar, CircularProgress, Container,} from "@mui/material";
import {Login} from "features/auth/ui/login/login";
import {TodolistsList} from "features/TodolistsList/ui/TodolistsList";
import {ErrorSnackbar} from "common/components";
import {useActions} from "common/hooks";
import {selectAppStatus, selectIsInitialized} from "app/model/appSelectors";
import {authThunks} from "features/auth/model/authSlice";

function App() {
  const status = useSelector(selectAppStatus);
  const isInitialized = useSelector(selectIsInitialized);

  const { initializeApp } = useActions(authThunks);

  useEffect(() => {
    initializeApp();
  }, []);


  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="App">
        <ErrorSnackbar />
        <AppBar position={'static'}/>
        <Container fixed>
          <Routes>
            <Route path={"/"} element={<TodolistsList />} />
            <Route path={"/login"} element={<Login />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
