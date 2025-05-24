'use client';

import { useState, useCallback, useMemo } from 'react';

// Definir props para el componente Auth
interface AuthProps {
  onLoginSuccess: (userData?: any) => void;
  onRegisterSuccess: (userData?: any) => void;
  className?: string;
}

// Tipos para validación
interface ValidationErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

// Utilidades de validación
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Mínimo 8 caracteres');
  }
  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Al menos una minúscula');
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Al menos una mayúscula');
  }
  if (!/(?=.*\d)/.test(password)) {
    errors.push('Al menos un número');
  }
  if (!/(?=.*[@$!%*?&])/.test(password)) {
    errors.push('Al menos un carácter especial (@$!%*?&)');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Iconos SVG
const EyeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOffIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L12 12m0 0l3.878 3.878M12 12l6.878 6.878" />
  </svg>
);

const EmailIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
  </svg>
);

const LockIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const LoadingIcon = ({ className }: { className?: string }) => (
  <svg className={`animate-spin ${className}`} fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Componente principal
export default function Auth({ onLoginSuccess, onRegisterSuccess, className = '' }: AuthProps) {
  // Estados del formulario
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // Estados de UI
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  // Validación en tiempo real
  const validationResults = useMemo(() => {
    const results: ValidationErrors = {};

    if (touchedFields.has('email') && formData.email) {
      if (!validateEmail(formData.email)) {
        results.email = 'Ingresa un correo electrónico válido';
      }
    }

    if (touchedFields.has('password') && formData.password) {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        results.password = passwordValidation.errors.join(', ');
      }
    }

    if (isRegistering && touchedFields.has('confirmPassword') && formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        results.confirmPassword = 'Las contraseñas no coinciden';
      }
    }

    return results;
  }, [formData, touchedFields, isRegistering]);

  // Verificar si el formulario es válido
  const isFormValid = useMemo(() => {
    const hasEmail = formData.email && validateEmail(formData.email);
    const hasValidPassword = formData.password && validatePassword(formData.password).isValid;
    const passwordsMatch = !isRegistering || formData.password === formData.confirmPassword;
    
    return hasEmail && hasValidPassword && passwordsMatch && Object.keys(validationResults).length === 0;
  }, [formData, isRegistering, validationResults]);

  // Manejar cambios en los campos
  const handleInputChange = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouchedFields(prev => new Set(prev).add(field));
    
    // Limpiar errores del servidor cuando el usuario empiece a escribir
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: undefined }));
    }
  }, [errors.general]);

  // Manejar blur en los campos
  const handleBlur = useCallback((field: string) => {
    setTouchedFields(prev => new Set(prev).add(field));
  }, []);

  // Simular llamada API con delay
  const simulateApiCall = (isRegister: boolean): Promise<any> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simular algunos errores comunes
        if (formData.email === 'error@test.com') {
          reject(new Error('Este correo ya está registrado'));
          return;
        }
        if (formData.email === 'network@error.com') {
          reject(new Error('Error de conexión. Inténtalo de nuevo.'));
          return;
        }
        
        // Éxito simulado
        resolve({
          user: {
            email: formData.email,
            id: Math.random().toString(36).substr(2, 9)
          },
          token: 'fake-jwt-token'
        });
      }, 1500);
    });
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Marcar todos los campos como tocados
    setTouchedFields(new Set(['email', 'password', 'confirmPassword']));
    
    // Verificar validación
    if (!isFormValid) {
      setErrors({ general: 'Por favor, corrige los errores del formulario' });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const userData = await simulateApiCall(isRegistering);
      
      if (isRegistering) {
        onRegisterSuccess(userData);
      } else {
        onLoginSuccess(userData);
      }
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : 'Ha ocurrido un error inesperado'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Alternar entre login y registro
  const toggleMode = useCallback(() => {
    setIsRegistering(!isRegistering);
    setErrors({});
    setTouchedFields(new Set());
    setFormData(prev => ({ ...prev, confirmPassword: '' }));
  }, [isRegistering]);

  // Indicador de fortaleza de contraseña
  const getPasswordStrength = (password: string) => {
    const validation = validatePassword(password);
    const score = 5 - validation.errors.length;
    
    if (score <= 1) return { level: 'Muy débil', color: 'bg-red-500', width: '20%' };
    if (score <= 2) return { level: 'Débil', color: 'bg-orange-500', width: '40%' };
    if (score <= 3) return { level: 'Regular', color: 'bg-yellow-500', width: '60%' };
    if (score <= 4) return { level: 'Fuerte', color: 'bg-blue-500', width: '80%' };
    return { level: 'Muy fuerte', color: 'bg-green-500', width: '100%' };
  };

  const passwordStrength = formData.password ? getPasswordStrength(formData.password) : null;

  return (
    <div className={`w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100 ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {isRegistering ? 'Crear Cuenta' : 'Bienvenido'}
        </h2>
        <p className="text-gray-600">
          {isRegistering ? 'Únete a nuestra comunidad' : 'Inicia sesión en tu cuenta'}
        </p>
      </div>

      {/* Error general */}
      {errors.general && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <XIcon className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-red-700 text-sm">{errors.general}</p>
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Correo Electrónico
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <EmailIcon className="w-5 h-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              placeholder="ejemplo@correo.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors ${
                validationResults.email ? 'border-red-300' : 'border-gray-300'
              }`}
              disabled={isLoading}
            />
            {formData.email && !validationResults.email && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <CheckIcon className="w-5 h-5 text-green-500" />
              </div>
            )}
          </div>
          {validationResults.email && (
            <p className="mt-2 text-sm text-red-600">{validationResults.email}</p>
          )}
        </div>

        {/* Campo Contraseña */}
        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
            Contraseña
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LockIcon className="w-5 h-5 text-gray-400" />
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              onBlur={() => handleBlur('password')}
              className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors ${
                validationResults.password ? 'border-red-300' : 'border-gray-300'
              }`}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors"
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOffIcon className="w-5 h-5 text-gray-400" />
              ) : (
                <EyeIcon className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
          
          {/* Indicador de fortaleza de contraseña */}
          {isRegistering && formData.password && (
            <div className="mt-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-600">Fortaleza:</span>
                <span className={`text-xs font-medium ${
                  passwordStrength?.level === 'Muy fuerte' ? 'text-green-600' :
                  passwordStrength?.level === 'Fuerte' ? 'text-blue-600' :
                  passwordStrength?.level === 'Regular' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {passwordStrength?.level}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${passwordStrength?.color}`}
                  style={{ width: passwordStrength?.width }}
                ></div>
              </div>
            </div>
          )}
          
          {validationResults.password && (
            <p className="mt-2 text-sm text-red-600">{validationResults.password}</p>
          )}
        </div>

        {/* Campo Confirmar Contraseña (solo en registro) */}
        {isRegistering && (
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
              Confirmar Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                onBlur={() => handleBlur('confirmPassword')}
                className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors ${
                  validationResults.confirmPassword ? 'border-red-300' : 'border-gray-300'
                }`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors"
                disabled={isLoading}
              >
                {showConfirmPassword ? (
                  <EyeOffIcon className="w-5 h-5 text-gray-400" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-gray-400" />
                )}
              </button>
              {formData.confirmPassword && !validationResults.confirmPassword && formData.password === formData.confirmPassword && (
                <div className="absolute inset-y-0 right-10 pr-3 flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-500" />
                </div>
              )}
            </div>
            {validationResults.confirmPassword && (
              <p className="mt-2 text-sm text-red-600">{validationResults.confirmPassword}</p>
            )}
          </div>
        )}

        {/* Botón de envío */}
        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 ${
            isFormValid && !isLoading
              ? 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <>
              <LoadingIcon className="w-5 h-5" />
              Procesando...
            </>
          ) : (
            <>{isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}</>
          )}
        </button>
      </form>

      {/* Alternativa */}
      <div className="mt-8 text-center">
        <button
          onClick={toggleMode}
          disabled={isLoading}
          className="text-pink-600 hover:text-pink-800 font-medium transition-colors disabled:opacity-50"
        >
          {isRegistering ? '¿Ya tienes cuenta? Inicia Sesión' : '¿No tienes cuenta? Crea una'}
        </button>
      </div>

      {/* Información adicional para registro */}
      {isRegistering && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            Al crear una cuenta, aceptas nuestros{' '}
            <span className="text-pink-600 hover:underline cursor-pointer">
              términos de servicio
            </span>{' '}
            y{' '}
            <span className="text-pink-600 hover:underline cursor-pointer">
              política de privacidad
            </span>
          </p>
        </div>
      )}
    </div>
  );
}