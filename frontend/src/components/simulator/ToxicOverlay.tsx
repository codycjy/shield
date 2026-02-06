interface ToxicOverlayProps {
  category: string;
  reason?: string;
}

export default function ToxicOverlay({ category, reason }: ToxicOverlayProps) {
  return (
    <div className="absolute inset-0 backdrop-blur-md bg-red-500/20 border-2 border-red-300 rounded-xl flex items-center justify-center transition-all duration-500 group">
      <div className="text-center p-4">
        <div className="text-2xl mb-2">🛡</div>
        <div className="font-bold text-red-900 mb-1">Hidden by ZenShield</div>
        <div className="text-sm text-red-700">Category: {category}</div>

        {reason && (
          <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-red-800 bg-white/80 rounded px-3 py-2">
            {reason}
          </div>
        )}
      </div>
    </div>
  );
}
