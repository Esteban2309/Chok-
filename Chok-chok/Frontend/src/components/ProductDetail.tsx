'use client';

import { useState, useCallback, useMemo, memo } from 'react';
// import Image from 'next/image'; // Comentado temporalmente

// Tipos de datos mejorados
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  rating?: number;
  reviewCount?: number;
  brand?: string;
  category?: string;
  inStock?: boolean;
  discount?: number;
  benefits?: string[];
  ingredients?: string[];
}

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart?: (product: Product) => Promise<void>;
  onAddToWishlist?: (productId: string) => void;
  onShare?: (product: Product) => void;
  currency?: 'COP' | 'USD' | 'EUR';
  locale?: string;
}

// Constantes
const FALLBACK_IMAGE = 'https://placehold.co/400x400/F3F4F6/9CA3AF?text=Chok-Chok+AI';
const LOADING_MESSAGES = [
  'Añadiendo al carrito...',
  'Procesando compra...',
  'Casi listo...'
];

// Componentes de iconos SVG
const LoaderIcon = memo(() => (
  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
));

const ArrowLeftIcon = memo(() => (
  <svg className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
));

const ShoppingCartIcon = memo(() => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5-5M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
  </svg>
));

const HeartIcon = memo(() => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
));

const ShareIcon = memo(() => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
  </svg>
));

