import { FlaskConical, Minus, X } from 'lucide-react';
import { useState } from 'react';

const FloatingWidget = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  const [select1, setSelect1] = useState('');
  const [select2, setSelect2] = useState('');
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);

  if (!isVisible) return null;

  if (isMinimized) {
    return (
      <button
        type="button"
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full shadow-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center justify-center cursor-pointer"
        aria-label="Expandir widget"
      >
        <FlaskConical className="h-5 w-5" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 rounded-xl border border-blue-200 bg-white shadow-2xl transition-all duration-300 ease-in-out">
      <div className="flex items-center justify-between bg-blue-600 rounded-t-xl px-4 py-3">
        <span className="text-sm font-semibold text-white">Configuración BA Tester</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="h-7 w-7 rounded-md text-blue-200 hover:text-white hover:bg-blue-700 flex items-center justify-center transition-colors cursor-pointer"
            onClick={() => setIsMinimized(true)}
            aria-label="Minimizar"
          >
            <Minus className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="h-7 w-7 rounded-md text-blue-200 hover:text-white hover:bg-red-500 flex items-center justify-center transition-colors cursor-pointer"
            onClick={() => setIsVisible(false)}
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="select1" className="text-xs font-medium text-blue-500">
            Opción 1
          </label>
          <select
            id="select1"
            value={select1}
            onChange={(e) => setSelect1(e.target.value)}
            className="w-full rounded-lg border border-blue-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          >
            <option value="" disabled>
              Seleccionar...
            </option>
            <option value="opt1a">Opción A</option>
            <option value="opt1b">Opción B</option>
            <option value="opt1c">Opción C</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="select2" className="text-xs font-medium text-blue-500">
            Opción 2
          </label>
          <select
            id="select2"
            value={select2}
            onChange={(e) => setSelect2(e.target.value)}
            className="w-full rounded-lg border border-blue-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          >
            <option value="" disabled>
              Seleccionar...
            </option>
            <option value="opt2a">Opción X</option>
            <option value="opt2b">Opción Y</option>
            <option value="opt2c">Opción Z</option>
          </select>
        </div>

        <label htmlFor="check1" className="flex items-center gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            id="check1"
            checked={check1}
            onChange={(e) => setCheck1(e.target.checked)}
            className="h-4 w-4 rounded border-blue-300 text-blue-600 focus:ring-blue-500 accent-blue-600"
          />
          <span className="text-sm font-medium text-gray-800">Activar notificaciones</span>
        </label>

        <label htmlFor="check2" className="flex items-center gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            id="check2"
            checked={check2}
            onChange={(e) => setCheck2(e.target.checked)}
            className="h-4 w-4 rounded border-blue-300 text-blue-600 focus:ring-blue-500 accent-blue-600"
          />
          <span className="text-sm font-medium text-gray-800">Modo oscuro</span>
        </label>

        <button
          type="button"
          className="w-full mt-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 active:bg-blue-800 transition-colors cursor-pointer"
          onClick={() => {
            // Action placeholder
          }}
        >
          Aplicar
        </button>
      </div>
    </div>
  );
};

export default FloatingWidget;
