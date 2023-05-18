import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DetailsPage from './pages/DetailsPage'
import UpdatePage from './pages/UpdatePage'

 function App() {
 /*    const APITestConnection = async () => {
    const response = await fetch('http://localhost:5005/api')
    const parsed = await response.json()
    console.log(parsed)
  } 
*/
  useEffect(() => {
    // APITestConnection()
  }, [])


   // Routes To CRUD, delete  will be handle in Details
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/details' element={<DetailsPage />} />
      <Route path='/update' element={<UpdatePage />} />

    </Routes>
  )
}

export default App
