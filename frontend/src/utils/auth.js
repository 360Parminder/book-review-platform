export const getToken = () => {
    // First try to get from localStorage
    const localToken = localStorage.getItem('token');
    if (localToken) return localToken;

    // If not in localStorage, try to get from cookies
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
    
    if (tokenCookie) {
        return tokenCookie.split('=')[1].trim();
    }

    return null;
};