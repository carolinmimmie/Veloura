import { create } from "zustand"; // Importerar funktionen för att skapa store
import { persist } from "zustand/middleware"; // Middleware för att spara state i localStorage

// Typ för varje produkt i kundvagnen
export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  quantity: number; // Hur många av produkten som finns i kundvagnen
}

// Typ för store: innehåller listan items och funktioner för att manipulera kundvagnen
interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

// Skapar Zustand-store med persist middleware för att spara state i localStorage
export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      // Startvärde: tom lista med produkter i kundvagnen
      items: [],

      // Funktion för att lägga till en produkt i kundvagnen
      addItem: (item) =>
        set((state) => {
          // Kolla om produkten redan finns i kundvagnen
          const existing = state.items.find((i) => i.id === item.id);

          if (existing) {
            // Om produkten redan finns: öka quantity med 1 för den produkten
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }

          // Om produkten inte finns i kundvagnen: lägg till den nya produkten
          return { items: [...state.items, item] };
        }),

      // Funktion för att minska quantity på en produkt eller ta bort den helt om quantity blir 0
      removeItem: (id) =>
        set((state) => {
          return {
            items: state.items
              .map((item) =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
              )
              .filter((item) => item.quantity > 0), // Ta bort produkter med quantity 0
          };
        }),

      // Funktion för att tömma hela kundvagnen
      clearCart: () =>
        set(() => ({
          items: [],
        })),
    }),
    {
      name: "cart", // Namnet som används i localStorage för att spara kundvagnen
    }
  )
);
