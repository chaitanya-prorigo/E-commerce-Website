export const handleLogin = async (credentials) => {
    const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    })

    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        console.log(data)
        
        if (!response.ok) {
            // e.g., wrong username or password, but still JSON response
            throw new Error(data.message || 'Login failed');
        }
        if(data.token){
            localStorage.setItem("token", data.token)
            localStorage.setItem("username", credentials.username)
        }
        return data;
    } else {
        const text = await response.text(); // plain text fallback
        throw new Error(text || 'Unknown error');
    }
    
};