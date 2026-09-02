import { AnimatePresence, motion } from 'framer-motion';
import { useToast } from '../../hooks/useToast.js';

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex flex-col items-center gap-2 px-4">
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <motion.button
            key={t.id}
            type="button"
            onClick={() => dismiss(t.id)}
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="pointer-events-auto flex items-center gap-3 rounded-full border border-gold/30 bg-espresso px-5 py-3 text-sm text-ivory shadow-lg shadow-espresso/30"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            {t.message}
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}
