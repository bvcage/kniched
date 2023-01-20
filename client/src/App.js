import React from 'react'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import RootTemplate from './RootTemplate'
import AboutPage from './routes/AboutPage'
import ExplorePage from './routes/ExplorePage'
import LandingPage from './routes/LandingPage'
import LoginPage from './routes/LoginPage'
import PatternSummaryPage from './routes/PatternSummaryPage'
import ProfilePage from './routes/ProfilePage'
import ProjectSummaryPage from './routes/ProjectSummaryPage'
import SignupPage from './routes/SignupPage'
import UserPatternsPage from './routes/UserPatternsPage'
import UserProjectsPage from './routes/UserProjectsPage'

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
            element: <UserPatternsPage />
          },
          {
            path: 'projects',
            children: [
              {
                path: '',
                element: <UserProjectsPage />
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