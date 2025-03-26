import { useState } from 'react';
import axios from 'axios';
import  Usuario from '../interfaces/usuario';  

function Register() {
    const [usuario, setUsuario] = useState<Usuario>({
        id_usuario: 0,
        primer_nombre: '',
        segundo_nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        email: '',
        password: '',
        id_rol: 2,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const baseURL = "http://localhost:3000"; 

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post(`${baseURL}/auth/register`, usuario);

            console.log('Respuesta:', response.data);
            localStorage.setItem('token', response.data.token);
            window.location.href = "/login";
        } catch (error) {
            console.error("Error al obtener datos de login:", error);
            setError('Hubo un error al registrar el usuario.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUsuario((prevUsuario: any) => ({
            ...prevUsuario,
            [name]: value,
        }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Registrarse</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="primer_nombre" className="block text-sm font-medium text-gray-600">
                            Primer nombre
                        </label>
                        <input
                            type="text"
                            id="primer_nombre"
                            name="primer_nombre"
                            value={usuario.primer_nombre}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="segundo_nombre" className="block text-sm font-medium text-gray-600">
                            Segundo nombre
                        </label>
                        <input
                            type="text"
                            id="segundo_nombre"
                            name="segundo_nombre"
                            value={usuario.segundo_nombre}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="primer_apellido" className="block text-sm font-medium text-gray-600">
                            Primer apellido
                        </label>
                        <input
                            type="text"
                            id="primer_apellido"
                            name="primer_apellido"
                            value={usuario.primer_apellido}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="segundo_apellido" className="block text-sm font-medium text-gray-600">
                            Segundo apellido
                        </label>
                        <input
                            type="text"
                            id="segundo_apellido"
                            name="segundo_apellido"
                            value={usuario.segundo_apellido}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={usuario.email}
                            onChange={handleInputChange}
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
                            value={usuario.password}
                            onChange={handleInputChange}
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
                        {loading ? 'Cargando...' : 'Registrarse'}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <span className="text-sm text-gray-600">¿Ya tienes cuenta? </span>
                    <a href="/login" className="text-blue-500 hover:underline">Inicia sesión aquí</a>
                </div>
            </div>
        </div>
    );
}

export default Register;
