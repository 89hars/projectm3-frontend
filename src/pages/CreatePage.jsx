import React from 'react'

function CreatePage() {
  return (
    <div> 
    <h1> Create Artwork </h1> 
    <form>
    <label> 
     Title: 
    <input/>
    </label>
    <label> 
     Artist: 
    <input/>
    </label>
    <label> 
     Technic: 
    <input/>
    </label>
    <label> 
     Price: 
    <input/>
    </label>
    <button type="submit"> Create </button>
    </form>

    </div>
  )
}

export default CreatePage