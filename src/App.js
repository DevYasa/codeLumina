import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCode, setLanguage, explainCode } from './redux/codeSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaArrowLeft } from 'react-icons/fa';
import Logo from './Logo';

function App() {
  const dispatch = useDispatch();
  const { code, language, explanation, isLoading, error } = useSelector((state) => state.code);
  const [showExplanation, setShowExplanation] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientY / innerHeight - 0.5) * 5;
      const y = -(clientX / innerWidth - 0.5) * 5;
      setRotation({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleExplain = () => {
    dispatch(explainCode({ code, language }));
    setShowExplanation(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-6 flex flex-col justify-center items-center perspective-1000">
      <motion.div
        className="w-full max-w-4xl bg-black bg-opacity-50 rounded-3xl shadow-2xl overflow-hidden relative"
        style={{
          transformStyle: 'preserve-3d',
          rotateX: rotation.x,
          rotateY: rotation.y,
        }}
      >
        <div className="p-8 space-y-6">
          <div className="text-center">
            <Logo />
            <p className="text-gray-300 mt-2">AI-Powered Code Explainer</p>
            <p className="text-sm text-gray-400 mt-1">Created by Mohamed Yasir</p>
          </div>

          <div className="flex space-x-4">
            <select
              value={language}
              onChange={(e) => dispatch(setLanguage(e.target.value))}
              className="flex-1 bg-gray-800 text-white rounded-md p-2 focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
            </select>
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              {showExplanation ? 'Edit Code' : 'View Explanation'}
            </button>
          </div>

          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            className="rounded-lg text-sm"
            customStyle={{ padding: '20px', backgroundColor: '#1E1E1E' }}
          >
            {code}
          </SyntaxHighlighter>
          <textarea
            value={code}
            onChange={(e) => dispatch(setCode(e.target.value))}
            className="mt-4 w-full h-40 bg-gray-800 text-white rounded-md p-4 focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="Enter your code here..."
          />
          <button
            onClick={handleExplain}
            disabled={isLoading}
            className="mt-4 w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
          >
            {isLoading ? 'Analyzing...' : 'Explain Code'}
          </button>
        </div>

        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute inset-0 bg-gray-900 bg-opacity-95 p-8 overflow-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">Explanation:</h2>
                <button
                  onClick={() => setShowExplanation(false)}
                  className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                >
                  <FaArrowLeft size={20} />
                </button>
              </div>
              {error ? (
                <p className="text-red-400">{error}</p>
              ) : (
                <p className="text-gray-300">{explanation}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;