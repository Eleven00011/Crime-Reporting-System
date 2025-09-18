/*import React, { useState, useEffect } from 'react';
import { AlertCircle, Calendar, MapPin, User, Phone } from 'lucide-react';

// Supabase configuration - Replace these with your actual credentials
const supabaseUrl: string = 'https://blwrrmzzynlchctvncgj.supabase.co'; 
const supabaseAnonKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsd3JybXp6eW5sY2hjdHZuY2dqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNjQxMTQsImV4cCI6MjA3MDg0MDExNH0.9YRAI0rfCxOPgBGT2TR0B4KR1ENs67ThlWV1Apu1eK4'; 

// TypeScript me type-safety banaye rakhne ke liye, hum custom types banayenge.
// Yah Supabase client ke liye ek type hai.
interface SupabaseClientLike {
  from: (table: string) => {
    insert: (data: unknown[]) => Promise<{ data: unknown | null; error: { message: string } | null }>;
  };
}

// Global window object par Supabase ko type-safe banayein
declare global {
  interface Window {
    supabase: {
      createClient: (url: string, key: string) => SupabaseClientLike;
    };
  }
}

// We'll initialize the Supabase client with our new type
let supabase: SupabaseClientLike;

// Define the type for the report data using a TypeScript interface
interface CrimeReport {
  id?: string;
  title: string;
  type: 'theft' | 'assault' | 'vandalism' | 'fraud' | 'burglary' | 'drug' | 'traffic' | 'domestic' | 'other';
  description: string;
  location: string;
  dateTime: string;
  reporterName: string;
  reporterContact: string;
  priority: 'low' | 'medium' | 'high';
  witnesses: string;
  evidence: string;
  submittedAt?: string;
  status?: string;
}

/**
 * Submits a crime report to the Supabase database.
 * @param formData - The data from the crime report form.
 * @returns An object indicating success or failure.
 */
