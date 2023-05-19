import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CreatePage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [artist, setArtist] = useState("")
  const [technic, setTechnic] = useState("")
  const [price, setPrice] = useState(0)

  // How the submit will be handle
  const handleSubmit = async event => {
    event.preventDefault()
    console.log('submited')
  // Payload being send 
    const payload = {title, artist, technic, price,}

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/details`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(payload),
      })
      if (response.status === 201) {
        console.log('successful')
        const newArtwork = await response.json()
        navigate(`/details/${newArtwork.id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div> 
    <h1> Create Artwork </h1> 
    <form onSubmit = {handleSubmit}>

    <label> Title: 
    <input 
    value= {title}
    onChange={event => {setTitle(event.target.value)}} /> 
    </label>

    <label> Artist: 
    <input 
    value={artist} 
    onChange={event => {setArtist(event.target.value)}}/> 
    </label>

    <label> Technic: 
    <input value={technic}
    onChange={event => {setTechnic(event.target.value)}}/> 
    </label>

    <label>  Price: 
    <input value={price}
    onChange={event => {setPrice(event.target.value)}} /> 
    </label>

    <button type="submit"> Create </button>
    </form>
    </div>
  )
}

export default CreatePage