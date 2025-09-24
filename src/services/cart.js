const URl = 'https://fakestoreapi.com'

export const getUserCart = async(user_id) =>{
    const response = await fetch('${URL}/carts/user/${user_id}')
    const data = response.json()
    return data
}