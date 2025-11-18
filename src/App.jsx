import { useState } from 'react'
import './App.css'
import Dashboard from './pages/Dashboard'
import FileUpload from './components/FileUpload'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Dashboard />
     {/* <FileUpload /> */}
    </>
  )
}

export default App
