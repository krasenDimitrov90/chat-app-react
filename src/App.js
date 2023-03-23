import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider, } from 'react-router-dom';

import './App.css';
import { AuthProvider } from './context/auth-context';
import MessagesContextProvider from './context/messages-context';
import { SocketContextProvider } from './context/socket-context';
import ChatPage from './pages/ChatPage/ChatPage';
import DashBoardPage from './pages/DashBoardPage/DashBoardPage';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';


const router = createBrowserRouter([
  {
    path: '/',
    // element: <Layout />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      // { index: true, element: <Navigate to="/login" replace /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/chat', element: <ChatPage /> },
      { path: '/dashboard', element: <DashBoardPage /> },
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
