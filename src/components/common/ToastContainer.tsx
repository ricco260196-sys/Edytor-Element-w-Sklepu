import React from 'react';
import { useStoreAppearance } from '../../context/StoreAppearanceContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useStoreAppearance();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl border shadow-xl flex items-start justify-between gap-3 text-xs animate-in slide-in-from-right-4 duration-200 backdrop-blur-md ${
              isSuccess
                ? 'bg-slate-900/95 border-emerald-500/50 text-emerald-300'
                : isError
                ? 'bg-slate-900/95 border-rose-500/50 text-rose-300'
                : isWarning
                ? 'bg-slate-900/95 border-amber-500/50 text-amber-300'
                : 'bg-slate-900/95 border-blue-500/50 text-blue-300'
            }`}
          >
            <div className="flex items-start gap-2.5 min-w-0">
              {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
              {isError && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
              {isWarning && <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />}
              {!isSuccess && !isError && !isWarning && <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />}
              <div className="min-w-0">
                <div className="font-bold text-white tracking-tight">{toast.title}</div>
                <div className="text-slate-300 text-[11px] mt-0.5 leading-relaxed">{toast.message}</div>
              </div>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 shrink-0 rounded transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
