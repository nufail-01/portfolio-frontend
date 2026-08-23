import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'

import SmoothScroll from './components/providers/smoothscroll/SmoothScroll'
import CustomCursor from './components/ui/layout-primitives/CustomCursor'

import Home from './pages/home/Home'
import ProjectsPage from './pages/projects/ProjectsPage'
import ExperiencePage from './pages/experience/ExperiencePage'
import AboutPage from './pages/about/AboutPage'
import ContactPage from './pages/contact/ContactPage'

import AdminLogin from './admin/pages/login/AdminLogin'
import Dashboard from './admin/pages/dashboard/Dashboard'
import Projects from './admin/pages/projects/Projects'
import Contacts from './admin/pages/contacts/Contacts'
import Skills from './admin/pages/skills/Skills'

import AdminLayout from './admin/components/layout/AdminLayout'
import ProtectedRoute from './admin/components/auth/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================================
            PUBLIC PORTFOLIO (smooth scroll + custom cursor enabled)
        ================================= */}

        <Route
          element={
            <SmoothScroll>
              <CustomCursor />
              <Outlet />
            </SmoothScroll>
          }
        >
          <Route
            path="/"
            element={
              <div className="min-h-screen bg-bg text-text-primary">
                <Home />
              </div>
            }
          />

          <Route
            path="/projects"
            element={
              <div className="min-h-screen bg-bg text-text-primary">
                <ProjectsPage />
              </div>
            }
          />

          <Route
            path="/experience"
            element={
              <div className="min-h-screen bg-bg text-text-primary">
                <ExperiencePage />
              </div>
            }
          />

          <Route
            path="/about"
            element={
              <div className="min-h-screen bg-bg text-text-primary">
                <AboutPage />
              </div>
            }
          />

          <Route
            path="/contact"
            element={
              <div className="min-h-screen bg-bg text-text-primary">
                <ContactPage />
              </div>
            }
          />
        </Route>

        {/* ================================
            ADMIN LOGIN
        ================================= */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* ================================
            PROTECTED ADMIN PANEL
        ================================= */}

        <Route element={<ProtectedRoute />}>
          <Route
            path="/admin"
            element={<AdminLayout />}
          >
            <Route index element={<Dashboard />} />

            <Route
              path="projects"
              element={<Projects />}
            />

            <Route
              path="contacts"
              element={<Contacts />}
            />

            <Route
              path="skills"
              element={<Skills />}
            />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App