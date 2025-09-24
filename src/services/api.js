const BASE_URL = 'https://fakestoreapi.com/products'

export const getProducts = async() => {
  const response = await fetch(BASE_URL)
  const data = await response.json();
  return data;
}

export const getProductsbyId = async(id) => {
  const response = await fetch('${BASE_URL}/${id}')
  const data = await response.json();
  return data;
}

export const addProduct = async(product) => {
const response = await fetch(BASE_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(product)
});
  const data = await response.json();
  return data;
}

export const deleteProduct = async(id) => {
  const response = await fetch('${BASEURL}/${id}', {
  method: 'DELETE'
})
  const data = await response.json();
  return data;
}

export const getAllProducts = async() => {
  const response = await fetch('${BASE_URL}')
  const data = await response.json()
  return data
}