/*const submitReport = async (formData: CrimeReport): Promise<{ success: boolean; error?: string }> => {
  if (!supabase) {
    console.error('Supabase client not initialized.');
    return { success: false, error: 'Supabase is not ready yet.' };
  }
  try {
    const { error } = await supabase
      .from('crime_reports')
      .insert([
        {
          incident_title: formData.title,
          crime_type: formData.type,
          location: formData.location,
          date_time: formData.dateTime,
          detailed_description: formData.description,
          full_name: formData.reporterName,
          contact_information: formData.reporterContact,
          priority_level: formData.priority,
          witness: formData.witnesses || null,
          evidence_description: formData.evidence || null,
        },
      ]);

    if (error) {
      console.error('Supabase insert error:', error.message);
      return { success: false, error: 'Failed to submit report. Please check your Supabase setup.' };
    }

    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Unexpected error during submission:', error.message);
      return { success: false, error: 'An unexpected error occurred.' };
    }
    return { success: false, error: 'An unknown error occurred.' };
  }
};

// Main application component
const App: React.FC = () => {
  const [submissionStatus, setSubmissionStatus] = useState<{
    loading: boolean;
    success: boolean;
    error: string;
  }>({
    loading: false,
    success: false,
    error: '',
  });

  // Load Supabase script and initialize client on component mount
  useEffect(() => {
    // Check if Supabase is already available
    if (window.supabase) {
      supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey);
    } else {
      // Create and append the Supabase CDN script tag
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      script.onload = () => {
        // Initialize client once the script is loaded
        supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey);
      };
      document.body.appendChild(script);
    }
  }, []);

  // This function is passed down to the form to handle submission
  const handleFormSubmit = async (reportData: CrimeReport) => {
    setSubmissionStatus({ loading: true, success: false, error: '' });
    const result = await submitReport(reportData);
    setSubmissionStatus({
      loading: false,
      success: result.success,
      error: result.error || '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Status message display *//*}
        {submissionStatus.loading && (
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-md flex items-center shadow-md">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p>Submitting report, please wait...</p>
          </div>
        )}
        {submissionStatus.success && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md shadow-md">
            <p className="font-medium">Success!</p>
            <p>Your report has been submitted successfully.</p>
          </div>
        )}
        {submissionStatus.error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md">
            <p className="font-medium">Error!</p>
            <p>{submissionStatus.error}</p>
          </div>
        )}

        {/* Crime Report Form Component *//*}
        <ReportForm onSubmit={handleFormSubmit} />
      </div>
    </div>
  );
};

interface ReportFormProps {
  onSubmit: (formData: CrimeReport) => Promise<void>;
}

const ReportForm: React.FC<ReportFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<CrimeReport>({
    title: '',
    type: 'other',
    description: '',
    location: '',
    dateTime: '',
    reporterName: '',
    reporterContact: '',
    priority: 'medium',
    witnesses: '',
    evidence: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.dateTime) newErrors.dateTime = 'Date and time are required';
    if (!formData.reporterName.trim()) newErrors.reporterName = 'Reporter name is required';
    if (!formData.reporterContact.trim()) newErrors.reporterContact = 'Contact information is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      // Reset form after submission attempt
      setFormData({
        title: '',
        type: 'other',
        description: '',
        location: '',
        dateTime: '',
        reporterName: '',
        reporterContact: '',
        priority: 'medium',
        witnesses: '',
        evidence: '',
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name as keyof CrimeReport]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const inputClass = (name: string): string => {
    const baseClass = `w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`;
    const errorClass = errors[name] ? `border-red-300` : ``;
    return `${baseClass} ${errorClass}`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Submit Crime Report</h2>
          <p className="text-gray-600">Please provide detailed and accurate information about the incident.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information *//*}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Incident Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={inputClass('title')}
                placeholder="Brief description of the incident"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.title}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Crime Type *
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
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
          </div>

          {/* Location and Time *//*}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                <MapPin className="w-4 h-4 inline mr-1" />
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={inputClass('location')}
                placeholder="Address or specific location"
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.location}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="dateTime" className="block text-sm font-medium text-gray-700 mb-1">
                <Calendar className="w-4 h-4 inline mr-1" />
                Date & Time *
              </label>
              <input
                type="datetime-local"
                id="dateTime"
                name="dateTime"
                value={formData.dateTime}
                onChange={handleChange}
                className={inputClass('dateTime')}
              />
              {errors.dateTime && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.dateTime}
                </p>
              )}
            </div>
          </div>

          {/* Description *//*}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Detailed Description *
            </label>
            <textarea
              id="description"
              name="description"
              rows={6}
              value={formData.description}
              onChange={handleChange}
              className={inputClass('description')}
              placeholder="Provide a detailed account of what happened, including sequence of events, people involved, and any other relevant details..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.description}
              </p>
            )}
          </div>

          {/* Reporter Information *//*}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Reporter Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="reporterName" className="block text-sm font-medium text-gray-700 mb-1">
                  <User className="w-4 h-4 inline mr-1" />
                  Full Name *
                </label>
                <input
                  type="text"
                  id="reporterName"
                  name="reporterName"
                  value={formData.reporterName}
                  onChange={handleChange}
                  className={inputClass('reporterName')}
                  placeholder="Your full name"
                />
                {errors.reporterName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.reporterName}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="reporterContact" className="block text-sm font-medium text-gray-700 mb-1">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Contact Information *
                </label>
                <input
                  type="text"
                  id="reporterContact"
                  name="reporterContact"
                  value={formData.reporterContact}
                  onChange={handleChange}
                  className={inputClass('reporterContact')}
                  placeholder="Phone number or email"
                />
                {errors.reporterContact && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.reporterContact}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Additional Information *//*}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                Priority Level
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="witnesses" className="block text-sm font-medium text-gray-700 mb-1">
                Witnesses (Optional)
              </label>
              <textarea
                id="witnesses"
                name="witnesses"
                rows={3}
                value={formData.witnesses}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Names and contact information of any witnesses..."
              />
            </div>
          </div>

          <div>
            <label htmlFor="evidence" className="block text-sm font-medium text-gray-700 mb-1">
              Evidence Description (Optional)
            </label>
            <textarea
              id="evidence"
              name="evidence"
              rows={3}
              value={formData.evidence}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe any physical evidence, photos, videos, or other supporting materials..."
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App; */
