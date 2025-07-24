import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import History from './pages/History'
import Profile from './pages/profile'; //
import { BrowserRouter } from 'react-router-dom'
import './styles/main.scss'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home/>} />
        <Route path="history" element={<History />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      
    </Routes>
    </BrowserRouter>
  )
}

export default App
