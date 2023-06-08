import { useEffect, useState } from "react";
import axios from "axios"

function App() {
  const [products, setProducts] = useState([])

  const getProducts = () => {
    // console.log('getProducts')
    // return [{ name: 1 }]
    axios.post("http://localhost:8080/graphql", {
      query: `
        query {
          getAllProducts {
            name
        }
      }
      `
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(({ data }) => { 
        const products = data.data.getAllProducts
        setProducts(products)
      })
    
  }

  useEffect(getProducts, [])

  return (
    <div className="App uk-container">
      {products.map((c, id)=> <p key={id}>{c.name}</p>)}
    </div>
  );
}

export default App;
