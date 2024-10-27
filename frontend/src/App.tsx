
import './App.css'
import { ThemeProvider } from './context/ThemeContext';
import LoginPage from './features/auth/LoginPage'
import QueryClientProvider from './providers/QueryClientProvider';

function App() {

  return (
    <QueryClientProvider>
      <ThemeProvider>
        <LoginPage />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App
