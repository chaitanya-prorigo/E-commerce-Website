export const credentials = { username: 'john_doe', password: 'pass123' };

export const handleLogin = async (credentials) => {
    const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    })

    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        if (!response.ok) {
            // e.g., wrong username or password, but still JSON response
            throw new Error(data.message || 'Login failed');
        }
        return data;
    } else {
        const text = await response.text(); // plain text fallback
        throw new Error(text || 'Unknown error');
    }
    
};