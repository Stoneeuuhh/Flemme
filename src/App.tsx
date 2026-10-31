import { useMemo, useState } from 'react';
import { CalendarDays, Layers, ShoppingBasket } from 'lucide-react';
import { RECIPES } from './data/recipes';
import type { Recipe, Settings } from './types';
import { DEFAULT_SETTINGS, QUOTA } from './lib/constants';
import { matchesSettings } from './lib/filters';
import { useLocalStorage } from './lib/useLocalStorage';
import { shuffle } from './lib/shuffle';
import FilterPanel from './components/FilterPanel';
import SwipeScreen from './components/SwipeScreen';
import Planning from './components/Planning';
import Shopping from './components/Shopping';

type Tab = 'swipe' | 'plan' | 'shop';
type HistoryEntry =
  | { kind: 'like'; recipeId: string; day: number; previousId: string | null; wasTarget: boolean }
  | { kind: 'pass'; recipeId: string };
const BY_ID = new Map(RECIPES.map((r) => [r.id, r]));
const EMPTY_PLAN: (string | null)[] = Array(QUOTA).fill(null);

export default function App() {
  const [settings, setSettings] = useLocalStorage<Settings>('settings', DEFAULT_SETTINGS);
  const [planIds, setPlanIds] = useLocalStorage<(string | null)[]>('plan', EMPTY_PLAN);
  const [rejected, setRejected] = useLocalStorage<string[]>('rejected', []);
  const [checked, setChecked] = useLocalStorage<string[]>('checked', []);
  const [tab, setTab] = useState<Tab>('swipe');
  const [targetDay, setTargetDay] = useState<number | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [order, setOrder] = useState<string[]>(() => shuffle(RECIPES.map((r) => r.id)));

  // Plan assaini (recette supprimée du catalogue, longueur incorrecte…)
  const plan: (Recipe | null)[] = useMemo(
    () => Array.from({ length: QUOTA }, (_, d) => (planIds[d] ? BY_ID.get(planIds[d]!) ?? null : null)),
    [planIds],
  );
  const filled = plan.filter(Boolean).length;
  const planned = useMemo(() => plan.filter((r): r is Recipe => r !== null), [plan]);

  const rank = useMemo(
    () => new Map<string, number>(order.map((id, index) => [id, index])),
    [order],
  );

  const deck = useMemo(
    () =>
      RECIPES.filter(
        (r) =>
          matchesSettings(r, settings) &&
          !rejected.includes(r.id) &&
          !plan.some((p) => p?.id === r.id),
      ).sort((a, b) => (rank.get(a.id) ?? 0) - (rank.get(b.id) ?? 0)),
    [settings, rejected, plan, rank],
  );

  const writePlan = (next: (Recipe | null)[]) => setPlanIds(next.map((r) => r?.id ?? null));

  const pushHistory = (entry: HistoryEntry) => setHistory((h) => [...h.slice(-19), entry]);

  const handleLike = (recipe: Recipe) => {
    const day = targetDay ?? plan.indexOf(null);
    if (day < 0) return;
    pushHistory({
      kind: 'like',
      recipeId: recipe.id,
      day,
      previousId: plan[day]?.id ?? null,
      wasTarget: targetDay !== null,
    });
    const next = [...plan];
    next[day] = recipe;
    writePlan(next);
    const full = next.every(Boolean);
    if (targetDay !== null) {
      setTargetDay(null);
      setTab('plan');
    } else if (full) {
      setTab('plan'); // quota atteint : fin de session
    }
  };

  const handlePass = (recipe: Recipe) => {
    pushHistory({ kind: 'pass', recipeId: recipe.id });
    setRejected((prev) => [...prev, recipe.id]);
  };

  const handleUndo = () => {
    const last = history[history.length - 1];
    if (!last) return;
    setHistory((h) => h.slice(0, -1));

    if (last.kind === 'pass') {
      setRejected((prev) => prev.filter((id) => id !== last.recipeId));
      return;
    }
    const next = [...plan];
    next[last.day] = last.previousId ? BY_ID.get(last.previousId) ?? null : null;
    writePlan(next);
    setTargetDay(last.wasTarget ? last.day : null);
    setTab('swipe');
  };

  const handleSwap = (a: number, b: number) => {
    setHistory([]);
    const next = [...plan];
    [next[a], next[b]] = [next[b], next[a]];
    writePlan(next);
  };

  const handleRemove = (day: number) => {
    setHistory([]);
    const next = [...plan];
    next[day] = null;
    writePlan(next);
  };

  const startReplace = (day: number) => {
    setTargetDay(day);
    setTab('swipe');
  };

  const resetWeek = () => {
    setHistory([]);
    setOrder(shuffle(RECIPES.map((r) => r.id)));
    setPlanIds(EMPTY_PLAN);
    setRejected([]);
    setChecked([]);
    setTargetDay(null);
    setTab('swipe');
  };

   const restartWeek = () => {
    if (confirm('Tout recommencer ? Le planning actuel sera effacé.')) resetWeek();
  };

  const toggleChecked = (key: string) =>
    setChecked((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));

  const tabs: { id: Tab; label: string; icon: typeof Layers }[] = [
    { id: 'swipe', label: 'Choisir', icon: Layers },
    { id: 'plan', label: 'Planning', icon: CalendarDays },
    { id: 'shop', label: 'Courses', icon: ShoppingBasket },
  ];

  return (
    <div className="mx-auto flex h-dvh max-w-md flex-col">
      <main className="flex-1 overflow-y-auto">
        {tab === 'swipe' && (
          <SwipeScreen
            deck={deck}
            filled={filled}
            targetDay={targetDay}
            onLike={handleLike}
            onPass={handlePass}
            onOpenFilters={() => setFiltersOpen(true)}
            onCancelTarget={() => setTargetDay(null)}
            onResetRejected={() => setRejected([])}
            onGoPlan={() => setTab('plan')}
            onRestart={restartWeek}
            canUndo={history.length > 0}
            onUndo={handleUndo}
          />
        )}
        {tab === 'plan' && (
          <Planning
            plan={plan}
            onSwap={handleSwap}
            onReplace={startReplace}
            onRemove={handleRemove}
            onReset={resetWeek}
          />
        )}
        {tab === 'shop' && (
          <Shopping
            recipes={planned}
            checked={checked}
            onToggle={toggleChecked}
            onClearChecked={() => setChecked([])}
          />
        )}
      </main>

      <nav className="grid grid-cols-3 border-t border-stone-200 bg-white pb-[env(safe-area-inset-bottom)]">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex flex-col items-center gap-0.5 py-2.5 text-xs ${
              tab === id ? 'font-semibold text-amber-700' : 'text-stone-400'
            }`}
          >
            <Icon size={22} />
            {label}
          </button>
        ))}
      </nav>

      <FilterPanel
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        settings={settings}
        onChange={setSettings}
      />
    </div>
  );
}
