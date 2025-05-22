'use client';

// Definir tipo para Producto (debe coincidir con el tipo en page.tsx)
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string; // URL de la imagen del producto
}

// Datos de productos de ejemplo (en una app real, vendrían de una API)
const dummyProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Limpiador Espumoso',
    description: 'Limpiador suave para todo tipo de piel.',
    price: 15.99,
    imageUrl: 'https://placehold.co/150x150/E91E63/FFFFFF?text=Limpiador', // Placeholder image
  },
  {
    id: 'prod-2',
    name: 'Sérum Ácido Hialurónico',
    description: 'Hidratación intensa y efecto relleno.',
    price: 25.50,
    imageUrl: 'https://placehold.co/150x150/FF4081/FFFFFF?text=Sérum', // Placeholder image
  },
  {
    id: 'prod-3',
    name: 'Crema Hidratante con Ceramidas',
    description: 'Repara la barrera cutánea y nutre.',
    price: 20.00,
    imageUrl: 'https://placehold.co/150x150/F8BBD0/FFFFFF?text=Crema', // Placeholder image
  },
  // Añadir más productos de ejemplo si es necesario
];

// Definir props para el componente ProductList
interface ProductListProps {
  onProductSelect: (product: Product) => void; // Función a llamar al seleccionar un producto
}

// Componente para mostrar la lista de productos
export default function ProductList({ onProductSelect }: ProductListProps) {
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      {/* Título de la tienda */}
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Tienda de Productos</h2>

      {/* Aquí se podrían añadir filtros y opciones de búsqueda */}
      {/* <div className="mb-4">... Filtros ...</div> */}

      {/* Lista de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyProducts.map(product => (
          // Cada tarjeta de producto es clickeable
          <div
            key={product.id}
            className="border rounded-lg p-4 flex flex-col items-center cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onProductSelect(product)} // Llamar a onProductSelect al hacer click
          >
            {/* Imagen del producto */}
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-32 h-32 object-cover rounded-md mb-4"
              onError={(e) => { // Fallback para imagen
                e.currentTarget.src = 'https://placehold.co/150x150/CCCCCC/000000?text=No+Image';
              }}
            />
            {/* Nombre del producto */}
            <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">{product.name}</h3>
            {/* Precio del producto */}
            <p className="text-pink-600 font-bold">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
