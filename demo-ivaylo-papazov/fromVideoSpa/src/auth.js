export const saveToken = (token) =>{
    localStorage.setItem('auth_token',token);
};

export const isAuthenticated = () => {
    return Boolean(localStorage.getItem('auth_token'));
};

export const logout = () => {
    localStorage.removeItem('auth_token');
}