import { useMemo } from 'react';
import { Check } from 'lucide-react';
import type { Recipe } from '../types';
import { AISLE_LABEL, AISLE_ORDER } from '../lib/constants';
import { buildShoppingList, formatQuantity } from '../lib/shopping';

interface Props {
  recipes: Recipe[];
  checked: string[];
  onToggle: (key: string) => void;
  onClearChecked: () => void;
}

export default function Shopping({ recipes, checked, onToggle, onClearChecked }: Props) {
  const items = useMemo(() => buildShoppingList(recipes), [recipes]);

  if (items.length === 0) {
    return (
      <p className="px-6 pt-20 text-center text-stone-500">
        Ta liste de courses apparaîtra dès que tu auras retenu des repas.
      </p>
    );
  }

  const done = items.filter((i) => checked.includes(i.key)).length;

  return (
    <div className="px-4 pb-6 pt-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Courses</h1>
        <button onClick={onClearChecked} className="text-sm text-stone-500 underline">
          {done}/{items.length} · décocher tout
        </button>
      </div>

      {AISLE_ORDER.map((aisle) => {
        const list = items.filter((i) => i.aisle === aisle);
        if (list.length === 0) return null;
        return (
          <section key={aisle} className="mb-5">
            <h2 className="mb-2 text-sm font-bold text-stone-600">{AISLE_LABEL[aisle]}</h2>
            <ul className="divide-y divide-stone-100 overflow-hidden rounded-2xl bg-white shadow-sm">
              {list.map((item) => {
                const isChecked = checked.includes(item.key);
                return (
                  <li key={item.key}>
                    <button onClick={() => onToggle(item.key)} className="flex w-full items-center gap-3 px-4 py-3 text-left">
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                          isChecked ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-stone-300'
                        }`}
                      >
                        {isChecked && <Check size={14} />}
                      </span>
                      <span className={`flex-1 capitalize ${isChecked ? 'text-stone-400 line-through' : ''}`}>
                        {item.name}
                      </span>
                      <span className={`text-sm ${isChecked ? 'text-stone-300 line-through' : 'text-stone-500'}`}>
                        {formatQuantity(item.amount, item.unit)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
