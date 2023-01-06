import React from 'react'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider
} from 'react-router-dom'

import RootTemplate from './RootTemplate'
import AboutPage from './routes/AboutPage'
import ExplorePage from './routes/ExplorePage'
import LandingPage from './routes/LandingPage'
import LoginPage from './routes/LoginPage'
import PatternsPage from './routes/PatternsPage'
import PatternSummaryPage from './routes/PatternSummaryPage'
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
        path: 'explore',
        element: <ExplorePage />
      },
      {
        path: 'patterns',
        children: [
          {
            path: ':id',
            element: <PatternSummaryPage />
          }
        ]
      },
      {
        path: ':username',
        children: [
          {
            path: '',
            element: <ProfilePage />
          },
          {
            path: 'patterns',
            element: <PatternsPage />
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