import React from 'react';
import { Shield } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-blue-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-300 mr-3" />
            <div>
              <h1 className="text-xl font-bold">Crime Report System</h1>
              <p className="text-sm text-blue-200">Public Safety Reporting Portal</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-200">Emergency: Call 100</p>
            <p className="text-xs text-blue-300">Non-Emergency Reports Only</p>
          </div>
        </div>
      </div>
    </header>
  );
};