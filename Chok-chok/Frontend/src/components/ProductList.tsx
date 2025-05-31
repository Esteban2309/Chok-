'use client';

import { useState, useMemo } from 'react';
import { AnalysisResults } from '../../types/analysis';

// Definir tipo para Producto con más propiedades
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // Para mostrar descuentos
  imageUrl: string;
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew?: boolean;
  discount?: number; // Porcentaje de descuento
}

// Datos de productos mejorados
const dummyProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Limpiador Espumoso',
    description: 'Limpiador suave para todo tipo de piel con extractos naturales.',
    price: 15.99,
    originalPrice: 19.99,
    imageUrl: 'https://placehold.co/300x300/E91E63/FFFFFF?text=Limpiador',
    category: 'Limpieza',
    rating: 4.5,
    reviewCount: 127,
    inStock: true,
    discount: 20
  },
  {
    id: 'prod-2',
    name: 'Sérum Ácido Hialurónico',
    description: 'Hidratación intensa y efecto relleno para una piel más joven.',
    price: 25.50,
    imageUrl: 'https://placehold.co/300x300/FF4081/FFFFFF?text=Sérum',
    category: 'Serums',
    rating: 4.8,
    reviewCount: 89,
    inStock: true,
    isNew: true
  },
  {
    id: 'prod-3',
    name: 'Crema Hidratante con Ceramidas',
    description: 'Repara la barrera cutánea y nutre profundamente.',
    price: 20.00,
    imageUrl: 'https://placehold.co/300x300/F8BBD0/FFFFFF?text=Crema',
    category: 'Hidratación',
    rating: 4.3,
    reviewCount: 203,
    inStock: false
  },
  {
    id: 'prod-4',
    name: 'Protector Solar SPF 50',
    description: 'Protección avanzada contra rayos UV con textura ligera.',
    price: 18.75,
    originalPrice: 22.50,
    imageUrl: 'https://placehold.co/300x300/9C27B0/FFFFFF?text=Solar',
    category: 'Protección',
    rating: 4.6,
    reviewCount: 156,
    inStock: true,
    discount: 15
  },
  {
    id: 'prod-5',
    name: 'Tónico Equilibrante',
    description: 'Equilibra el pH de tu piel y minimiza los poros.',
    price: 14.25,
    imageUrl: 'https://placehold.co/300x300/673AB7/FFFFFF?text=Tónico',
    category: 'Tónicos',
    rating: 4.2,
    reviewCount: 94,
    inStock: true,
    isNew: true
  },
  {
    id: 'prod-6',
    name: 'Mascarilla Purificante',
    description: 'Limpieza profunda con arcilla natural y carbón activado.',
    price: 12.99,
    imageUrl: 'https://placehold.co/300x300/3F51B5/FFFFFF?text=Mascarilla',
    category: 'Mascarillas',
    rating: 4.4,
    reviewCount: 78,
    inStock: true
  }
];

// Props del componente
interface ProductListProps {
  onProductSelect: (product: Product) => void;
}

// Componente mejorado
export default function ProductList({ onProductSelect }: ProductListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState('name');
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);

  // Obtener categorías únicas
  const categories = useMemo(() => {
    const cats = ['Todos', ...Array.from(new Set(dummyProducts.map(p => p.category)))];
    return cats;
  }, []);

  // Filtrar y ordenar productos
  const filteredProducts = useMemo(() => {
    let filtered = dummyProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
      const matchesStock = !showOnlyInStock || product.inStock;
      
      return matchesSearch && matchesCategory && matchesStock;
    });

    // Ordenar productos
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy, showOnlyInStock]);

  // Renderizar estrellas de rating
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {/* Estrellas llenas */}
        {Array(fullStars).fill(0).map((_, i) => (
          <span key={`full-${i}`} className="text-yellow-400 text-sm">★</span>
        ))}
        {/* Media estrella */}
        {hasHalfStar && <span className="text-yellow-400 text-sm">☆</span>}
        {/* Estrellas vacías */}
        {Array(emptyStars).fill(0).map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300 text-sm">★</span>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6">
        <h2 className="text-3xl font-bold text-center mb-2">Tienda de Belleza</h2>
        <p className="text-center text-pink-100">Encuentra los mejores productos para tu piel</p>
      </div>

      {/* Controles de filtros y búsqueda */}
      <div className="p-6 bg-gray-50 border-b">
        {/* Barra de búsqueda */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all text-gray-700"
          />
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-4 items-center">
          {/* Selector de categoría */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none text-gray-700"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Selector de ordenamiento */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none text-gray-700"
          >
            <option value="name">Nombre A-Z</option>
            <option value="price-low">Precio: Menor a Mayor</option>
            <option value="price-high">Precio: Mayor a Menor</option>
            <option value="rating">Mejor Valorados</option>
          </select>

          {/* Checkbox para productos en stock */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlyInStock}
              onChange={(e) => setShowOnlyInStock(e.target.checked)}
              className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500"
            />
            <span className="text-sm text-gray-700">Solo en stock</span>
          </label>
        </div>

        {/* Contador de resultados */}
        <p className="text-sm text-gray-600 mt-4">
          Mostrando {filteredProducts.length} de {dummyProducts.length} productos
        </p>
      </div>

      {/* Grid de productos */}
      <div className="p-6">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No se encontraron productos</h3>
            <p className="text-gray-500">Intenta ajustar tus filtros de búsqueda</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className={`group relative bg-white border rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  !product.inStock ? 'opacity-75' : ''
                }`}
                onClick={() => product.inStock && onProductSelect(product)}
              >
                {/* Badges */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                  {product.isNew && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Nuevo
                    </span>
                  )}
                  {product.discount && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      -{product.discount}%
                    </span>
                  )}
                  {!product.inStock && (
                    <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Agotado
                    </span>
                  )}
                </div>

                {/* Imagen del producto */}
                <div className="relative overflow-hidden bg-gray-100">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/300x300/CCCCCC/666666?text=Sin+Imagen';
                    }}
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <span className="text-white font-semibold">Agotado</span>
                    </div>
                  )}
                </div>

                {/* Información del producto */}
                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                      {product.category}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-1">
                    {product.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Rating y reseñas */}
                  <div className="flex items-center gap-2 mb-3">
                    {renderStars(product.rating)}
                    <span className="text-sm text-gray-500">
                      ({product.reviewCount})
                    </span>
                  </div>

                  {/* Precio */}
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-pink-600">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Overlay de hover */}
                <div className="absolute inset-0 bg-pink-500 bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300 pointer-events-none" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}