'use client';

// Definir tipo para Producto (debe coincidir con el tipo en page.tsx)
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

// Definir props para el componente ProductDetail
interface ProductDetailProps {
  product: Product; // El producto a mostrar
  onBack: () => void; // Función para volver a la lista
}

// Componente para mostrar los detalles de un producto
export default function ProductDetail({ product, onBack }: ProductDetailProps) {
  // Función para simular la compra (redirección o añadir al carrito)
  const handleBuy = () => {
    console.log(`Simulating purchase of ${product.name}`);
    // Aquí iría la lógica real:
    // - Redireccionar a enlace de afiliado (CU04)
    // - Añadir al carrito (si hay venta directa)
    alert('Simulando compra. En una app real, se redirigiría o añadiría al carrito.');
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      {/* Botón para volver */}
      <button
        className="text-pink-500 hover:text-pink-800 text-sm mb-4 flex items-center"
        onClick={onBack}
      >
        {/* Icono de flecha hacia atrás (usando SVG inline) */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver a la tienda
      </button>

      {/* Contenedor del detalle del producto */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Imagen del producto */}
        <div className="flex-shrink-0 flex justify-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-48 h-48 object-cover rounded-md"
            onError={(e) => { // Fallback para imagen
              e.currentTarget.src = 'https://placehold.co/200x200/CCCCCC/000000?text=No+Image';
            }}
          />
        </div>

        {/* Información del producto */}
        <div className="flex-grow">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h2>
          <p className="text-pink-600 font-bold text-xl mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Botón de compra */}
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full md:w-auto"
            onClick={handleBuy}
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}
