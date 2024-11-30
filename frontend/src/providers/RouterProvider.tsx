import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import LoginPage from '@/features/auth/LoginPage';
import PrivateRoute from '@/features/auth/PrivateRoute';

import UsersPage from '@/features/users/UsersPage';
import Dashboard from '@/features/dashboard/Dashboard';
import CustomersPage from '@/features/customers/CustomersPage';
import ProductsPage from '@/features/products/ProductsPage';
import InventoryPage from '@/features/inventory/InventoryPage';
import ProjectsPage from '@/features/projects/ProjectsPage';
import ProjectDetailPage from '@/features/projects/ProjectDetailPage';
import CustomerGroupPage from '@/features/customerGroup/CustomerGroupPage';
import ProjectTemplatesPage from '@/features/projectsTemplates/ProjectsTemplatesPage';
import useGetProjectTemplateDetails from '@/features/projectsTemplates/hooks/useGetProjectTemplateDetails';
import useGetProjectDetails from '@/features/projects/hooks/useGetProjectDetails';

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
                path: 'clients/groups', // Nowa trasa dla CustomerGroupPage
                element: (
                    <PrivateRoute>
                        <CustomerGroupPage />
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
            {
                path: 'projects/:id',
                element: (
                    <PrivateRoute>
                        <ProjectDetailPage  getProject={useGetProjectDetails} />
                    </PrivateRoute>
                ),
            },
            {
                path: 'projects/templates',
                element: (
                    <PrivateRoute>
                        <ProjectTemplatesPage />
                    </PrivateRoute>
                ),
            },
            {
                path: 'projects/templates/:id',
                element: (
                    <PrivateRoute>
                        <ProjectDetailPage getProject={useGetProjectTemplateDetails} />
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
