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

useEffect (() => {
  fetch("https://example1-production.up.railway.app/product").then((result) => {
    result.json().then((data: Product[]) => {
      setProducts(data);
    });
  });
}, []);

console.log(products);

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  console.log("evento", e);
  e.preventDefault();
  fetch("https://example1-production.up.railway.app/product", {
    method: "POST",
    body: JSON.stringify({ ...inputs, price: Number(inputs.price) }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((result) => {
    result.json().then((data) => {
      console.log(data);
    });
  });
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //@ts-ignore
  inputs[e.target.name] = e.target.value;
  setInputs({...inputs});
};

/* const handleShow = (e) => {

} */

  return (
    <div className="container-global">
      <>
        {products?.map((product) => {
          return (
            <div key={product.id} className="container-product">
          
              <div className='container-grid'>
                <p>{product.name}</p>
                <p>{product.brand}</p>
                <p>{product.price}</p>
              </div>
            </div>
          );
        })}
      </>

      <form onSubmit={handleSubmit} className="container-form">
        <label>Agregá tu producto acá: </label>
        <div className='container-inputs'>
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

        <button>Crear</button>
      </form>
    </div>
  );
}

export default App;

/* useEffect(() => {
  fetch("https://example1-production.up.railway.app/product", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}, []); */

// https://nodo-production.up.railway.app/product