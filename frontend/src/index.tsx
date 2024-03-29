import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';

import './_h/assets/sass/style.scss';
import {AppRoutes} from "./app/routes/AppRoutes";
import {ShopAuthProvider} from "./app/shop/pages/auth/core/ShopAuth";
import { TestProvider } from './app/routes/ModuleRoutes';

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container);

const queryClient = new QueryClient()

root.render(
    <QueryClientProvider client={queryClient}>
        <ShopAuthProvider>
            <TestProvider>
                <AppRoutes />
            </TestProvider>
        </ShopAuthProvider>
    </QueryClientProvider>,
);


