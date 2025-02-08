import './App.css';
import { BrowserRouter } from "react-router-dom";
import BaseLayout from './ui/BaseLayout/BaseLayout';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/queryClient';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, AppDispatch, RootState } from './state/store';
import { FC, useEffect } from 'react';
import { checkAuth } from './hooks/checkAuth';

const AppContent: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    checkAuth(dispatch);
  }, [dispatch]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return <BaseLayout />;
};

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
