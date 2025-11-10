import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Defer Font Awesome until user intent or after a short delay
const loadFontAwesome = () => import('@fortawesome/fontawesome-free/css/all.min.css').catch(() => {});
const loadOnFirstInteraction = () => {
  loadFontAwesome();
  window.removeEventListener('pointerdown', loadOnFirstInteraction);
  window.removeEventListener('mousemove', loadOnFirstInteraction);
  window.removeEventListener('keydown', loadOnFirstInteraction);
  window.removeEventListener('scroll', loadOnFirstInteraction);
};
window.addEventListener('pointerdown', loadOnFirstInteraction, { once: true });
window.addEventListener('mousemove', loadOnFirstInteraction, { once: true });
window.addEventListener('keydown', loadOnFirstInteraction, { once: true });
window.addEventListener('scroll', loadOnFirstInteraction, { once: true, passive: true });
// Fallback: load after 5s if no interaction
setTimeout(() => loadFontAwesome(), 5000);
