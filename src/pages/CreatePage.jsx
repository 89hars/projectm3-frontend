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

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
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

      const response = await fetch(
        `${import.meta.env.VITE_API}/products/create`,
        {
          method: "POST",
          "Content-Type": "multipart/form-data",
          body: payload,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        const newArtwork = await response.json();
        navigate(`/details/${newArtwork._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layouts>
      <div className="my-5 w-100">
        <h1 className="text-center mb-4 text-primary"> Create Artwork </h1>
        <div className="d-flex align-items-center justify-content-center ">
          <div className="card shadow border-0 p-4" style={{ width: 500 }}>
            <div className="card-body ">
              <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <label className="my-2 text-secondary small">Title:</label>
                <input
                  className="form-control"
                  placeholder="Enter a title"
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                />

                <div className="row my-2">
                  <div className="col-6">
                    <label className="my-2 text-secondary small">Artist:</label>
                    <input
                      placeholder="Enter an artist"
                      className="form-control"
                      value={artist}
                      onChange={(event) => {
                        setArtist(event.target.value);
                      }}
                    />
                  </div>
                  <div className="col-6">
                    <label className="my-2 text-secondary small">Technic:</label>
                    <input
                      placeholder="Enter a technic"
                      className="form-control"
                      value={technic}
                      onChange={(event) => {
                        setTechnic(event.target.value);
                      }}
                    />
                  </div>
                </div>

                <label className="my-2 text-secondary small">Price:</label>
                <input
                  placeholder="Enter a price"
                  className="form-control"
                  value={price}
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                />

                <label className="mt-4 mb-2 text-secondary small">Description:</label>
                <textarea
                 placeholder="Enter a description"
                  className="form-control"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  rows={4}
                  cols={50}
                />

                <label className="my-4 text-secondary small">
                  <input
                    className="form-control"
                    type="file"
                    name="imageUrl"
                    accept="image/png, image/jpg"
                    onChange={(event) => {
                      setImageUrl(URL.createObjectURL(event.target.files[0]));
                    }}
                  ></input>
                  {imageUrl && (
                    <img className="w-100" src={imageUrl} alt="Preview" />
                  )}
                </label>
                <div className="mt-3 ">
                  <button className="btn btn-primary w-100" type="submit">
                    Create your product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default CreatePage;
