import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserRole } from '@/features/users/types';
import { useAuth } from './AuthProvier';

interface PrivateRouteProps {
    allowedRoles: UserRole[];
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles, children }) => {
    const { isAuthenticated, userRole } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (userRole && !allowedRoles.includes(userRole as UserRole)) {
        return <Navigate to="/unauthorized" />;
    }

    return <>{children}</>;
};

export default PrivateRoute;
