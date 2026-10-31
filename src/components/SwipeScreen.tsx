import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Heart, PartyPopper, RotateCcw, SlidersHorizontal, Undo2, X } from 'lucide-react';
import type { Recipe } from '../types';
import { DAYS, QUOTA } from '../lib/constants';
import SwipeCard, { CardBody } from './SwipeCard';

interface Props {
  deck: Recipe[];
  filled: number;
  targetDay: number | null;
  onLike: (r: Recipe) => void;
  onPass: (r: Recipe) => void;
  onOpenFilters: () => void;
  onCancelTarget: () => void;
  onResetRejected: () => void;
  onGoPlan: () => void;
  onRestart: () => void;
  canUndo: boolean;
  onUndo: () => void;
}
export default function SwipeScreen({
  deck, filled, targetDay, onLike, onPass,
  onOpenFilters, onCancelTarget, onResetRejected, onGoPlan, onRestart,
  canUndo, onUndo,
}: Props) {
  const [exitDir, setExitDir] = useState<1 | -1>(1);
  const top = deck[0];
  const next = deck[1];
  const weekFull = filled >= QUOTA && targetDay === null;

  const swipe = (dir: 1 | -1) => {
    if (!top) return;
    setExitDir(dir);
    if (dir === 1) onLike(top);
    else onPass(top);
  };

  return (
    <div className="flex h-full flex-col px-4 pt-3">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-semibold">
            {filled} / {QUOTA} repas choisis
          </p>
          <div className="mt-1 h-2 w-full max-w-[180px] overflow-hidden rounded-full bg-stone-200">
            <div
              className="h-full rounded-full bg-amber-600 transition-all"
              style={{ width: `${(filled / QUOTA) * 100}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          {canUndo && (
            <button
              onClick={onUndo}
              aria-label="Annuler le dernier choix"
              className="rounded-full bg-white p-2.5 shadow"
            >
              <Undo2 size={16} />
            </button>
          )}
          {filled > 0 && (
            <button
              onClick={onRestart}
              aria-label="Tout recommencer"
              className="rounded-full bg-white p-2.5 shadow"
            >
              <RotateCcw size={16} />
            </button>
          )}
          <button
            onClick={onOpenFilters}
            className="flex items-center gap-1 rounded-full bg-white px-3 py-2 text-sm shadow"
          >
            <SlidersHorizontal size={16} /> Filtres
          </button>
        </div>
      </div>

      {targetDay !== null && (
        <div className="mb-3 flex items-center justify-between rounded-xl bg-amber-100 px-3 py-2 text-sm text-amber-900">
          <span>Remplacement du <b>{DAYS[targetDay]}</b></span>
          <button onClick={onCancelTarget} className="font-semibold underline">Annuler</button>
        </div>
      )}

      {weekFull ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
          <PartyPopper size={48} className="text-amber-600" />
          <p className="text-lg font-bold">Ta semaine est complète !</p>
          <div className="flex flex-col gap-2">
            <button onClick={onGoPlan} className="rounded-2xl bg-amber-600 px-6 py-3 font-semibold text-white">
              Voir le planning
            </button>
            <button onClick={onRestart} className="flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 font-semibold shadow">
              <RotateCcw size={16} /> Tout recommencer
            </button>
          </div>
        </div>
      ) : !top ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="text-lg font-bold">Plus de recettes à proposer</p>
          <p className="text-sm text-stone-500">
            Assouplis tes filtres ou remets en jeu les recettes écartées.
          </p>
          <div className="flex gap-2">
            <button onClick={onOpenFilters} className="rounded-xl bg-white px-4 py-2 text-sm shadow">
              Modifier les filtres
            </button>
            <button onClick={onResetRejected} className="rounded-xl bg-stone-800 px-4 py-2 text-sm text-white">
              Remettre les écartées
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="relative mx-auto my-2 w-full max-w-sm flex-1">
            {next && (
              <div key={`bg-${next.id}`} className="absolute inset-0 translate-y-3 scale-95 opacity-80">
                <CardBody recipe={next} />
              </div>
            )}
            <AnimatePresence custom={exitDir}>
              <SwipeCard key={top.id} recipe={top} exitDir={exitDir} onSwipe={swipe} />
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-8 py-4">
            <button
              onClick={() => swipe(-1)} aria-label="Écarter"
              className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-rose-500 shadow-lg active:scale-90"
            >
              <X size={32} />
            </button>
            <button
              onClick={() => swipe(1)} aria-label="Retenir"
              className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-emerald-500 shadow-lg active:scale-90"
            >
              <Heart size={30} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
