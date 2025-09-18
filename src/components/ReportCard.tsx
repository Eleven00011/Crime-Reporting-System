import React, { useState } from 'react';
import { Calendar, MapPin, User, AlertTriangle, CheckCircle, Clock, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { CrimeReport } from '../types/CrimeReport';

interface ReportCardProps {
  report: CrimeReport;
}

export const ReportCard: React.FC<ReportCardProps> = ({ report }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString: string) => {
    // Add a check to prevent errors with null or undefined dates
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      theft: 'bg-orange-100 text-orange-800',
      assault: 'bg-red-100 text-red-800',
      vandalism: 'bg-purple-100 text-purple-800',
      fraud: 'bg-yellow-100 text-yellow-800',
      burglary: 'bg-red-100 text-red-800',
      drug: 'bg-green-100 text-green-800',
      traffic: 'bg-blue-100 text-blue-800',
      domestic: 'bg-pink-100 text-pink-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[type] || colors.other;
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: 'text-green-600',
      medium: 'text-yellow-600',
      high: 'text-red-600'
    };
    return colors[priority] || colors.medium;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'investigating':
        return <AlertTriangle className="w-4 h-4 text-blue-500" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'closed':
        return <XCircle className="w-4 h-4 text-gray-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      investigating: 'bg-blue-100 text-blue-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || colors.pending;
  };
  
  // Bug fix: Default values for potentially null fields from Supabase.
  const safeType = report.type || 'other';
  const safeStatus = report.status || 'pending';

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(safeType)}`}>
                {safeType.charAt(0).toUpperCase() + safeType.slice(1)}
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(safeStatus)}`}>
                {getStatusIcon(safeStatus)}
                <span className="ml-1">{safeStatus.charAt(0).toUpperCase() + safeStatus.slice(1)}</span>
              </span>
              <span className={`text-xs font-medium ${getPriorityColor(report.priority)}`}>
                {report.priority.toUpperCase()} PRIORITY
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h3>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-4 p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
            <span>{formatDate(report.dateTime)}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            <span className="truncate">{report.location}</span>
          </div>
          <div className="flex items-center">
            <User className="w-4 h-4 mr-2 text-gray-400" />
            <span>Reported by {report.reporterName}</span>
          </div>
        </div>

        {/* Description Preview */}
        <p className="text-gray-700 leading-relaxed">
          {isExpanded ? report.description : `${report.description.substring(0, 150)}${report.description.length > 150 ? '...' : ''}`}
        </p>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Reporter Contact</h4>
                <p className="text-sm text-gray-600">{report.reporterContact}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Report ID</h4>
                <p className="text-sm text-gray-600 font-mono">{report.id}</p>
              </div>
            </div>

            {report.witnesses && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Witnesses</h4>
                <p className="text-sm text-gray-600">{report.witnesses}</p>
              </div>
            )}

            {report.evidence && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Evidence</h4>
                <p className="text-sm text-gray-600">{report.evidence}</p>
              </div>
            )}

            <div className="text-xs text-gray-500">
              Submitted: {formatDate(report.submittedAt)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};