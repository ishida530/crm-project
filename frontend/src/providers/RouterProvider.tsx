import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import LoginPage from '@/features/auth/LoginPage';
import PrivateRoute from '@/features/auth/PrivateRoute';

import UsersPage from '@/features/users/UsersPage';
import Dashboard from '@/features/dashboard/Dashboard';
import CustomersPage from '@/features/customers/CustomersPage';
import ProjectsPage from '@/features/projects/ProjectsPage';
import ProjectDetailPage from '@/features/projects/ProjectDetailPage';
import CustomerGroupPage from '@/features/customerGroup/CustomerGroupPage';
import ProjectTemplatesPage from '@/features/projectsTemplates/ProjectsTemplatesPage';
import useGetProjectTemplateDetails from '@/features/projectsTemplates/hooks/useGetProjectTemplateDetails';
import useGetProjectDetails from '@/features/projects/hooks/useGetProjectDetails';
import WarehousesPage from '@/features/warehouse/WarehousesPage';
import WarehouseDetailsPage from '@/features/warehouse/WarehouseDetailsPage';
import { UserRole } from '@/features/users/types';


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/dashboard',
                element: (
                    <PrivateRoute allowedRoles={[UserRole.ADMIN]}>
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
                    <PrivateRoute allowedRoles={[UserRole.ADMIN, UserRole.INVOICE_CLERK]}>
                        <CustomersPage />
                    </PrivateRoute>
                ),
            },
            {
                path: 'clients/groups',
                element: (
                    <PrivateRoute allowedRoles={[UserRole.ADMIN, UserRole.INVOICE_CLERK]}>
                        <CustomerGroupPage />
                    </PrivateRoute>
                ),
            },
            {
                path: 'warehouses',
                element: (
                    <PrivateRoute allowedRoles={[UserRole.ADMIN, UserRole.MANAGER]}>
                        <WarehousesPage />
                    </PrivateRoute>
                ),
            },
            {
                path: 'warehouses/:id',
                element: (
                    <PrivateRoute allowedRoles={[UserRole.ADMIN, UserRole.MANAGER]}>
                        <WarehouseDetailsPage />
                    </PrivateRoute>
                ),
            },
            {
                path: 'users',
                element: (
                    <PrivateRoute allowedRoles={[UserRole.ADMIN]}>
                        <UsersPage />
                    </PrivateRoute>
                ),
            },
            {
                path: 'projects',
                element: (
                    <PrivateRoute allowedRoles={[UserRole.ADMIN, UserRole.MANAGER, UserRole.EMPLOYEE]}>
                        <ProjectsPage />
                    </PrivateRoute>
                ),
            },
            {
                path: 'projects/:id',
                element: (
                    <PrivateRoute allowedRoles={[UserRole.ADMIN, UserRole.MANAGER, UserRole.EMPLOYEE]}>
                        <ProjectDetailPage getProject={useGetProjectDetails} />
                    </PrivateRoute>
                ),
            },
            {
                path: 'projects/templates',
                element: (
                    <PrivateRoute allowedRoles={[UserRole.ADMIN, UserRole.MANAGER]}>
                        <ProjectTemplatesPage />
                    </PrivateRoute>
                ),
            },
            {
                path: 'projects/templates/:id',
                element: (
                    <PrivateRoute allowedRoles={[UserRole.ADMIN, UserRole.MANAGER]}>
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
