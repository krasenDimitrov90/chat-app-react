import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider, } from 'react-router-dom';

import './App.css';
import { AuthProvider } from './context/auth-context';
import MessagesContextProvider from './context/messages-context';
import { SocketContextProvider } from './context/socket-context';
import ChatPage from './pages/ChatPage/ChatPage';
import DashBoard from './pages/DashBoardPage/DashBoardPage';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';


const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/chat', element: <ChatPage /> },
      { path: '/dashboard', element: <DashBoard /> },
    ]
  }
]);

function App() {
  return (
    <AuthProvider>
      <MessagesContextProvider>
        <SocketContextProvider>
          <RouterProvider router={router} />
        </SocketContextProvider>
      </MessagesContextProvider>
    </AuthProvider>
  )
}

export default App;
