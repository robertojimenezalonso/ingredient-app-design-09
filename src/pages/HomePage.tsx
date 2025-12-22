import { useNavigate } from 'react-router-dom';
import { Calendar, Users, ChefHat, Utensils, Salad, Coffee } from 'lucide-react';
import { AirbnbHeader } from '@/components/AirbnbHeader';
import { useUserConfig } from '@/contexts/UserConfigContext';

interface RecipeList {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  recipeCount: number;
  image: string;
  gradient: string;
}

const recipeLists: RecipeList[] = [
  {
    id: 'semanal',
    title: 'Menú Semanal',
    description: 'Planifica tu semana completa',
    icon: <Calendar className="w-6 h-6" />,
    recipeCount: 21,
    image: '/lovable-uploads/8530d68e-8316-44b0-8389-d319fd405949.png',
    gradient: 'from-orange-400 to-red-500'
  },
  {
    id: 'rapidas',
    title: 'Recetas Rápidas',
    description: 'Listas en menos de 30 min',
    icon: <Utensils className="w-6 h-6" />,
    recipeCount: 15,
    image: '/lovable-uploads/7f516dd8-5753-49bd-9b5d-aa5c0bfeedd1.png',
    gradient: 'from-green-400 to-teal-500'
  },
  {
    id: 'saludables',
    title: 'Saludables',
    description: 'Bajo en calorías y nutritivo',
    icon: <Salad className="w-6 h-6" />,
    recipeCount: 18,
    image: '/lovable-uploads/d923963b-f4fc-4381-8216-90ad753ef245.png',
    gradient: 'from-lime-400 to-green-500'
  },
  {
    id: 'desayunos',
    title: 'Desayunos',
    description: 'Empieza el día con energía',
    icon: <Coffee className="w-6 h-6" />,
    recipeCount: 12,
    image: '/lovable-uploads/a06f3ae9-f80a-48b6-bf55-8c1b736c79f8.png',
    gradient: 'from-amber-400 to-orange-500'
  }
];

const HomePage = () => {
  const navigate = useNavigate();
  const { config } = useUserConfig();

  const handleListClick = (listId: string) => {
    navigate('/milista', { state: { selectedList: listId } });
  };

  const handleFilterChange = (filter: 'receta' | 'ingredientes') => {
    // Navigation removed as ingredients page no longer exists
  };

  return (
    <div className="min-h-screen bg-background">
      <AirbnbHeader 
        showTabs={false}
        activeTab=""
        mealPlan={[]}
        onTabChange={() => {}}
        onFilterChange={handleFilterChange}
        currentFilter="receta"
      />
      
      <div className="pt-[180px] px-4 pb-8">
        {/* Title Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-1">
            Mis Listas de Recetas
          </h1>
          <p className="text-muted-foreground text-sm">
            Elige una lista para ver tus recetas personalizadas
          </p>
        </div>

        {/* Recipe Lists Grid */}
        <div className="grid grid-cols-2 gap-4">
          {recipeLists.map((list) => (
            <div
              key={list.id}
              onClick={() => handleListClick(list.id)}
              className="relative rounded-2xl overflow-hidden cursor-pointer group 
                         transform transition-all duration-300 hover:scale-[1.02] 
                         active:scale-[0.98] shadow-lg hover:shadow-xl"
              style={{ aspectRatio: '1/1.2' }}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${list.image})` }}
              />
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${list.gradient} opacity-70`} />
              
              {/* Dark Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 p-4 flex flex-col justify-between">
                {/* Icon Badge */}
                <div className="self-start bg-white/20 backdrop-blur-sm rounded-full p-2">
                  <div className="text-white">
                    {list.icon}
                  </div>
                </div>
                
                {/* Bottom Info */}
                <div>
                  <h3 className="text-white font-semibold text-lg leading-tight mb-1">
                    {list.title}
                  </h3>
                  <p className="text-white/80 text-xs mb-2">
                    {list.description}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <ChefHat className="w-3.5 h-3.5 text-white/70" />
                    <span className="text-white/70 text-xs font-medium">
                      {list.recipeCount} recetas
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 bg-muted/50 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 rounded-full p-2">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {config.selectedDates?.length || 0} días planificados
                </p>
                <p className="text-xs text-muted-foreground">
                  {config.servingsPerRecipe || 2} raciones por comida
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-secondary/10 rounded-full p-2">
                <Users className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {config.servingsPerRecipe || 2} raciones
                </p>
                <p className="text-xs text-muted-foreground">
                  por comida
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
