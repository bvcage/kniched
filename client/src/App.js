import React from 'react'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider
} from 'react-router-dom'

import RootTemplate from './RootTemplate'
import AboutPage from './routes/AboutPage'
import LandingPage from './routes/LandingPage'
import LoginPage from './routes/LoginPage'
import ProfilePage from './routes/ProfilePage'
import ProjectsPage from './routes/ProjectsPage'
import ProjectSummaryPage from './routes/ProjectSummaryPage'
import SignupPage from './routes/SignupPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootTemplate />,
    // errorElement: <div>uh oh</div>,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: 'about',
        element: <AboutPage />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'signup',
        element: <SignupPage />
      },
      {
        path: ':username',
        children: [
          {
            path: '',
            element: <ProfilePage />
          },
          {
            path: 'projects',
            children: [
              {
                path: '',
                element: <ProjectsPage />
              },
              {
                path: ':id',
                element: <ProjectSummaryPage />
              }
            ]
          }
        ]
      }
    ]
  }
])

function App () {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App