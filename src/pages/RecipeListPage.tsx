import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, ArrowLeft, Calendar, Users } from 'lucide-react';
import { useRecipes } from '@/hooks/useRecipes';
import { useGlobalIngredients } from '@/hooks/useGlobalIngredients';
import { useCart } from '@/hooks/useCart';
import { useUserConfig } from '@/contexts/UserConfigContext';
import { AirbnbHeader } from '@/components/AirbnbHeader';
import { CategoryCarousel } from '@/components/CategoryCarousel';
import { FloatingButton } from '@/components/FloatingButton';
import { useDateTabs } from '@/hooks/useDateTabs';
import { Recipe, CategoryType } from '@/types/recipe';
import { useToast } from '@/hooks/use-toast';

const RecipeListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { getRecipesByCategory } = useRecipes();
  const { addToCart } = useCart();
  const { config } = useUserConfig();
  const { showTabs, activeTab: activeTabDate, mealPlan, sectionRefs, scrollToDate } = useDateTabs();
  const [aiRecipes, setAiRecipes] = useState<Recipe[]>([]);

  // Example recipes for display
  const exampleRecipes: Recipe[] = [
    {
      id: 'example-1',
      title: 'Tortilla Española',
      image: '/lovable-uploads/8530d68e-8316-44b0-8389-d319fd405949.png',
      calories: 250,
      time: 30,
      category: 'lunch',
      servings: 4,
      macros: { carbs: 20, protein: 12, fat: 15 },
      ingredients: [
        { id: 'ing-1', name: 'Patatas', amount: '500', unit: 'g', selected: true },
        { id: 'ing-2', name: 'Huevos', amount: '6', unit: 'unidades', selected: true },
        { id: 'ing-3', name: 'Cebolla', amount: '1', unit: 'unidad', selected: true },
        { id: 'ing-4', name: 'Aceite de oliva', amount: '100', unit: 'ml', selected: true },
        { id: 'ing-5', name: 'Sal', amount: '1', unit: 'pizca', selected: true },
      ],
      instructions: ['Pelar y cortar patatas', 'Freír a fuego lento', 'Batir huevos', 'Mezclar y cuajar'],
      nutrition: { calories: 250, protein: 12, carbs: 20, fat: 15, fiber: 2, sugar: 1 }
    },
    {
      id: 'example-2',
      title: 'Ensalada César',
      image: '/lovable-uploads/d923963b-f4fc-4381-8216-90ad753ef245.png',
      calories: 180,
      time: 15,
      category: 'lunch',
      servings: 2,
      macros: { carbs: 10, protein: 15, fat: 10 },
      ingredients: [
        { id: 'ing-6', name: 'Lechuga romana', amount: '1', unit: 'unidad', selected: true },
        { id: 'ing-7', name: 'Pollo a la plancha', amount: '200', unit: 'g', selected: true },
        { id: 'ing-8', name: 'Queso parmesano', amount: '50', unit: 'g', selected: true },
        { id: 'ing-9', name: 'Croutons', amount: '50', unit: 'g', selected: true },
        { id: 'ing-10', name: 'Salsa César', amount: '3', unit: 'cucharadas', selected: true },
      ],
      instructions: ['Lavar y cortar lechuga', 'Cortar pollo en tiras', 'Mezclar ingredientes', 'Aliñar'],
      nutrition: { calories: 180, protein: 15, carbs: 10, fat: 10, fiber: 3, sugar: 2 }
    },
    {
      id: 'example-3',
      title: 'Pasta Carbonara',
      image: '/lovable-uploads/7f516dd8-5753-49bd-9b5d-aa5c0bfeedd1.png',
      calories: 450,
      time: 25,
      category: 'dinner',
      servings: 2,
      macros: { carbs: 55, protein: 18, fat: 20 },
      ingredients: [
        { id: 'ing-11', name: 'Espaguetis', amount: '200', unit: 'g', selected: true },
        { id: 'ing-12', name: 'Panceta', amount: '100', unit: 'g', selected: true },
        { id: 'ing-13', name: 'Huevos', amount: '2', unit: 'unidades', selected: true },
        { id: 'ing-14', name: 'Queso pecorino', amount: '50', unit: 'g', selected: true },
        { id: 'ing-15', name: 'Pimienta negra', amount: '1', unit: 'pizca', selected: true },
      ],
      instructions: ['Cocer pasta', 'Dorar panceta', 'Mezclar huevos con queso', 'Unir todo fuera del fuego'],
      nutrition: { calories: 450, protein: 18, carbs: 55, fat: 20, fiber: 2, sugar: 1 }
    },
    {
      id: 'example-4',
      title: 'Tostadas con Aguacate',
      image: '/lovable-uploads/a06f3ae9-f80a-48b6-bf55-8c1b736c79f8.png',
      calories: 220,
      time: 10,
      category: 'breakfast',
      servings: 1,
      macros: { carbs: 25, protein: 8, fat: 12 },
      ingredients: [
        { id: 'ing-16', name: 'Pan integral', amount: '2', unit: 'rebanadas', selected: true },
        { id: 'ing-17', name: 'Aguacate', amount: '1', unit: 'unidad', selected: true },
        { id: 'ing-18', name: 'Huevo poché', amount: '1', unit: 'unidad', selected: true },
        { id: 'ing-19', name: 'Sal y pimienta', amount: '1', unit: 'pizca', selected: true },
        { id: 'ing-20', name: 'Semillas de sésamo', amount: '1', unit: 'cucharada', selected: true },
      ],
      instructions: ['Tostar pan', 'Machacar aguacate', 'Pochar huevo', 'Montar y servir'],
      nutrition: { calories: 220, protein: 8, carbs: 25, fat: 12, fiber: 5, sugar: 1 }
    },
    {
      id: 'example-5',
      title: 'Gazpacho Andaluz',
      image: '/lovable-uploads/967d027e-2a1d-40b3-b300-c73dbb88963a.png',
      calories: 120,
      time: 15,
      category: 'appetizer',
      servings: 4,
      macros: { carbs: 12, protein: 3, fat: 7 },
      ingredients: [
        { id: 'ing-21', name: 'Tomates maduros', amount: '1', unit: 'kg', selected: true },
        { id: 'ing-22', name: 'Pepino', amount: '1', unit: 'unidad', selected: true },
        { id: 'ing-23', name: 'Pimiento verde', amount: '1', unit: 'unidad', selected: true },
        { id: 'ing-24', name: 'Ajo', amount: '1', unit: 'diente', selected: true },
        { id: 'ing-25', name: 'Aceite de oliva', amount: '50', unit: 'ml', selected: true },
      ],
      instructions: ['Lavar verduras', 'Triturar todo', 'Añadir aceite', 'Enfriar y servir'],
      nutrition: { calories: 120, protein: 3, carbs: 12, fat: 7, fiber: 3, sugar: 6 }
    },
    {
      id: 'example-6',
      title: 'Pollo al Limón',
      image: '/lovable-uploads/71eecaf2-ff51-47ff-beef-72570cb4f960.png',
      calories: 280,
      time: 35,
      category: 'dinner',
      servings: 3,
      macros: { carbs: 8, protein: 35, fat: 12 },
      ingredients: [
        { id: 'ing-26', name: 'Pechugas de pollo', amount: '500', unit: 'g', selected: true },
        { id: 'ing-27', name: 'Limones', amount: '2', unit: 'unidades', selected: true },
        { id: 'ing-28', name: 'Ajo', amount: '3', unit: 'dientes', selected: true },
        { id: 'ing-29', name: 'Romero fresco', amount: '2', unit: 'ramitas', selected: true },
        { id: 'ing-30', name: 'Aceite de oliva', amount: '3', unit: 'cucharadas', selected: true },
      ],
      instructions: ['Marinar pollo', 'Dorar en sartén', 'Añadir limón', 'Hornear 20 min'],
      nutrition: { calories: 280, protein: 35, carbs: 8, fat: 12, fiber: 1, sugar: 2 }
    }
  ];

  // Load AI recipes from localStorage when component mounts
  useEffect(() => {
    console.log('RecipeListPage: Component mounted, checking localStorage...');
    const savedAiRecipes = localStorage.getItem('aiGeneratedRecipes');
    console.log('RecipeListPage: localStorage result:', savedAiRecipes ? 'Data found' : 'No data found');
    
    if (savedAiRecipes) {
      console.log('RecipeListPage: Raw localStorage data length:', savedAiRecipes.length);
      try {
        const parsedRecipes = JSON.parse(savedAiRecipes);
        console.log('RecipeListPage: Successfully parsed AI recipes:', parsedRecipes.length, 'recipes');
        console.log('RecipeListPage: Recipe titles:', parsedRecipes.map((r: Recipe) => r.title));
        setAiRecipes(parsedRecipes);
        console.log('RecipeListPage: AI recipes state updated');
      } catch (error) {
        console.error('RecipeListPage: Error parsing AI recipes from localStorage:', error);
      }
    } else {
      console.log('RecipeListPage: No AI recipes found in localStorage, using examples');
    }
  }, []);

  // Handle recipe replacement when coming from change mode
  useEffect(() => {
    const replaceRecipe = location.state?.replaceRecipe;
    if (replaceRecipe) {
      const { originalId, newRecipe } = replaceRecipe;
      
      // Update AI recipes in state
      setAiRecipes(prevRecipes => 
        prevRecipes.map(recipe => 
          recipe.id === originalId ? newRecipe : recipe
        )
      );
      
      // Update localStorage
      const savedAiRecipes = localStorage.getItem('aiGeneratedRecipes');
      if (savedAiRecipes) {
        try {
          const parsedRecipes = JSON.parse(savedAiRecipes);
          const updatedRecipes = parsedRecipes.map((recipe: Recipe) => 
            recipe.id === originalId ? newRecipe : recipe
          );
          localStorage.setItem('aiGeneratedRecipes', JSON.stringify(updatedRecipes));
        } catch (error) {
          console.error('Error updating recipes in localStorage:', error);
        }
      }
      
      // Clear the state to prevent repeated replacements
      navigate('/milista', { replace: true, state: {} });
    }
  }, [location.state, navigate]);
  
  
  const categories: CategoryType[] = [
    'breakfast', 'lunch', 'dinner', 
    'appetizer', 'snacks', 'desserts', 'favorites'
  ];

  // Get recipes from the meal plan - these are the recommended recipes
  const mealPlanRecipes = mealPlan.flatMap(day => 
    day.meals.map(meal => meal.recipe).filter(Boolean)
  );
  
  // Show AI recipes if available, otherwise show example recipes
  const recommendedRecipes = aiRecipes.length > 0 ? aiRecipes : exampleRecipes;

  console.log('RecipeListPage: Current recipes state:', {
    aiRecipesCount: aiRecipes.length,
    aiRecipesTitles: aiRecipes.map(r => r.title),
    recommendedRecipesCount: recommendedRecipes.length,
    showingAI: aiRecipes.length > 0
  });

  const { 
    getSelectedIngredientsCount,
    initializeIngredients,
    selectedIngredientIds
  } = useGlobalIngredients();
  
  // Initialize ingredients when recipes load
  useEffect(() => {
    if (recommendedRecipes.length > 0) {
      initializeIngredients(recommendedRecipes);
    }
  }, [recommendedRecipes.length, initializeIngredients]);
  
  // Calculate selected ingredients count - use useState for reactivity
  const [selectedIngredientsCount, setSelectedIngredientsCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(64.76); // Default price
  
  // Calculate estimated price based on ingredients and settings
  const calculateEstimatedPrice = (ingredientsCount: number) => {
    const basePrice = ingredientsCount * 1.2;
    const servingsMultiplier = config.servingsPerRecipe || 2;
    const daysMultiplier = config.selectedDates?.length || 1;
    
    return +(basePrice * servingsMultiplier * daysMultiplier).toFixed(2);
  };
  
  // Update count and price when selection changes
  useEffect(() => {
    console.log('RecipeListPage useEffect triggered - selectedIngredientIds length:', selectedIngredientIds.length);
    const count = getSelectedIngredientsCount(recommendedRecipes);
    console.log('RecipeListPage: Updated count:', count, 'from', recommendedRecipes.length, 'recipes');
    setSelectedIngredientsCount(count);
    
    // Calculate and update price
    const price = calculateEstimatedPrice(count);
    setTotalPrice(price);
    console.log('RecipeListPage: Updated price:', price);
  }, [selectedIngredientIds.join(','), recommendedRecipes, getSelectedIngredientsCount, config.servingsPerRecipe, config.selectedDates?.length]);

  const handleAddRecipe = (recipe: Recipe) => {
    const selectedIngredients = recipe.ingredients.map(ing => ing.id);
    addToCart(recipe, recipe.servings, selectedIngredients);
    toast({
      title: "Receta añadida",
      description: `${recipe.title} añadida a favoritos`
    });
  };

  const handleRecipeClick = (recipe: Recipe) => {
    navigate(`/recipe/${recipe.id}`);
  };

  const handleViewAll = (category: CategoryType) => {
    navigate(`/category/${category}`);
  };

  const handleFilterChange = (filter: 'receta' | 'ingredientes') => {
    // Navigation removed as ingredients page no longer exists
  };

  const handleSearchOffers = () => {
    navigate('/search-offers');
  };

  const daysText = config.selectedDates?.length 
    ? `${config.selectedDates.length} día${config.selectedDates.length > 1 ? 's' : ''}`
    : '0 días';
    
  const servingsText = `${config.servingsPerRecipe || 1} ración${(config.servingsPerRecipe || 1) > 1 ? 'es' : ''}`;

  return (
    <div className="min-h-screen bg-white">

      <AirbnbHeader 
        showTabs={showTabs}
        activeTab={activeTabDate}
        mealPlan={mealPlan}
        onTabChange={scrollToDate}
        onFilterChange={handleFilterChange}
        currentFilter="receta"
      />
      
      <div className="bg-white" style={{ paddingTop: '180px' }}>
        <CategoryCarousel
          category="trending"
          recipes={recommendedRecipes}
          onAddRecipe={handleAddRecipe}
          onRecipeClick={handleRecipeClick}
          onViewAll={handleViewAll}
          sectionRefs={sectionRefs}
        />
      </div>

      <FloatingButton 
        onClick={handleSearchOffers}
        selectedCount={selectedIngredientsCount}
        recipeCount={recommendedRecipes.length}
        totalPrice={totalPrice}
      >
        Buscar mejor oferta
      </FloatingButton>

    </div>
  );
};

export default RecipeListPage;
