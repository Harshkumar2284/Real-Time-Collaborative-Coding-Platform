import './App.css'
import Dashboard from './pages/Dashboard'
import Landing from './pages/Landing'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Room from './pages/Room'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Landing/>} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/room/:roomId' element={<Room />} />
        </Routes>
      </Router>
      
    </>
  )
}

export default App
