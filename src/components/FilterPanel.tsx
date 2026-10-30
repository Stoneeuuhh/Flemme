import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { Difficulty, Settings } from '../types';
import {
  DIFFICULTY_LABEL, PRESET_EXCLUSIONS, TIME_OPTIONS,
} from '../lib/constants';

interface Props {
  open: boolean;
  onClose: () => void;
  settings: Settings;
  onChange: (s: Settings) => void;
}

const chip = (active: boolean) =>
  `px-3 py-1.5 rounded-full text-sm border transition ${
    active
      ? 'bg-amber-600 border-amber-600 text-white'
      : 'bg-white border-stone-200 text-stone-700'
  }`;

export default function FilterPanel({ open, onClose, settings, onChange }: Props) {
  const [draft, setDraft] = useState('');

  const toggleTerm = (term: string) => {
    const has = settings.excluded.includes(term);
    onChange({
      ...settings,
      excluded: has ? settings.excluded.filter((t) => t !== term) : [...settings.excluded, term],
    });
  };

  const addDraft = () => {
    const v = draft.trim().toLowerCase();
    if (v && !settings.excluded.includes(v)) {
      onChange({ ...settings, excluded: [...settings.excluded, v] });
    }
    setDraft('');
  };

  const toggleDifficulty = (d: Difficulty) => {
    const has = settings.difficulties.includes(d);
    if (has && settings.difficulties.length === 1) return; // au moins un niveau
    onChange({
      ...settings,
      difficulties: has
        ? settings.difficulties.filter((x) => x !== d)
        : [...settings.difficulties, d],
    });
  };

  const customTerms = settings.excluded.filter((t) => !PRESET_EXCLUSIONS.includes(t));

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.section
            className="fixed bottom-0 inset-x-0 z-50 max-h-[85dvh] overflow-y-auto rounded-t-3xl bg-orange-50 p-5 pb-8 shadow-2xl mx-auto max-w-md"
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Filtres</h2>
              <button onClick={onClose} aria-label="Fermer" className="p-1"><X size={22} /></button>
            </div>

            <h3 className="text-sm font-semibold text-stone-500 mb-2">Aliments à éviter</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {PRESET_EXCLUSIONS.map((t) => (
                <button key={t} className={chip(settings.excluded.includes(t))} onClick={() => toggleTerm(t)}>
                  {t}
                </button>
              ))}
              {customTerms.map((t) => (
                <button key={t} className={chip(true)} onClick={() => toggleTerm(t)}>
                  {t} ✕
                </button>
              ))}
            </div>
            <div className="flex gap-2 mb-6">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addDraft()}
                placeholder="Ajouter un aliment…"
                className="flex-1 rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-500"
              />
              <button onClick={addDraft} className="rounded-xl bg-stone-800 px-4 text-sm text-white">
                Ajouter
              </button>
            </div>

            <h3 className="text-sm font-semibold text-stone-500 mb-2">Complexité</h3>
            <div className="flex gap-2 mb-6">
              {(Object.keys(DIFFICULTY_LABEL) as Difficulty[]).map((d) => (
                <button key={d} className={chip(settings.difficulties.includes(d))} onClick={() => toggleDifficulty(d)}>
                  {DIFFICULTY_LABEL[d]}
                </button>
              ))}
            </div>

            <h3 className="text-sm font-semibold text-stone-500 mb-2">Temps de préparation</h3>
            <div className="flex flex-wrap gap-2">
              {TIME_OPTIONS.map((o) => (
                <button
                  key={o.label}
                  className={chip(settings.maxTime === o.value)}
                  onClick={() => onChange({ ...settings, maxTime: o.value })}
                >
                  {o.label}
                </button>
              ))}
            </div>

            <button onClick={onClose} className="mt-8 w-full rounded-2xl bg-amber-600 py-3 font-semibold text-white">
              Appliquer
            </button>
          </motion.section>
        </>
      )}
    </AnimatePresence>
  );
}
