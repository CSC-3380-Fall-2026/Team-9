import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
const savedTheme = localStorage.getItem("cybersense-theme");

const validThemes = [
  "turquoise",
  "pink",
  "purple",
  "red",
  "blue",
  "green",
  "yellow",
];

document.documentElement.dataset.cyberTheme =
  savedTheme && validThemes.includes(savedTheme)
    ? savedTheme
    : "turquoise";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)