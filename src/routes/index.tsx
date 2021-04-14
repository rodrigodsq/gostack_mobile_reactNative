import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import AuthRoutes from './auth.routes';
import { useAuth } from '../hooks/auth';
import AppRoutes from './app.routes';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;

// no hook de autenticação (useAuth), verificamos se possui infomações no user, se tiver o usuario está autenticado e pode acessar as rotas <AppRoutes>, se ñ ele acessa as rotas <AuthRoutes />
