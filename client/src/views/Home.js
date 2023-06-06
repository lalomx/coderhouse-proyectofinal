import { useState, useEffect } from "react";
import axios from "axios"

function Home() {
  const URL = "http://localhost:8080/api/products"

  const [token, setToken] = useState(null)
  const [userCredentials, setUserCredentals] = useState({
    email: '',
    pwd: ''
  })
  const [products, setProducts] = useState([])
  const [newProduct, setNewProduct] = useState({
    name: '',
    platform: '',
    description: '',
    price: ''
  })

  const onLoginFormClick = (e) => {
    e.preventDefault()
    axios.post("http://localhost:8080/login", userCredentials)
    .then((response) => {
      const token = response.data
      setToken(token)
      // guardarlo en el local storage
    })
  }

  const getProducts = () => {
    if (!token) {
      return
    }
    axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(({ data }) => setProducts(data))
  }
  const deleteProduct = (id) => {
    axios.delete(`${URL}/${id}`)
    .then((res) => {
      setProducts(products.filter(p => p.id !== id))
      alert("producto borrado " + id)
    })
    
  }
  const addProduct = (e) => {
    e.preventDefault()

    console.log(newProduct)
    // POST Request
    axios.post(URL, newProduct)
      .then(({ data }) => {
        const producto = data
        products.push(producto)
        setProducts(products)

        setNewProduct({
          name: '',
          platform: '',
          description: '',
          price: ''
        })
      })
    
  }

  useEffect(getProducts, [token])

  return (
    <>
      {token !== null 
      ? <div className="uk-container uk-width-1-1 uk-padding-remove uk-margin-remove">
          <nav className="uk-navbar-container" id="navbar" uk-navbar="">
            <div className="uk-navbar-left uk-margin-remove">
              <ul className="uk-navbar-nav uk-margin-remove">
                <li className="uk-active"><a href="/">Home</a></li>
                <li><a href="#">Carrito<span className="uk-label" id="cart-badge">0</span></a></li>
                <li><a href="#">Cuenta</a>
                  <div className="uk-navbar-dropdown">
                    <ul className="uk-nav uk-navbar-dropdown-nav">
                      <li><a href="#">Perfil</a></li>
                      <li><a href="#">Admin</a></li>
                      <li><a href="#">Logout</a></li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
          <div className="uk-width-1-1 uk-margin-remove uk-align-center uk-text-break uk-padding">
            <h2>Products</h2>
            <table className="uk-table uk-table-divider uk-margin-top">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Plataforma</th>
                  <th>Descripcion</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {
                  products && products.length
                    ? products.map((p) =>
                      <tr key={p.id}>
                        <td>{p.name}</td>
                        <td>{p.platform}</td>
                        <td>{p.description}</td>
                        <td>{p.price}</td>
                        <td><button onClick={() => deleteProduct(p.id)}>Borrar</button></td>
                      </tr>
                    )
                    : <tr><td>No hay datos disponibles</td></tr>
                }
              </tbody>
            </table>

            <div className="uk-margin-top">
              <form className="uk-form-stacked">
                <div className="uk-margin"><label className="uk-form-label" htmlFor="form-stacked-text">Nombre</label>
                  <div className="uk-form-controls">
                    <input className="uk-input" id="form-stacked-nombre" type="text" name="name" value={newProduct.name} onChange={(e) => {
                      setNewProduct({
                        ...newProduct,
                        name: e.target.value
                      })
                    }}/>
                  </div>
                </div>
                <div className="uk-margin"><label className="uk-form-label" htmlFor="form-stacked-select">Plataforma</label>
                  <div className="uk-form-controls">
                    <select className="uk-select" id="form-stacked-plataforma" name="platform" value={newProduct.platform} select={newProduct.platform} onChange={(e) => {
                      setNewProduct({
                        ...newProduct,
                        platform: e.target.value
                      })
                    }}>
                      <option value=""></option>
                      <option value="PS4">PS4</option>
                      <option value="Xbox">Xbox</option>
                      <option value="Nintendo">Nintendo</option>
                    </select>
                  </div>
                </div>
                <div className="uk-margin"><label className="uk-form-label" htmlFor="form-stacked-text">Precio</label>
                  <div className="uk-form-controls">
                    <input className="uk-input" id="form-stacked-precio" type="number" name="price" value={newProduct.price} onChange={(e) => {
                      setNewProduct({
                        ...newProduct,
                        price: e.target.value
                      })
                    }}/>
                  </div>
                </div>
                <div className="uk-margin"><label className="uk-form-label" htmlFor="form-stacked-text">Description</label>
                  <div className="uk-form-controls">
                    <textarea className="uk-textarea" id="form-stacked-description" rows="5" name="description" value={newProduct.description} onChange={(e) => {
                      setNewProduct({
                        ...newProduct,
                        description: e.target.value
                      })
                    }}></textarea>
                  </div>
                </div>
                <button className="uk-button uk-button-secondary uk-button-small uk-margin-top" onClick={addProduct}>Agregar</button>
              </form>
            </div>
          </div>
        </div>
        : <div>
            <form>
              <input type="text" placeholder="email" value={userCredentials.email} onChange={(e) => {
                      setUserCredentals({
                        ...userCredentials,
                        email: e.target.value
                      })
                    }}></input>
              <input type="text" placeholder="password" value={userCredentials.pwd} onChange={(e) => {
                      setUserCredentals({
                        ...userCredentials,
                        pwd: e.target.value
                      })
                    }}></input>
              <button onClick={onLoginFormClick}>login</button>
            </form>
          </div>}
    </>
  );
}

export default Home;
