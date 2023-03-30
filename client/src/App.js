import React from 'react'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from 'react-router-dom'

// templates
import RootTemplate from './RootTemplate'

// pages
import AboutPage from './routes/AboutPage'
import AccountPage from './routes/AccountPage'
import ExplorePage from './routes/ExplorePage'
import LandingPage from './routes/LandingPage'
import PatternSummaryPage from './routes/PatternSummaryPage'
import UserProfilePage from './routes/UserProfilePage'
import ProjectSummaryPage from './routes/ProjectSummaryPage'
import UserPatternsPage from './routes/UserPatternsPage'
import UserProjectsPage from './routes/UserProjectsPage'

// components
import LoginForm from './components/account/LoginForm'
import SignUpForm from './components/account/SignUpForm'
import ConfirmationForm from './components/account/ConfirmationForm'

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
        path: 'account',
        element: <AccountPage />,
        children: [
          {
            index: true,
            element: <Navigate to='login' replace />
          },
          {
            path: 'login',
            element: <LoginForm />
          },
          {
            path: 'signup',
            element: <SignUpForm />
          },
          {
            path: 'confirm',
            element: <ConfirmationForm />
          }
        ]
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
            element: <UserProfilePage />
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