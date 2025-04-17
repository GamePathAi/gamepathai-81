
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18n from './lib/i18n';
import App from './App.tsx';
import './index.css';

// Importar a fonte Inter
import '@fontsource/inter/400.css';  // Fonte regular
import '@fontsource/inter/600.css';  // Fonte semi-bold
import '@fontsource/inter/700.css';  // Fonte bold

// Import i18n configuration before rendering the app
import './lib/i18n.ts';

createRoot(document.getElementById("root")!).render(
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>
);
