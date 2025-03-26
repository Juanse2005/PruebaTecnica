import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const baseURL = "http://localhost:3000";
    const navigate = useNavigate();

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        try {
            const response = await axios.post(`${baseURL}/auth/login`, { email, password });
            console.log('Respuesta completa:', response.data);
    
            const { token, id_rol, id_usuario } = response.data?.data || {};
    
            if (!token || id_rol === undefined) {
                throw new Error("Respuesta inválida del servidor.");
            }
    
            localStorage.setItem('token', token);
            localStorage.setItem('id_usuario', id_usuario);
            localStorage.setItem('id_rol', id_rol.toString());
    
            console.log("Redirigiendo según el rol:", id_rol);
    
            setTimeout(() => {
                switch (id_rol) {
                    case 1:
                        window.location.href = ('/dashboard');
                        break;
                    case 2:
                        window.location.href = ('/');
                        break;
                    default:
                        setError("Rol no autorizado.");
                        console.error("Rol desconocido:", id_rol);
                        break;
                }
            }, 500);
    
        } catch (error) {
            console.error("Error en el login:", error);
            setError('Correo o contraseña incorrectos.');
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Iniciar sesión</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

                    <button
                        type="submit"
                        className={`w-full py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Cargando...' : 'Iniciar sesión'}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <span className="text-sm text-gray-600">¿No tienes cuenta? </span>
                    <a href="/register" className="text-blue-500 hover:underline">Regístrate aquí</a>
                </div>
            </div>
        </div>
    );
}

export default Login;
