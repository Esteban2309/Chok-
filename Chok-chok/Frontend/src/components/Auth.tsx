'use client';

import { useState } from 'react'; // Hook para manejar el estado local

// Definir props para el componente Auth
interface AuthProps {
  onLoginSuccess: () => void; // Función a llamar al iniciar sesión con éxito
  onRegisterSuccess: () => void; // Función a llamar al registrarse con éxito
}

// Componente de Autenticación (Login y Registro)
export default function Auth({ onLoginSuccess, onRegisterSuccess }: AuthProps) {
  // Estado para el correo electrónico y la contraseña
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Estado para alternar entre login y registro
  const [isRegistering, setIsRegistering] = useState(false);
  // Estado para mensajes de error (simplificado)
  const [error, setError] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Limpiar errores previos

    // Validación básica (en una app real, habría validación de formato y llamadas API)
    if (!email || !password) {
      setError('Por favor, ingresa correo y contraseña.');
      return;
    }

    if (isRegistering) {
      // Lógica de registro (simulada)
      console.log('Registering with:', email, password);
      // Aquí iría la llamada API para registrar
      // Si es exitoso:
      onRegisterSuccess();
    } else {
      // Lógica de inicio de sesión (simulada)
      console.log('Logging in with:', email, password);
      // Aquí iría la llamada API para iniciar sesión
      // Si es exitoso:
      onLoginSuccess();
    }
  };

  return (
    <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
      {/* Título del formulario */}
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}
      </h2>

      {/* Mostrar mensaje de error si existe */}
      {error && (
        <p className="text-red-500 text-center mb-4">{error}</p>
      )}

      {/* Formulario de autenticación */}
      <form onSubmit={handleSubmit}>
        {/* Campo de correo electrónico */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Correo Electrónico
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="ejemplo@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required // Campo requerido
          />
        </div>

        {/* Campo de contraseña */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required // Campo requerido
          />
        </div>

        {/* Botón de envío */}
        <div className="flex items-center justify-between">
          <button
            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
          </button>
        </div>
      </form>

      {/* Opción para cambiar entre login y registro */}
      <div className="mt-6 text-center">
        <button
          className="text-pink-500 hover:text-pink-800 text-sm"
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? '¿Ya tienes cuenta? Inicia Sesión' : '¿No tienes cuenta? Crea una'}
        </button>
      </div>
    </div>
  );
}
 