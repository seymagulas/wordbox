import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getCurrentUser } from './auth.service';

const AuthGuard: React.FC = () => {
    const authUser = getCurrentUser();
    return authUser ? <Outlet /> : <Navigate to={'/'} replace />
}

export default AuthGuard