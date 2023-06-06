async function updateCartBadge() {
  const cartBadge = document.getElementById('cart-badge')

  const currentResponse = await fetch("/api/user/current")
  const user = await currentResponse.json()

  localStorage.setItem("user", JSON.stringify(user))
  const cartLengthResponse = await fetch(`/api/cart/${user.cartId}`)
  const cart = await cartLengthResponse.json()
  
  cartBadge.innerText = cart.products.length
}

async function addToCart(productId) {
  const user = JSON.parse(localStorage.getItem("user"))
  console.log(user)
  const res = await fetch(`/api/cart/${user.cartId}/${productId}`, { method: 'POST' })

  if (res.status != 200) {
    return
  }

  await updateCartBadge()
}

async function removeFromCart(cartId, productId) {
  const user = JSON.parse(localStorage.getItem("user"))
  const res = await fetch(`/api/cart/${user.cartId}/${productId}`, { method: 'DELETE' })

  if (res.status != 200) {
    return
  }

  await updateCartBadge()

  const el = document.getElementById(productId)
  el.parentElement.removeChild(el)
}

function sendOrder(pedidoId) {
  fetch(`/api/sms/${pedidoId}`, { method: 'POST' })
  .then(res => {
    if (res.status != 202) {
      return
    }

    const row = document.getElementById(pedidoId)

    const cell = row.children.item(3)
    cell.innerHTML = 'Si'
  })
}