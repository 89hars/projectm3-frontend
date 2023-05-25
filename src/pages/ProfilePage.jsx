import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";
import Layouts from "../components/Layouts";
import { useSearchParams } from "react-router-dom";

const ProfilePage = () => {
  const { user, token } = useContext(SessionContext);
  const [createdProducts, setCreatedProducts] = useState([]);
  const [productPurchased, setProductPurchased] = useState([]);
  const [productIdToDelete, setProductIdToDelete] = useState();
  const [productIdToUpdate, setProductIdToUpdate] = useState();
  const [title, setTitle] = useState("");
  const [technic, setTechnic] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [queryParameters] = useSearchParams();

  const fetchCreatedProducts = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/products/createdby/${user._id}`
      );
      if (response.status === 200) {
        const data = await response.json();
        setCreatedProducts(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCreatedProducts();
  }, []);

  const fectProductPurchased = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/cart/purchasedby/${user._id}`
      );
      if (response.status === 200) {
        const data = await response.json();
        setProductPurchased(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fectProductPurchased();
  }, []);

  const handleEdit = (productId) => {
    const product = createdProducts.find((p) => p._id === productId);
    setProductIdToUpdate(product._id);
    setTitle(product.title);
    setTechnic(product.technic);
    setPrice(product.price);
    setDescription(product.description);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/products/${productIdToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setCreatedProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productIdToDelete)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const payload = { title, technic, price, description };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/products/${productIdToUpdate}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        setCreatedProducts(
          createdProducts.map((item) =>
            item._id === productIdToUpdate
              ? {
                  ...item,
                  title: data.title,
                  price: data.price,
                  description: data.description,
                  technic: data.technic,
                }
              : item
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Layouts>
        <div className="container py-3">
          <h1>{`Hello ${user.firstName} ${user.lastName}`}</h1>
         
          {queryParameters.get("payment") === "success" && (
            <div className="alert alert-success">Payment successfully completed</div>
          )}

          <h3 className="mt-4">My products</h3>

          <table className="table align-middle">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Technic</th>
                <th scope="col">Price</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {createdProducts.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={product?.media[0]?.link}
                      alt="someStuff"
                      width={100}
                    />
                  </td>
                  <td>{product.title}</td>
                  <td style={{ maxWidth: 500 }}>{product.description}</td>
                  <td>{product.technic}</td>
                  <td>{product.price}</td>
                  <td className="text-end">
                    <button
                      onClick={() => handleEdit(product._id)}
                      className="btn btn-light btn-sm mx-2"
                      data-bs-toggle="modal"
                      data-bs-target="#editModal"
                    >
                      edit
                    </button>
                    <button
                      onClick={() => setProductIdToDelete(product._id)}
                      className="btn btn-danger btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            className="modal fade"
            id="editModal"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <form onSubmit={handleEditSubmit}>
                <div className="modal-content">
                  <div className="modal-header px-4 ">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      Edit product
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body p-4">
                    <label className="text-secondary">Title:</label>
                    <input
                      className="form-control"
                      value={title}
                      onChange={(event) => {
                        setTitle(event.target.value);
                      }}
                    />

                    <label className="text-secondary mt-2">Technic: </label>
                    <input
                      className="form-control"
                      value={technic}
                      onChange={(event) => {
                        setTechnic(event.target.value);
                      }}
                    />

                    <label className="text-secondary mt-2">Price:</label>
                    <input
                      className="form-control"
                      value={price}
                      onChange={(event) => {
                        setPrice(event.target.value);
                      }}
                    />

                    <label className="text-secondary mt-2">Description:</label>
                    <textarea
                      className="form-control"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      rows={4}
                      cols={50}
                    />
                  </div>
                  <div className="modal-footer px-4 py-4">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div
            className="modal fade"
            id="deleteModal"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Delete product
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  Are you sure you want to delete this product?
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      handleDelete();
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layouts>
    </div>
  );
};

export default ProfilePage;
