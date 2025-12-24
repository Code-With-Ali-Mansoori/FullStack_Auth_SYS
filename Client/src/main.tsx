import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';

const Query_Client = new QueryClient;

createRoot(document.getElementById('root')!).render(
<BrowserRouter>
    <QueryClientProvider client={Query_Client}>
        <App />
    </QueryClientProvider>
</BrowserRouter>
)
