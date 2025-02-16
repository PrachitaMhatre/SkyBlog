import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Post from './pages/Post'
import Dashboard from './pages/Admin/Dashboard'
import UserLayout from './Layouts/UserLayout'
import AdminLayout from './Layouts/AdminLayout'
import Addpost from './pages/Admin/Addpost'
import User from './pages/Admin/User'
import Allpost from './pages/Admin/Allpost'
import Login from './pages/Login'
import Register from './pages/Register'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/Store'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from 'react-hot-toast'
import Profile from './pages/Profile'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Routes>
              <Route path='/' element={<UserLayout />}>
                <Route index element={<Home />} />
                <Route path='/post/:id' element={<Post />} />
                <Route path='/profile/:userId' element={<Profile />} />
              </Route>
              <Route path='/dashboard' element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path='addpost' element={<Addpost />} />
                <Route path='users' element={<User />} />
                <Route path='allposts' element={<Allpost />} />
              </Route>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Routes>
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </>
  )
}
