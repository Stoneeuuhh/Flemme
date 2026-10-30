import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Clock, UtensilsCrossed } from 'lucide-react';
import type { Recipe } from '../types';
import { DIFFICULTY_LABEL, DIFFICULTY_STYLE } from '../lib/constants';

const THRESHOLD = 110;

const variants = {
  exit: (dir: 1 | -1) => ({
    x: dir * 600,
    rotate: dir * 25,
    opacity: 0,
    transition: { duration: 0.25 },
  }),
};

export function CardBody({ recipe }: { recipe: Recipe }) {
  const [failed, setFailed] = useState(false);
  const preview = recipe.ingredients.slice(0, 4).map((i) => i.name);
  const rest = recipe.ingredients.length - preview.length;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-xl">
      <div className="relative h-3/5 bg-gradient-to-br from-amber-200 to-orange-300">
        {failed ? (
          <div className="flex h-full items-center justify-center text-amber-700/60">
            <UtensilsCrossed size={56} />
          </div>
        ) : (
          <img
            src={recipe.image} alt={recipe.title} draggable={false}
            onError={() => setFailed(true)}
            className="h-full w-full select-none object-cover"
          />
        )}
        <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${DIFFICULTY_STYLE[recipe.difficulty]}`}>
          {DIFFICULTY_LABEL[recipe.difficulty]}
        </span>
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold">
          <Clock size={14} /> {recipe.prepTime} min
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-1 p-4">
        <h2 className="text-xl font-bold leading-tight">{recipe.title}</h2>
        <p className="text-sm text-stone-500">
          {preview.join(' · ')}{rest > 0 && ` · +${rest}`}
        </p>
      </div>
    </div>
  );
}

interface Props {
  recipe: Recipe;
  exitDir: 1 | -1;
  onSwipe: (dir: 1 | -1) => void;
}

export default function SwipeCard({ recipe, exitDir, onSwipe }: Props) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-250, 0, 250], [-18, 0, 18]);
  const likeOpacity = useTransform(x, [20, THRESHOLD], [0, 1]);
  const passOpacity = useTransform(x, [-THRESHOLD, -20], [1, 0]);

  return (
    <motion.div
      className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={(_, info) => {
        const { offset, velocity } = info;
        if (offset.x > THRESHOLD || (offset.x > 40 && velocity.x > 600)) onSwipe(1);
        else if (offset.x < -THRESHOLD || (offset.x < -40 && velocity.x < -600)) onSwipe(-1);
      }}
      variants={variants}
      custom={exitDir}
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      exit="exit"
    >
      <CardBody recipe={recipe} />
      <motion.div
        style={{ opacity: likeOpacity }}
        className="pointer-events-none absolute left-5 top-14 -rotate-12 rounded-lg border-4 border-emerald-500 px-3 py-1 text-2xl font-extrabold text-emerald-500"
      >
        J'AIME
      </motion.div>
      <motion.div
        style={{ opacity: passOpacity }}
        className="pointer-events-none absolute right-5 top-14 rotate-12 rounded-lg border-4 border-rose-500 px-3 py-1 text-2xl font-extrabold text-rose-500"
      >
        NON
      </motion.div>
    </motion.div>
  );
}
