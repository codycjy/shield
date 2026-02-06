/**
 * Demo Controls Component
 *
 * Uncomment this in App.tsx during development to test different states:
 *
 * import { DemoControls } from './demo-controls';
 *
 * Then add in App component:
 * <DemoControls state={state} setState={setState} />
 *
 * This allows you to toggle between daily/alert/crisis modes for testing
 */

interface DemoControlsProps {
  state: any;
  setState: (state: any) => void;
}

export function DemoControls({ state, setState }: DemoControlsProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-yellow-100 border-t-2 border-yellow-400 p-2 text-xs">
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => setState({ ...state, mode: 'daily', anomalyDetected: false, threatLevel: 'normal' })}
          className="px-2 py-1 bg-green-500 text-white rounded"
        >
          Daily
        </button>
        <button
          onClick={() => setState({ ...state, anomalyDetected: true, threatLevel: 'high' })}
          className="px-2 py-1 bg-orange-500 text-white rounded"
        >
          Alert
        </button>
        <button
          onClick={() => setState({ ...state, mode: 'crisis', activatedAt: new Date().toISOString() })}
          className="px-2 py-1 bg-red-500 text-white rounded"
        >
          Crisis
        </button>
      </div>
    </div>
  );
}
