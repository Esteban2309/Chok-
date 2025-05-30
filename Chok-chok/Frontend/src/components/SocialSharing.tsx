'use client';
import { useState, useEffect } from 'react';

export default function SocialSharing() {
  const [activeTab, setActiveTab] = useState('ranking');
  const [userRoutine, setUserRoutine] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sortBy, setSortBy] = useState('score');
  const [timeFilter, setTimeFilter] = useState('week');

  // Datos simulados del usuario
  const currentUser = {
    id: 'user-123',
    name: 'María González',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9e5e2e7?w=100&h=100&fit=crop&crop=face',
    score: 892,
    streak: 23,
    rank: 7,
    routine: {
      name: 'Rutina Hidratante Premium',
      products: ['Limpiador suave', 'Sérum vitamina C', 'Hidratante SPF 30'],
      completionRate: 95,
      likes: 34,
      comments: 12
    }
  };

  // Datos simulados del ranking
  const [rankingData, setRankingData] = useState([
    {
      id: 1,
      name: 'Ana Rodríguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      score: 1245,
      streak: 45,
      rank: 1,
      routine: 'Rutina Anti-Aging',
      completionRate: 98,
      trend: 'up',
      change: '+15'
    },
    {
      id: 2,
      name: 'Carmen Silva',
      avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face',
      score: 1156,
      streak: 32,
      rank: 2,
      routine: 'Rutina Piel Sensible',
      completionRate: 96,
      trend: 'up',
      change: '+8'
    },
    {
      id: 3,
      name: 'Laura Jiménez',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop&crop=face',
      score: 1089,
      streak: 28,
      rank: 3,
      routine: 'Rutina Acné',
      completionRate: 94,
      trend: 'down',
      change: '-3'
    },
    {
      id: 4,
      name: 'Sofia Martín',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
      score: 1023,
      streak: 19,
      rank: 4,
      routine: 'Rutina Mixta',
      completionRate: 92,
      trend: 'up',
      change: '+12'
    },
    {
      id: 5,
      name: 'Isabella Torres',
      avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&h=100&fit=crop&crop=face',
      score: 967,
      streak: 15,
      rank: 5,
      routine: 'Rutina Básica',
      completionRate: 89,
      trend: 'up',
      change: '+5'
    },
    {
      id: 6,
      name: 'Valentina Cruz',
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=face',
      score: 934,
      streak: 21,
      rank: 6,
      routine: 'Rutina Grasa',
      completionRate: 91,
      trend: 'stable',
      change: '0'
    },
    {
      id: 7,
      name: 'María González',
      avatar: currentUser.avatar,
      score: currentUser.score,
      streak: currentUser.streak,
      rank: currentUser.rank,
      routine: currentUser.routine.name,
      completionRate: currentUser.routine.completionRate,
      trend: 'up',
      change: '+7',
      isCurrentUser: true
    }
  ]);

  const handleShare = async (platform: string) => {
    const shareText = `¡Mira mi rutina de cuidado facial! ${currentUser.routine.name} - ${currentUser.routine.completionRate}% de completitud`;
    
    if (platform === 'copy') {
      try {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Error copying to clipboard:', err);
      }
    } else if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank');
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <span className="text-2xl">👑</span>;
      case 2:
        return <span className="text-2xl">🥈</span>;
      case 3:
        return <span className="text-2xl">🥉</span>;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') {
      return <span className="text-green-500 font-bold">↗️</span>;
    } else if (trend === 'down') {
      return <span className="text-red-500 font-bold">↘️</span>;
    }
    return <span className="text-gray-400">→</span>;
  };

  const sortedRanking = [...rankingData].sort((a, b) => {
    if (sortBy === 'score') return b.score - a.score;
    if (sortBy === 'streak') return b.streak - a.streak;
    if (sortBy === 'completion') return b.completionRate - a.completionRate;
    return a.rank - b.rank;
  });

  return (
    <div className="w-full bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Comunidad SkinCare
        </h2>
        <p className="text-gray-600">
          Comparte tu progreso y descubre las mejores rutinas
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-full p-1 shadow-md">
          <button
            onClick={() => setActiveTab('ranking')}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'ranking'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <span>🏆</span>
            Ranking
          </button>
          <button
            onClick={() => setActiveTab('share')}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'share'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <span>📤</span>
            Compartir
          </button>
        </div>
      </div>

      {/* Tu Posición Actual */}
      <div className="bg-white rounded-xl p-4 mb-6 border-2 border-purple-200 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-purple-300"
              />
              <div className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {currentUser.rank}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Tu posición actual</h3>
              <p className="text-sm text-gray-600">{currentUser.name}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-600">{currentUser.score}</div>
            <div className="text-sm text-gray-500">puntos</div>
          </div>
        </div>
      </div>

      {activeTab === 'ranking' && (
        <div className="space-y-4">
          {/* Filtros */}
          <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
              >
                <option value="score">Por Puntuación</option>
                <option value="streak">Por Racha</option>
                <option value="completion">Por Completitud</option>
              </select>
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
              >
                <option value="week">Esta Semana</option>
                <option value="month">Este Mes</option>
                <option value="all">Todo el Tiempo</option>
              </select>
            </div>
            <div className="flex items-center text-sm text-gray-600 gap-1">
              <span>👥</span>
              {rankingData.length} participantes
            </div>
          </div>

          {/* Lista de Ranking */}
          <div className="space-y-3">
            {sortedRanking.map((user, index) => (
              <div
                key={user.id}
                className={`bg-white rounded-xl p-4 shadow-md transition-all duration-300 hover:shadow-lg ${
                  user.isCurrentUser ? 'ring-2 ring-purple-300 bg-gradient-to-r from-purple-50 to-pink-50' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-8">
                      {getRankIcon(user.rank)}
                    </div>
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className={`font-semibold ${user.isCurrentUser ? 'text-purple-700' : 'text-gray-800'}`}>
                          {user.name}
                          {user.isCurrentUser && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full ml-2">Tú</span>}
                        </h3>
                        {getTrendIcon(user.trend)}
                        <span className={`text-xs ${user.trend === 'up' ? 'text-green-600' : user.trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}>
                          {user.change !== '0' && user.change}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{user.routine}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <span>📈</span>
                          {user.streak} días
                        </span>
                        <span>{user.completionRate}% completitud</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-purple-600">{user.score}</div>
                    <div className="text-xs text-gray-500">puntos</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'share' && (
        <div className="space-y-6">
          {/* Tu Rutina */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Tu Rutina Actual</h3>
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-purple-700 mb-2">{currentUser.routine.name}</h4>
              <div className="space-y-2">
                {currentUser.routine.products.map((product, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-700">
                    <span className="text-yellow-500 mr-2">⭐</span>
                    {product}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-purple-200">
                <div className="flex items-center gap-4">
                  <span className="flex items-center text-sm text-gray-600 gap-1">
                    <span className="text-red-500">❤️</span>
                    {currentUser.routine.likes}
                  </span>
                  <span className="flex items-center text-sm text-gray-600 gap-1">
                    <span className="text-blue-500">💬</span>
                    {currentUser.routine.comments}
                  </span>
                </div>
                <div className="text-sm font-medium text-purple-600">
                  {currentUser.routine.completionRate}% completado
                </div>
              </div>
            </div>

            {/* Botones de Compartir */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => handleShare('whatsapp')}
                className="flex items-center justify-center px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
              >
                <span className="mr-2">📱</span>
                WhatsApp
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="flex items-center justify-center px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                <span className="mr-2">🐦</span>
                Twitter
              </button>
              <button
                onClick={() => handleShare('copy')}
                className="flex items-center justify-center px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300"
              >
                <span className="mr-2">{copied ? '✅' : '📋'}</span>
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>

          {/* Estadísticas de Compartir */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Impacto de tu Rutina</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">156</div>
                <div className="text-xs text-gray-600">👀 Vistas</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <div className="text-2xl font-bold text-green-600">34</div>
                <div className="text-xs text-gray-600">👍 Me Gusta</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">12</div>
                <div className="text-xs text-gray-600">💬 Comentarios</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">8</div>
                <div className="text-xs text-gray-600">🔄 Compartidos</div>
              </div>
            </div>
          </div>

          {/* Consejos para Mejorar Engagement */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">💡 Consejos para Destacar</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                <span className="text-xl">🔥</span>
                <div>
                  <h4 className="font-medium text-gray-800">Mantén tu racha</h4>
                  <p className="text-sm text-gray-600">Completa tu rutina diariamente para subir en el ranking</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg">
                <span className="text-xl">📸</span>
                <div>
                  <h4 className="font-medium text-gray-800">Comparte resultados</h4>
                  <p className="text-sm text-gray-600">Las fotos de antes/después generan más engagement</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                <span className="text-xl">✍️</span>
                <div>
                  <h4 className="font-medium text-gray-800">Describe tu experiencia</h4>
                  <p className="text-sm text-gray-600">Cuenta qué productos te funcionan mejor y por qué</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Próximos Eventos/Challenges */}
      <div className="mt-6 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <h4 className="font-semibold text-gray-800">Challenge de Junio</h4>
              <p className="text-sm text-gray-600">30 días de rutina perfecta</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-purple-600">Faltan 3 días</div>
            <div className="text-xs text-gray-500">Premio: 500 puntos</div>
          </div>
        </div>
      </div>
    </div>
  );
}