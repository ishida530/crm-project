import React, { createContext, useContext, useState, useEffect } from 'react';
import useLocalStorage from './hooks/useLocalStorage';

interface AuthContextType {
    isAuthenticated: boolean;
    userRole: string | null;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const isTokenExpired = (token: string): boolean => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Dekoduj część payload (środkową część JWT)
        const expiration = payload.exp * 1000; // Token `exp` jest w sekundach, więc zamieniamy na milisekundy
        return Date.now() > expiration; // Sprawdź, czy token wygasł
    } catch (error) {
        console.error('Błąd podczas sprawdzania tokena:', error);
        return true; // Jeśli token jest nieprawidłowy, traktuj go jako wygasły
    }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useLocalStorage<boolean>('isAuthenticated', false);
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (token && !isTokenExpired(token)) {
            setIsAuthenticated(true);
            setUserRole(role);
        } else {
            setIsAuthenticated(false);
            setUserRole(null);
        }
    }, []); // Runs once on mount to check the token and role

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
