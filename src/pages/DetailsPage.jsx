
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// Here we handle the delete and update as buttons. 

const DetailsPage = () => {
  const { artObjectId } = useParams()
  const [pieceOfArt, setPieceOfArt] = useState()

  const fetchPieceOfArt = async () => {
    try {
      const response = await fetch(`http://localhost:5005/api/${artObjectId}`)
      if (response.status === 200) {
        const parsed = await response.json()
        setPieceOfArt(parsed)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPieceOfArt()
  }, [])

  useEffect(() => {
    console.log(pieceOfArt)
  }, [pieceOfArt])

  return pieceOfArt ? (
    <>
      <h1>Details of {pieceOfArt.title}</h1>
      <h2>{ /* something coming from the model */ } </h2>
    </>
  ) : (
    <h1>Loading...</h1>
  )
}

export default DetailsPage
