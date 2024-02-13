const policies = {
    PUBLIC: 'PUBLIC',             // Acceso libre, sin necesidad de autenticación
    AUTHENTICATED: 'AUTHENTICATED', // Acceso para cualquier cliente con un token válido
    USER: 'USER',                 // Acceso para usuarios comunes
    USER_PREMIUM: 'USER_PREMIUM', // Acceso para usuarios con membresía premium
    ADMIN: 'ADMIN',               // Acceso exclusivo para administradores del sitio
};

export default policies;
