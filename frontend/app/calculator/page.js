'use client';
import React, { useState, useEffect, useRef } from 'react';

export default function CalculatorPage() {
  const [expr, setExpr] = useState('');
  const [result, setResult] = useState('0');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const insert = (value) => {
    setExpr((s) => s + value);
  };

  const clearAll = () => {
    setExpr('');
    setResult('0');
  };

  const backspace = () => {
    setExpr((s) => s.slice(0, -1));
  };

  // Placeholder evaluate function – will call Python backend later
  const evaluate = async () => {
    if (!expr) return;

    try {
      // 🔹 You’ll replace this with a Python API call
      // Example (for later):
      // const res = await fetch("http://localhost:5000/calc", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ expression: expr }),
      // });
      // const data = await res.json();
      // setResult(data.result);

      // For now, just show a placeholder message:
      setResult('Waiting for Python backend...');
    } catch (err) {
      setResult('Error connecting to backend');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') evaluate();
    if (e.key === 'Backspace') backspace();
  };

  const btn = (label, onClick, extra = '') => (
    <button
      onClick={onClick}
      className={`rounded-lg p-3 text-lg shadow-sm hover:scale-[1.02] transition-transform ${extra} ease-in`}
    >
      {label}
    </button>
  );

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b">
            <h1 className="text-2xl font-semibold text-center">Scientific Calculator</h1>
          </div>

          {/* Display */}
          <div className="p-6">
            <div className="bg-black/90 text-white rounded-lg p-4 flex flex-col gap-2">
              <input
                ref={inputRef}
                value={expr}
                onChange={(e) => setExpr(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type expression or use buttons"
                className="bg-transparent outline-none text-right text-xl md:text-2xl w-full"
                aria-label="calculator input"
              />
              <div className="text-right text-sm text-gray-200">
                Result: <span className="font-medium">{result}</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-3">
                {btn('C', clearAll, 'bg-red-500 text-white')}
                {btn('Del', backspace, 'bg-yellow-500 text-white')}
                {btn('(', () => insert('('), 'bg-gray-100')}
                {btn(')', () => insert(')'), 'bg-gray-100')}

                {btn('7', () => insert('7'))}
                {btn('8', () => insert('8'))}
                {btn('9', () => insert('9'))}
                {btn('/', () => insert('/'), 'bg-gray-100')}

                {btn('4', () => insert('4'))}
                {btn('5', () => insert('5'))}
                {btn('6', () => insert('6'))}
                {btn('*', () => insert('*'), 'bg-gray-100')}

                {btn('1', () => insert('1'))}
                {btn('2', () => insert('2'))}
                {btn('3', () => insert('3'))}
                {btn('-', () => insert('-'), 'bg-gray-100')}

                {btn('0', () => insert('0'))}
                {btn('.', () => insert('.'))}
                {btn('%', () => insert('%'), 'bg-gray-100')}
                {btn('+', () => insert('+'), 'bg-gray-100')}
              </div>

              <div className="flex justify-center">
                {btn('=', evaluate, 'bg-black w-full text-white px-10 py-3 rounded-xl')}
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {btn('sin(', () => insert('sin('), 'bg-slate-100')}
                {btn('cos(', () => insert('cos('), 'bg-slate-100')}
                {btn('tan(', () => insert('tan('), 'bg-slate-100')}

                {btn('sin⁻¹(', () => insert('asin('), 'bg-slate-100')}
                {btn('cos⁻¹(', () => insert('acos('), 'bg-slate-100')}
                {btn('tan⁻¹(', () => insert('atan('), 'bg-slate-100')}

                {btn('ln(', () => insert('ln('), 'bg-slate-100')}
                {btn('log(', () => insert('log('), 'bg-slate-100')}
                {btn('√(', () => insert('√('), 'bg-slate-100')}

                {btn(<span>x<sup>y</sup></span>, () => insert('^'), 'bg-slate-100')}
                {btn('π', () => insert('π'), 'bg-slate-100')}
                {btn('e', () => insert('e'), 'bg-slate-100')}

                {btn('abs(', () => insert('abs('), 'bg-slate-100')}
                {btn('floor(', () => insert('floor('), 'bg-slate-100')}
                {btn('ceil(', () => insert('ceil('), 'bg-slate-100')}

                {btn('deg→rad', () => insert('deg→rad('), 'bg-emerald-100')}
                {btn('rad→deg', () => insert('rad→deg('), 'bg-emerald-100')}
                {btn('rand', () => insert('rand()'), 'bg-emerald-100')}
              </div>
            </div>
          </div>

          <div className="p-4 border-t text-center text-sm text-gray-500">
            Copyright &copy; All Rights Reserved by Coding-Raja
          </div>
        </div>
      </div>
    </main>
  );
}
