import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import LoginPage from '@/features/auth/LoginPage';
import PrivateRoute from '@/features/auth/PrivateRoute';

import UsersPage from '@/features/users/UsersPage';
import Dashboard from '@/features/dashboard/Dashboard';
import CustomersPage from '@/features/customers/CustomersPage';
import SalesPage from '@/features/sales/SalesPage';
import ProductsPage from '@/features/products/ProductsPage';
import InventoryPage from '@/features/inventory/InventoryPage';
import ProjectsPage from '@/features/projects/ProjectsPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/dashboard',
                element: (
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                ),
            },
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'clients',
                element: (
                    <PrivateRoute>
                        <CustomersPage />
                    </PrivateRoute>
                ),
            },
            {
                path: 'sales',
                element: (
                    <PrivateRoute>
                        <SalesPage />
                    </PrivateRoute>
                ),
            },
            {
                path: 'products',
                element: (
                    <PrivateRoute>
                        <ProductsPage />
                    </PrivateRoute>
                ),
            },
            {
                path: 'inventory',
                element: (
                    <PrivateRoute>
                        <InventoryPage />
                    </PrivateRoute>
                ),
            },
            {
                path: 'users',
                element: (
                    <PrivateRoute>
                        <UsersPage />
                    </PrivateRoute>
                ),
            },
            {
                path: 'projects',
                element: (
                    <PrivateRoute>
                        <ProjectsPage />
                    </PrivateRoute>
                ),
            },
        ],
    },
]);

const ReactRouterProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        <RouterProvider router={router}>
            {children}
        </RouterProvider>
    );
};

export default ReactRouterProvider;
