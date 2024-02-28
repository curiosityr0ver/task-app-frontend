import React from "react";
import { createRoot } from 'react-dom/client';
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import NoteProvider from "./context/NoteProvider";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ChakraProvider>
    <BrowserRouter>
      <NoteProvider>
        <App />
      </NoteProvider>
    </BrowserRouter>
  </ChakraProvider>,
);
