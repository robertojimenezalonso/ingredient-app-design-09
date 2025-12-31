import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  ShoppingCart,
  ExternalLink,
  Check
} from "lucide-react";
import { useState } from "react";

// Example ingredients with Mercadona product IDs
const ingredients = [
  {
    id: 1,
    name: "Patatas",
    quantity: "1 kg",
    price: 1.50,
    image: "https://images.unsplash.com/photo-1518977676601-b53f82ber4f8?w=100&h=100&fit=crop",
    mercadonaId: "69099",
    mercadonaUrl: "https://tienda.mercadona.es/product/69099/patatas-malla"
  },
  {
    id: 2,
    name: "Salmón ahumado",
    quantity: "200 g",
    price: 4.20,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=100&h=100&fit=crop",
    mercadonaId: "53446",
    mercadonaUrl: "https://tienda.mercadona.es/product/53446/salmon-marinado-hacendado-paquete"
  }
];

const ShoppingListDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>(
    ingredients.map(i => i.id)
  );

  const toggleIngredient = (ingredientId: number) => {
    setSelectedIngredients(prev => 
      prev.includes(ingredientId)
        ? prev.filter(id => id !== ingredientId)
        : [...prev, ingredientId]
    );
  };

  const selectedItems = ingredients.filter(i => selectedIngredients.includes(i.id));
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0);

  const handleAddToMercadona = () => {
    // Build Mercadona cart URL with selected products
    // Mercadona uses a specific format for adding items to cart
    const productIds = selectedItems.map(item => item.mercadonaId);
    
    // Open Mercadona with the products
    // Note: This is a simplified example - actual integration may require API
    const mercadonaBaseUrl = "https://tienda.mercadona.es";
    
    // For now, we'll open the cart page
    // In a real implementation, you'd use Mercadona's cart API
    window.open(`${mercadonaBaseUrl}/categories`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="px-4 py-4 flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold text-foreground">Lista de la compra</h1>
            <p className="text-sm text-muted-foreground">{ingredients.length} ingredientes</p>
          </div>
        </div>
      </div>

      {/* Ingredients List */}
      <div className="px-4 py-4 space-y-3">
        <h2 className="text-md font-semibold text-foreground">Ingredientes</h2>
        
        {ingredients.map((ingredient) => (
          <Card 
            key={ingredient.id}
            className={`overflow-hidden cursor-pointer transition-all ${
              selectedIngredients.includes(ingredient.id) 
                ? "border-primary bg-primary/5" 
                : "border-border opacity-60"
            }`}
            onClick={() => toggleIngredient(ingredient.id)}
          >
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                {/* Checkbox */}
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  selectedIngredients.includes(ingredient.id)
                    ? "bg-primary border-primary"
                    : "border-muted-foreground"
                }`}>
                  {selectedIngredients.includes(ingredient.id) && (
                    <Check className="w-4 h-4 text-primary-foreground" />
                  )}
                </div>
                
                {/* Image */}
                <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={ingredient.image} 
                    alt={ingredient.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground text-sm">
                    {ingredient.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {ingredient.quantity}
                  </p>
                </div>
                
                {/* Price */}
                <div className="text-right">
                  <span className="font-bold text-foreground">
                    {ingredient.price.toFixed(2)}€
                  </span>
                </div>
              </div>
              
              {/* Mercadona link */}
              <div className="mt-2 ml-9">
                <a 
                  href={ingredient.mercadonaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary flex items-center gap-1 hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-3 h-3" />
                  Ver en Mercadona
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary */}
      <div className="px-4 py-4">
        <Card className="bg-secondary/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Productos seleccionados</span>
              <span className="font-medium">{selectedItems.length} de {ingredients.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total estimado</span>
              <span className="font-bold text-lg">{totalPrice.toFixed(2)}€</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Floating Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <Button 
          className="w-full gap-2" 
          size="lg"
          onClick={handleAddToMercadona}
          disabled={selectedItems.length === 0}
        >
          <ShoppingCart className="w-5 h-5" />
          Añadir al carrito de Mercadona
          <Badge variant="secondary" className="ml-2 bg-primary-foreground/20 text-primary-foreground">
            {selectedItems.length}
          </Badge>
        </Button>
      </div>
    </div>
  );
};

export default ShoppingListDetailPage;
