import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layouts from "../components/Layouts";


const CreatePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [technic, setTechnic] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submited");

    const payload = { title, artist, technic, price, description };

    try {
      const response = await fetch(`http://localhost:5005/details/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.status === 201) {
        console.log("successful");
        const newArtwork = await response.json();
        navigate(`/details/${newArtwork._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layouts>
      <div>
        <h1> Create Artwork </h1>
        <form onSubmit={handleSubmit}>
          <label>
            {" "}
            Title:
            <input
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </label>

          <label>
            {" "}
            Artist:
            <input
              value={artist}
              onChange={(event) => {
                setArtist(event.target.value);
              }}
            />
          </label>

          <label>
            {" "}
            Technic:
            <input
              value={technic}
              onChange={(event) => {
                setTechnic(event.target.value);
              }}
            />
          </label>

          <label>
            {" "}
            Price:
            <input
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
          </label>

          <label>
            Description:
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={4}
              cols={50}
            />
          </label>

          <button type="submit"> Create </button>
        </form>
      </div>
    </Layouts>
  );
};

export default CreatePage;
