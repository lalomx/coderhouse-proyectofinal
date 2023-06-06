function parseCookie() {
  return document.cookie
  .split(';')
  .map(v => v.split('='))
  .reduce((acc, v) => {
    acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
    return acc;
  }, {})
}
  

function getProducts() {
  return fetch("/api/products")
    .then(r => r.json())
}

function attachProduct(p) {
  return `
    <div>
     <div class="uk-card uk-card-default">
      <div class="uk-card-media-top">
        <img src="/static/img/${p.img}" width='1800' height='1200' alt=''/>
      </div>
      <div class="uk-card-body">
        <h3 class="uk-card-title">${p.name}</h3>
        <h5>MXN ${p.price}</h5>
        <span class="uk-badge">${p.platform}</span>
        <p>${p.description}</p>
        <button class="uk-button uk-button-secondary uk-button-small" onclick=addToCart('${p.id}')>Agregar al carrito</button>
      </div>
     </div>
    </div>
  `
}

const productsContainer = document.getElementById('products')
productsContainer.innerHTML = '<p>Cargando...</p>'

window.onload = async () => {
  // console.log(parseCookie())
  await updateCartBadge()

  const prods = await getProducts()
  productsContainer.innerHTML = ''
  productsContainer.innerHTML = prods.reduce((el, p) => el += attachProduct(p), '')
}