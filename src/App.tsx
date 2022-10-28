import React, { useEffect, useState } from 'react';
import './App.css';

type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
};

function App() {
const [products, setProducts] = useState<Product[]>();
const [inputs, setInputs] = useState({name: "", brand: "", price: 0});

 useEffect(() => {
   getData();
 }, []);

 const getData = () => {
   fetch("https://example1-production.up.railway.app/product").then(
     (result) => {
       result.json().then((data: Product[]) => {
         setProducts(data);
       });
     }
   );
 };

 const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   fetch("https://example1-production.up.railway.app/product/", {
     method: "POST",
     body: JSON.stringify({ ...inputs, price: Number(inputs.price) }),
     headers: {
       "Content-Type": "application/json",
     },
   }).then((result) => {
     getData();
     const resetForm = e.target as HTMLFormElement;
     resetForm.reset();
   });
 };

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   //@ts-ignore
   inputs[e.target.name] = e.target.value;
   setInputs({ ...inputs });
 };

 function handleEdit(id: number) {
    fetch(`https://example1-production.up.railway.app/product/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: String(inputs.name),
        brand: String(inputs.brand),
        price: Number(inputs.price),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      getData();
    });
  }

 const handleDelete = (id: number) => {
   fetch(`https://example1-production.up.railway.app/product/${id}`, {
     method: "DELETE",
     headers: {
       "Content-Type": "application/json",
     },
   }).then(() => {
     getData();
   });
 };

 console.log("inputs", inputs);

  return (
    <div className="container">
      <div className="container-left">
        <table className="table table-borderless">
          <thead className="table table-container">
            <tr className="mi-tabla-personalizada">
              <th scope="col">ID</th>
              <th scope="col">Product</th>
              <th scope="col">Brand</th>
              <th scope="col">Price</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
        </table>
        {products?.map((product) => {
          return (
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <th scope="row"> {product.id} </th>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>${product.price}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      name="button"
                      onClick={() => handleEdit(product.id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      name="button"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          );
        })}
      </div>
      <div className="container-right">
        <form onSubmit={handleSubmit} className="container-form">
          <label>Add a product here: </label>
          <div className="container-inputs">
            <input
              type={"text"}
              placeholder="Name"
              name={"name"}
              onChange={handleChange}
            />
            <input
              type={"text"}
              placeholder="Brand"
              name={"brand"}
              onChange={handleChange}
            />
            <input
              type={"text"}
              placeholder="Price"
              name={"price"}
              onChange={handleChange}
            />
          </div>

          <button>Add</button>
        </form>
      </div>
    </div>
  );
}

export default App;
