
import React from 'react';
import { RedirectTest } from './types';

interface TestResultsProps {
  testResults: RedirectTest[];
  isRunningTests: boolean;
  diagnoseComplete: boolean;
}

const TestResults: React.FC<TestResultsProps> = ({ 
  testResults, 
  isRunningTests, 
  diagnoseComplete 
}) => {
  return (
    <div className="space-y-2">
      {testResults.map((result, index) => (
        <div key={index} className="text-xs border rounded-md p-2">
          <div className="flex justify-between mb-1">
            <span className="font-medium">{result.url}</span>
            <span className={result.redirected ? 
              (result.isGamePathAI ? "text-red-500" : "text-amber-500") : 
              "text-green-500"}
            >
              {result.redirected ? 
                (result.isGamePathAI ? "Redirecionado (gamepathai.com)" : "Redirecionado") : 
                "Sem redirecionamento"}
            </span>
          </div>
          {result.redirected && (
            <div className="text-gray-400">
              Destino: {result.target}
            </div>
          )}
          {result.status && (
            <div className="text-gray-400">
              Status: {result.status}
            </div>
          )}
          {result.error && (
            <div className="text-red-400">
              Erro: {result.error}
            </div>
          )}
        </div>
      ))}
      
      {testResults.length === 0 && !isRunningTests && diagnoseComplete && (
        <div className="text-center py-2 text-gray-500 text-sm">
          Nenhum teste realizado
        </div>
      )}
      
      {isRunningTests && (
        <div className="text-center py-2 text-gray-500 text-sm">
          Executando testes...
        </div>
      )}
    </div>
  );
};

export default TestResults;
