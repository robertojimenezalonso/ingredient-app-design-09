import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Users, 
  Utensils, 
  Target, 
  AlertTriangle,
  ShoppingCart,
  ChevronRight
} from "lucide-react";

// Filter options
const filterOptions = {
  days: ["3 días", "5 días", "7 días"],
  portions: ["1 persona", "2 personas", "4 personas", "6 personas"],
  mealTypes: ["Desayuno", "Comida", "Cena", "Snacks"],
  dietTypes: ["Mediterránea", "Vegetariana", "Vegana", "Keto", "Sin gluten"],
  goals: ["Perder peso", "Ganar músculo", "Mantener peso", "Energía"],
  allergies: ["Gluten", "Lactosa", "Frutos secos", "Mariscos", "Huevo"]
};

// Example shopping lists with recipe images
const shoppingLists = [
  {
    id: 1,
    title: "Menú Mediterráneo Semanal",
    price: 45.90,
    ingredients: 32,
    goal: "Mantener peso",
    goalColor: "bg-emerald-100 text-emerald-700",
    images: [
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop"
    ]
  },
  {
    id: 2,
    title: "Plan Proteico Fitness",
    price: 62.50,
    ingredients: 28,
    goal: "Ganar músculo",
    goalColor: "bg-blue-100 text-blue-700",
    images: [
      "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=200&h=200&fit=crop"
    ]
  },
  {
    id: 3,
    title: "Dieta Keto Express",
    price: 55.20,
    ingredients: 24,
    goal: "Perder peso",
    goalColor: "bg-rose-100 text-rose-700",
    images: [
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=200&h=200&fit=crop"
    ]
  },
  {
    id: 4,
    title: "Menú Vegano Equilibrado",
    price: 38.75,
    ingredients: 35,
    goal: "Energía",
    goalColor: "bg-amber-100 text-amber-700",
    images: [
      "https://images.unsplash.com/photo-1540914124281-342587941389?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1514995669114-6081e934b693?w=200&h=200&fit=crop"
    ]
  },
  {
    id: 5,
    title: "Plan Sin Gluten Familiar",
    price: 72.30,
    ingredients: 42,
    goal: "Mantener peso",
    goalColor: "bg-emerald-100 text-emerald-700",
    images: [
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop"
    ]
  }
];

interface FilterSectionProps {
  icon: React.ReactNode;
  title: string;
  options: string[];
  selected: string[];
  onToggle: (option: string) => void;
}

const FilterSection = ({ icon, title, options, selected, onToggle }: FilterSectionProps) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
      {icon}
      <span>{title}</span>
    </div>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Badge
          key={option}
          variant={selected.includes(option) ? "default" : "outline"}
          className={`cursor-pointer transition-all text-xs py-1 px-3 ${
            selected.includes(option) 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-secondary"
          }`}
          onClick={() => onToggle(option)}
        >
          {option}
        </Badge>
      ))}
    </div>
  </div>
);

const ShoppingListCard = ({ list }: { list: typeof shoppingLists[0] }) => {
  const navigate = useNavigate();
  
  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow border-border"
      onClick={() => navigate("/milista")}
    >
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Left: 4 recipe images in grid */}
          <div className="grid grid-cols-2 gap-1 w-24 h-24 flex-shrink-0">
            {list.images.map((img, idx) => (
              <div key={idx} className="w-11 h-11 rounded-md overflow-hidden">
                <img 
                  src={img} 
                  alt={`Receta ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          
          {/* Right: Info */}
          <div className="flex-1 flex flex-col justify-between min-w-0">
            <div>
              <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-2">
                {list.title}
              </h3>
              <Badge className={`mt-2 text-xs ${list.goalColor} border-0`}>
                {list.goal}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="font-bold text-lg text-foreground">
                  {list.price.toFixed(2)}€
                </span>
                <span className="flex items-center gap-1">
                  <ShoppingCart className="w-3 h-3" />
                  {list.ingredients}
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const HomePage = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>(["7 días"]);
  const [selectedPortions, setSelectedPortions] = useState<string[]>(["2 personas"]);
  const [selectedMealTypes, setSelectedMealTypes] = useState<string[]>(["Comida", "Cena"]);
  const [selectedDietTypes, setSelectedDietTypes] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);

  const handleToggle = (
    option: string, 
    selected: string[], 
    setSelected: React.Dispatch<React.SetStateAction<string[]>>,
    multiSelect: boolean = true
  ) => {
    if (multiSelect) {
      if (selected.includes(option)) {
        setSelected(selected.filter(s => s !== option));
      } else {
        setSelected([...selected, option]);
      }
    } else {
      setSelected([option]);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold text-foreground">Oliv.ia</h1>
          <p className="text-sm text-muted-foreground">Tu asistente de planificación de comidas</p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="px-4 py-4 space-y-4 border-b border-border bg-card">
        <h2 className="text-lg font-semibold text-foreground">Personaliza tu plan</h2>
        
        <FilterSection
          icon={<Calendar className="w-4 h-4" />}
          title="Días"
          options={filterOptions.days}
          selected={selectedDays}
          onToggle={(opt) => handleToggle(opt, selectedDays, setSelectedDays, false)}
        />

        <FilterSection
          icon={<Users className="w-4 h-4" />}
          title="Raciones"
          options={filterOptions.portions}
          selected={selectedPortions}
          onToggle={(opt) => handleToggle(opt, selectedPortions, setSelectedPortions, false)}
        />

        <FilterSection
          icon={<Utensils className="w-4 h-4" />}
          title="Tipo de comidas"
          options={filterOptions.mealTypes}
          selected={selectedMealTypes}
          onToggle={(opt) => handleToggle(opt, selectedMealTypes, setSelectedMealTypes)}
        />

        <FilterSection
          icon={<Utensils className="w-4 h-4" />}
          title="Tipo de dieta"
          options={filterOptions.dietTypes}
          selected={selectedDietTypes}
          onToggle={(opt) => handleToggle(opt, selectedDietTypes, setSelectedDietTypes)}
        />

        <FilterSection
          icon={<Target className="w-4 h-4" />}
          title="Objetivo"
          options={filterOptions.goals}
          selected={selectedGoals}
          onToggle={(opt) => handleToggle(opt, selectedGoals, setSelectedGoals, false)}
        />

        <FilterSection
          icon={<AlertTriangle className="w-4 h-4" />}
          title="Alergias e intolerancias"
          options={filterOptions.allergies}
          selected={selectedAllergies}
          onToggle={(opt) => handleToggle(opt, selectedAllergies, setSelectedAllergies)}
        />

        <Button className="w-full mt-4" size="lg">
          Generar plan personalizado
        </Button>
      </div>

      {/* Shopping Lists Section */}
      <div className="px-4 py-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Planes recomendados</h2>
          <span className="text-sm text-muted-foreground">{shoppingLists.length} planes</span>
        </div>

        <div className="space-y-3">
          {shoppingLists.map((list) => (
            <ShoppingListCard key={list.id} list={list} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;