import React, { createContext, useContext, useState, useEffect } from 'react';
import useLocalStorage from './hooks/useLocalStorage';

interface AuthContextType {
    isAuthenticated: boolean;
    userRole: string | null;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useLocalStorage<boolean>('isAuthenticated', false);
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const role = localStorage.getItem('role');
        setUserRole(role); // Read role from localStorage
    }, []); // Runs once on mount to check the role

    const login = () => {
        setIsAuthenticated(true);
        const role = localStorage.getItem('role');
        setUserRole(role); // Set user role immediately after login
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setIsAuthenticated(false);
        setUserRole(null); // Clear the user role on logout
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