const StarIcon = memo(({ filled }: { filled: boolean }) => (
  <svg className={`h-4 w-4 ${filled ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
));

const ShieldIcon = memo(() => (
  <svg className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
));

const TruckIcon = memo(() => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
));

// Hooks personalizados
const useAnimatedLoader = (isLoading: boolean) => {
  const [messageIndex, setMessageIndex] = useState(0);
  
  useState(() => {
    if (!isLoading) return;
    
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % LOADING_MESSAGES.length);
    }, 800);
    
    return () => clearInterval(interval);
  });
  
  return LOADING_MESSAGES[messageIndex];
};

// Componentes optimizados
const BackButton = memo(({ onBack }: { onBack: () => void }) => (
  <button
    className="group flex items-center gap-2 text-pink-500 hover:text-pink-700 transition-all duration-200 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-pink-300 rounded-lg p-2 hover:bg-pink-50"
    onClick={onBack}
    aria-label="Volver a la tienda"
  >
    <ArrowLeftIcon />
    <span className="font-medium">Volver a la tienda</span>
  </button>
));

const PriceDisplay = memo(({ 
  price, 
  discount, 
  currency = 'COP', 
  locale = 'es-CO' 
}: {
  price: number;
  discount?: number;
  currency?: string;
  locale?: string;
}) => {
  const formatter = useMemo(() => 
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: currency === 'COP' ? 0 : 2
    }), [locale, currency]
  );

  const originalPrice = useMemo(() => formatter.format(price), [formatter, price]);
  const discountedPrice = useMemo(() => 
    discount ? formatter.format(price * (1 - discount / 100)) : null, 
    [formatter, price, discount]
  );

  return (
    <div className="flex items-center gap-3 mb-4">
      {discount ? (
        <>
          <span className="text-2xl font-bold text-pink-600">
            {discountedPrice}
          </span>
          <span className="text-lg text-gray-500 line-through">
            {originalPrice}
          </span>
          <span className="bg-red-100 text-red-800 text-sm font-semibold px-2 py-1 rounded-full">
            -{discount}%
          </span>
        </>
      ) : (
        <span className="text-2xl font-bold text-pink-600">
          {originalPrice}
        </span>
      )}
    </div>
  );
});

const RatingDisplay = memo(({ rating, reviewCount }: { rating?: number; reviewCount?: number }) => {
  if (!rating) return null;

  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon key={i} filled={i < Math.floor(rating)} />
        ))}
      </div>
      <span className="text-sm text-gray-600">
        {rating.toFixed(1)} ({reviewCount || 0} reseñas)
      </span>
    </div>
  );
});

const ProductBenefits = memo(({ benefits }: { benefits?: string[] }) => {
  if (!benefits?.length) return null;

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Beneficios</h3>
      <ul className="space-y-2">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start gap-2 text-gray-700">
            <ShieldIcon />
            <span className="text-sm">{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
});

const StockStatus = memo(({ inStock = true }: { inStock?: boolean }) => (
  <div className={`flex items-center gap-2 mb-4 ${inStock ? 'text-green-600' : 'text-red-600'}`}>
    <div className={`w-2 h-2 rounded-full ${inStock ? 'bg-green-500' : 'bg-red-500'}`} />
    <span className="text-sm font-medium">
      {inStock ? 'En stock' : 'Agotado'}
    </span>
  </div>
));

const ActionButtons = memo(({ 
  product, 
  isLoading, 
  onBuy, 
  onAddToWishlist, 
  onShare,
  loadingMessage 
}: {
  product: Product;
  isLoading: boolean;
  onBuy: () => void;
  onAddToWishlist?: (productId: string) => void;
  onShare?: (product: Product) => void;
  loadingMessage: string;
}) => (
  <div className="space-y-4">
    {/* Botón principal de compra */}
    <button
      className={`
        w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold
        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
        ${product.inStock !== false
          ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white focus:ring-green-300'
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }
        ${isLoading ? 'animate-pulse' : ''}
      `}
      onClick={onBuy}
      disabled={isLoading || product.inStock === false}
      aria-label={`Comprar ${product.name}`}
    >
      {isLoading ? (
        <>
          <LoaderIcon />
          <span>{loadingMessage}</span>
        </>
      ) : (
        <>
          <ShoppingCartIcon />
          <span>{product.inStock !== false ? 'Añadir al carrito' : 'Agotado'}</span>
        </>
      )}
    </button>

    {/* Botones secundarios */}
    <div className="flex gap-2">
      {onAddToWishlist && (
        <button
          className="flex-1 flex items-center justify-center gap-2 py-2 px-4 border border-pink-300 text-pink-600 hover:bg-pink-50 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
          onClick={() => onAddToWishlist(product.id)}
          aria-label="Añadir a favoritos"
        >
          <HeartIcon />
          <span>Favoritos</span>
        </button>
      )}
      
      {onShare && (
        <button
          className="flex-1 flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          onClick={() => onShare(product)}
          aria-label="Compartir producto"
        >
          <ShareIcon />
          <span>Compartir</span>
        </button>
      )}
    </div>
  </div>
));

const ShippingInfo = memo(() => (
  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
    <div className="flex items-center gap-2 text-blue-700">
      <TruckIcon />
      <span className="font-semibold">Envío gratis</span>
    </div>
    <p className="text-sm text-blue-600 mt-1">
      En compras superiores a $100.000 COP
    </p>
  </div>
));

const IngredientsList = memo(({ ingredients }: { ingredients?: string[] }) => {
  if (!ingredients?.length) return null;

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Ingredientes principales</h3>
      <div className="flex flex-wrap gap-2">
        {ingredients.map((ingredient, index) => (
          <span
            key={index}
            className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
          >
            {ingredient}
          </span>
        ))}
      </div>
    </div>
  );
});

const ProductMetadata = memo(({ brand, category }: { brand?: string; category?: string }) => (
  <div className="mb-4 space-y-1">
    {brand && (
      <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">
        {brand}
      </p>
    )}
    {category && (
      <p className="text-xs text-gray-400">
        Categoría: {category}
      </p>
    )}
  </div>
));

// Componente principal optimizado
const ProductDetail = memo(({ 
  product, 
  onBack, 
  onAddToCart,
  onAddToWishlist,
  onShare,
  currency = 'COP',
  locale = 'es-CO'
}: ProductDetailProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const loadingMessage = useAnimatedLoader(isLoading);

  // Función optimizada para manejar la compra
  const handleBuy = useCallback(async () => {
    if (isLoading || product.inStock === false) return;
    
    setIsLoading(true);
    
    try {
      if (onAddToCart) {
        await onAddToCart(product);
      } else {
        // Simulación por defecto
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log(`Producto añadido al carrito: ${product.name}`);
        alert(`¡${product.name} añadido al carrito exitosamente!`);
      }
    } catch (error) {
      console.error('Error al añadir al carrito:', error);
      alert('Error al procesar la compra. Inténtalo nuevamente.');
    } finally {
      setIsLoading(false);
    }
  }, [product, isLoading, onAddToCart]);

  // Función para manejar favoritos
  const handleAddToWishlist = useCallback((productId: string) => {
    setIsFavorite(prev => !prev);
    if (onAddToWishlist) {
      onAddToWishlist(productId);
    }
  }, [onAddToWishlist]);

  // Función para compartir
  const handleShare = useCallback((product: Product) => {
    if (onShare) {
      onShare(product);
    } else if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      });
    } else {
      // Fallback para navegadores sin Web Share API
      const shareUrl = `${window.location.origin}${window.location.pathname}?product=${product.id}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert('¡Enlace copiado al portapapeles!');
      });
    }
  }, [onShare]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 md:p-8">
        <BackButton onBack={onBack} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Imagen del producto - Comentado temporalmente */}
          {/* 
          <div className="relative">
            <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-pink-50 to-purple-50">
              <Image
                src={product.imageUrl || FALLBACK_IMAGE}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {product.discount && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                -{product.discount}%
              </div>
            )}
          </div>
          */}

          {/* Información del producto */}
          <div className="space-y-6">
            <ProductMetadata brand={product.brand} category={product.category} />

            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
            </div>

            <RatingDisplay rating={product.rating} reviewCount={product.reviewCount} />
            
            <PriceDisplay 
              price={product.price} 
              discount={product.discount}
              currency={currency}
              locale={locale}
            />
            
            <StockStatus inStock={product.inStock} />

            {/* Descripción */}
            <div>
              <p className="text-gray-700 leading-relaxed mb-4">
                {product.description}
              </p>
            </div>

            <ProductBenefits benefits={product.benefits} />
            
            <IngredientsList ingredients={product.ingredients} />

            <ActionButtons
              product={product}
              isLoading={isLoading}
              onBuy={handleBuy}
              onAddToWishlist={handleAddToWishlist}
              onShare={handleShare}
              loadingMessage={loadingMessage}
            />

            <ShippingInfo />
          </div>
        </div>
      </div>
    </div>
  );
});

// Display names para debugging
ProductDetail.displayName = 'ProductDetail';
BackButton.displayName = 'BackButton';
PriceDisplay.displayName = 'PriceDisplay';
RatingDisplay.displayName = 'RatingDisplay';
ProductBenefits.displayName = 'ProductBenefits';
StockStatus.displayName = 'StockStatus';
ActionButtons.displayName = 'ActionButtons';
ShippingInfo.displayName = 'ShippingInfo';
LoaderIcon.displayName = 'LoaderIcon';
ArrowLeftIcon.displayName = 'ArrowLeftIcon';
ShoppingCartIcon.displayName = 'ShoppingCartIcon';
HeartIcon.displayName = 'HeartIcon';
ShareIcon.displayName = 'ShareIcon';
StarIcon.displayName = 'StarIcon';
ShieldIcon.displayName = 'ShieldIcon';
TruckIcon.displayName = 'TruckIcon';
IngredientsList.displayName = 'IngredientsList';
ProductMetadata.displayName = 'ProductMetadata';

export default ProductDetail;