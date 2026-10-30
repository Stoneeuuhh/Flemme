import { ArrowDown, ArrowUp, Clock, Plus, RefreshCw, RotateCcw, Trash2 } from 'lucide-react';
import type { Recipe } from '../types';
import { DAYS, DIFFICULTY_LABEL, DIFFICULTY_STYLE } from '../lib/constants';

interface Props {
  plan: (Recipe | null)[];
  onSwap: (a: number, b: number) => void;
  onReplace: (day: number) => void;
  onRemove: (day: number) => void;
  onReset: () => void;
}

export default function Planning({ plan, onSwap, onReplace, onRemove, onReset }: Props) {
  return (
    <div className="px-4 pb-6 pt-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Ma semaine</h1>
        <button
          onClick={() => confirm('Recommencer une nouvelle semaine ?') && onReset()}
          className="flex items-center gap-1 text-sm text-stone-500"
        >
          <RotateCcw size={14} /> Nouvelle semaine
        </button>
      </div>

      <ol className="space-y-3">
        {plan.map((recipe, day) => (
          <li key={day} className="rounded-2xl bg-white p-3 shadow-sm">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-amber-700">{DAYS[day]}</p>

            {recipe ? (
              <div className="flex items-center gap-3">
                <img
                  src={recipe.image} alt="" draggable={false}
                  onError={(e) => ((e.currentTarget.style.visibility = 'hidden'))}
                  className="h-14 w-14 shrink-0 rounded-xl bg-amber-100 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{recipe.title}</p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-stone-500">
                    <span className="flex items-center gap-1"><Clock size={12} />{recipe.prepTime} min</span>
                    <span className={`rounded-full px-2 py-0.5 font-medium ${DIFFICULTY_STYLE[recipe.difficulty]}`}>
                      {DIFFICULTY_LABEL[recipe.difficulty]}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1 text-stone-500">
                  <button disabled={day === 0} onClick={() => onSwap(day, day - 1)} aria-label="Monter" className="disabled:opacity-25">
                    <ArrowUp size={18} />
                  </button>
                  <button disabled={day === plan.length - 1} onClick={() => onSwap(day, day + 1)} aria-label="Descendre" className="disabled:opacity-25">
                    <ArrowDown size={18} />
                  </button>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <button onClick={() => onReplace(day)} aria-label="Remplacer" className="text-amber-700">
                    <RefreshCw size={18} />
                  </button>
                  <button onClick={() => onRemove(day)} aria-label="Retirer" className="text-rose-500">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => onReplace(day)}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-stone-300 py-4 text-sm text-stone-500"
              >
                <Plus size={16} /> Choisir un plat
              </button>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
