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
import ProductsPage from '@/features/products/ProductsPage';
import InvestmentsPage from '@/features/investments/InvestmentsPage';
import VehiclesPage from '@/features/vehicles/VehiclesPage';
import AttendancePage from '@/features/attendance/AttendancePage';
import ResetPasswordPage from '@/features/auth/ResetPasswordPage';
import ChangePasswordPage from '@/features/auth/ChangePasswordPage';
import ProjectGroupPage from '@/features/projectGroup/ProjectGroupPage';
import ProjectGroupDetailsPage from '@/features/projectGroup/ProjectGroupDetailsPage';


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/dashboard',
                element: (
                    <PrivateRoute allowedRoles={[UserRole.ADMIN, UserRole.MANAGER]}>
                        <Dashboard />
                    </PrivateRoute>
                ),
            },
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'login/reset-password',
                element: <ResetPasswordPage />,
            },
            {
                path: 'login/change-password',
                element: <ChangePasswordPage />,
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
                path: 'warehouses/products',
                element: (
                    <PrivateRoute allowedRoles={[UserRole.ADMIN, UserRole.MANAGER]}>
                        <ProductsPage />
                    </PrivateRoute>
                ),
            },
            {
                path: 'users',
                element: (
                    <PrivateRoute allowedRoles={[UserRole.ADMIN, UserRole.MANAGER]}>
                        <UsersPage />
                    </PrivateRoute>
                ),
            },
            {
                path: 'users/attendance',
                element: (
                    <PrivateRoute allowedRoles={[UserRole.ADMIN]}>
                        <AttendancePage />
                    </PrivateRoute>
                ),
            },
            {
                path: 'projects',
                element: (
                    <PrivateRoute allowedRoles={[UserRole.ADMIN, UserRole.MANAGER, UserRole.EMPLOYEE, UserRole.DESIGNER]}>
                        <ProjectsPage />
                    </PrivateRoute>
                ),
            },
            {
                path: 'projects/:id',
                element: (
                    <PrivateRoute allowedRoles={[UserRole.ADMIN, UserRole.MANAGER, UserRole.EMPLOYEE, UserRole.DESIGNER]}>
                        <ProjectDetailPage getProject={useGetProjectDetails} />
                    </PrivateRoute>
                ),
            },
            {
                path: 'projects/templates',
                element: (
                    <PrivateRoute allowedRoles={[UserRole.ADMIN, UserRole.MANAGER, UserRole.DESIGNER]}>
                        <ProjectTemplatesPage />
                    </PrivateRoute>
                ),
            },
            {
                path: '/projects/archived',
                element: (
                    <PrivateRoute allowedRoles={[UserRole.ADMIN, UserRole.MANAGER, UserRole.DESIGNER]}>
                        <ProjectsPage includeArchived={false} />
                    </PrivateRoute>
                ),
            },
            {
                path: 'projects/templates/:id',
                element: (
                    <PrivateRoute allowedRoles={[UserRole.ADMIN, UserRole.MANAGER, UserRole.DESIGNER]}>
                        <ProjectDetailPage getProject={useGetProjectTemplateDetails} />
                    </PrivateRoute>
                ),
            },
            {
                path: 'projects/groups',
                element: (
                    <PrivateRoute allowedRoles={[UserRole.ADMIN, UserRole.MANAGER, UserRole.DESIGNER]}>
                        <ProjectGroupPage />
                    </PrivateRoute>
                ),
            },
            {
                path: 'projects/groups/:id',
                element: (
                    <PrivateRoute allowedRoles={[UserRole.ADMIN, UserRole.MANAGER, UserRole.DESIGNER]}>
                        <ProjectGroupDetailsPage />
                    </PrivateRoute>
                ),
            },
            {
                path: 'investments',
                element: (
                    <PrivateRoute allowedRoles={[UserRole.ADMIN, UserRole.ENGINEER, UserRole.MANAGER]}>
                        <InvestmentsPage />
                    </PrivateRoute>
                ),
            },
            {
                path: 'vehicles',
                element: (
                    <PrivateRoute allowedRoles={[UserRole.ADMIN]}>
                        <VehiclesPage />
                    </PrivateRoute>
                ),
            },
        ],
    },
]);

const ReactRouterProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        // @ts-expect-error
        <RouterProvider router={router}>
            {children}
        </RouterProvider>
    );
};

export default ReactRouterProvider;
