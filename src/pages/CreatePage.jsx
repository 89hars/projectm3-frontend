import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Layouts from "../components/Layouts";
import { SessionContext } from "../contexts/SessionContext";

const CreatePage = () => {
  const { token } = useContext(SessionContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [technic, setTechnic] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // How the submit will be handle
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submited");

    // Payload being send
    // const payload = { title, artist, technic, price, description };
    const image = event.target.imageUrl.files[0];
    const payload = new FormData();
    payload.append("title", title);
    payload.append("artist", artist);
    payload.append("technic", technic);
    payload.append("price", price);
    payload.append("description", description);
    payload.append("imageUrl", image);

    try {
      const response = await fetch(`http://localhost:5005/products/create`, {
        method: "POST",
        "Content-Type": "multipart/form-data",
        body: payload,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
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
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
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

          <label>
            <input
              type="file"
              name="imageUrl"
              accept="image/png, image/jpg"
              onChange={(event) => {
                setImageUrl(URL.createObjectURL(event.target.files[0]));
              }}
            ></input>
            {imageUrl && <img src={imageUrl} alt="Preview" />}
          </label>

          <button type="submit"> Create </button>
        </form>
      </div>
    </Layouts>
  );
};

export default CreatePage;
