import React from 'react';
import { Search, Filter } from 'lucide-react';

interface SearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterType: string;
  setFilterType: (type: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  filterStatus,
  setFilterStatus
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="w-5 h-5 text-gray-400" />
        <h3 className="text-lg font-medium text-gray-900">Search & Filter Reports</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Type Filter */}
        <div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Types</option>
            <option value="theft">Theft</option>
            <option value="assault">Assault</option>
            <option value="vandalism">Vandalism</option>
            <option value="fraud">Fraud</option>
            <option value="burglary">Burglary</option>
            <option value="drug">Drug-related</option>
            <option value="traffic">Traffic Violation</option>
            <option value="domestic">Domestic Violence</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="investigating">Investigating</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>
    </div>
  );
};