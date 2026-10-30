import type { Recipe } from '../types';
import { X, Clock, ChefHat, Flame } from 'lucide-react';

interface Props {
  recipe: Recipe | null;
  onClose: () => void;
}

export function RecipeModal({ recipe, onClose }: Props) {
  if (!recipe) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-lg max-h-[90vh] rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col shadow-2xl animate-in fade-in duration-150">
        
        {/* Photo d'en-tête */}
        <div className="relative h-48 sm:h-52 w-full flex-shrink-0">
          <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur p-2 rounded-full text-slate-700 shadow hover:bg-white active:scale-90 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Détails */}
        <div className="p-6 overflow-y-auto space-y-5">
          <div>
            <h2 className="text-xl font-black text-slate-800 leading-tight">{recipe.title}</h2>
            <div className="flex gap-2 mt-2 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-full">
                <Clock size={13} /> {recipe.prepTime} min
              </span>
              <span className="capitalize bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">
                {recipe.difficulty}
              </span>
              <span className="capitalize bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full">
                {recipe.category}
              </span>
            </div>
          </div>

          {/* Ingrédients */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
              <ChefHat size={14} /> Ingrédients
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {recipe.ingredients.map((ing, idx) => (
                <div key={idx} className="bg-slate-50 p-2 rounded-xl text-xs flex justify-between">
                  <span className="text-slate-700 font-medium">{ing.name}</span>
                  <span className="text-slate-900 font-bold">{ing.amount} {ing.unit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Étapes */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
              <Flame size={14} /> Préparation
            </h3>
            <ol className="space-y-2.5">
              {recipe.steps.map((step, idx) => (
                <li key={idx} className="flex gap-3 text-xs leading-relaxed text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {recipe.tip && (
            <div className="bg-amber-50 border border-amber-200/60 p-3 rounded-2xl text-xs text-amber-900">
              <span className="font-bold">Astuce : </span>{recipe.tip}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
