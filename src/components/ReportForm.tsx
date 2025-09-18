import React, { useState, useEffect } from 'react';
import { AlertCircle, Calendar, MapPin, User, Phone, Paperclip, CheckCircle } from 'lucide-react';
import { CrimeReport } from '../types/CrimeReport';

interface ReportFormProps {
  onSubmit: (report: Omit<CrimeReport, 'id' | 'submittedAt' | 'status'>) => void;
}

export const ReportForm: React.FC<ReportFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'other' as CrimeReport['type'],
    description: '',
    location: '',
    dateTime: '',
    reporterName: '',
    reporterContact: '',
    priority: 'medium' as CrimeReport['priority'],
    witnesses: '',
    evidence: ''
  });

  const [evidenceFiles, setEvidenceFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [reportSent, setReportSent] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const pinCodeRegex = /\b\d{6}\b/;

    // Incident Title validation: 1 to 25 words
    const titleWords = formData.title.trim().split(/\s+/).filter(Boolean);
    if (titleWords.length === 0) {
      newErrors.title = 'Title is required';
    } else if (titleWords.length > 25) {
      newErrors.title = 'Incident title must be a maximum of 25 words.';
    }

    // Location validation: 1 to 60 words and includes a 6-digit pin code
    const locationWords = formData.location.trim().split(/\s+/).filter(Boolean);
    if (locationWords.length === 0) {
      newErrors.location = 'Location is required';
    } else if (locationWords.length > 60) {
      newErrors.location = 'Location details must be a maximum of 60 words.';
    } else if (!pinCodeRegex.test(formData.location)) {
      newErrors.location = 'Please include a 6-digit pin code in the location.';
    }

    // Detailed Description validation: min 20, max 1000 words
    const descriptionWords = formData.description.trim().split(/\s+/).filter(Boolean);
    if (descriptionWords.length < 20) {
      newErrors.description = `Description must be at least 20 words. Current count: ${descriptionWords.length}`;
    } else if (descriptionWords.length > 1000) {
      newErrors.description = `Description cannot exceed 1000 words. Current count: ${descriptionWords.length}`;
    }

    // Date and time validation
    if (!formData.dateTime) {
      newErrors.dateTime = 'Date and time are required';
    }

    // Reporter Name validation: 1 to 50 words
    const reporterNameWords = formData.reporterName.trim().split(/\s+/).filter(Boolean);
    if (reporterNameWords.length === 0) {
      newErrors.reporterName = 'Reporter name is required';
    } else if (reporterNameWords.length > 50) {
      newErrors.reporterName = 'Reporter name must be a maximum of 50 words.';
    }
    
    // Reporter Contact validation: 10-digit phone or valid email
    const contact = formData.reporterContact.trim();
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contact) {
      newErrors.reporterContact = 'Contact information is required';
    } else if (!phoneRegex.test(contact) && !emailRegex.test(contact)) {
      newErrors.reporterContact = 'Please enter a valid 10-digit phone number or a valid email address.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    validateForm();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Logic for handling file uploads would go here.
      // You can access the files from the `evidenceFiles` state variable.
      
      onSubmit(formData);
      setReportSent(true); // Show success message
      setTimeout(() => {
        setReportSent(false); // Hide success message after 5 seconds
      }, 5000);
      
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
        evidence: ''
      });
      setEvidenceFiles([]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    
    if (name === 'evidenceFiles') {
      if (files) {
        setEvidenceFiles(Array.from(files));
      }
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      {reportSent && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md relative mb-6" role="alert">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-3" />
            <span className="block sm:inline font-medium">Your report has been sent successfully. Thank you for helping keep the community safe!</span>
          </div>
        </div>
      )}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Submit Crime Report</h2>
          <p className="text-gray-600">Please provide detailed and accurate information about the incident.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
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
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.title ? 'border-red-300' : 'border-gray-300'
                }`}
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

          {/* Location and Time */}
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
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.location ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Address or specific location including pin code"
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
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.dateTime ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.dateTime && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.dateTime}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
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
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.description ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Provide a detailed account of what happened, including sequence of events, people involved, and any other relevant details..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.description}
              </p>
            )}
          </div>

          {/* Reporter Information */}
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
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.reporterName ? 'border-red-300' : 'border-gray-300'
                  }`}
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
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.reporterContact ? 'border-red-300' : 'border-gray-300'
                  }`}
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

          {/* Additional Information */}
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
              placeholder="Describe any physical evidence..."
            />
            <label htmlFor="evidenceFiles" className="mt-4 block text-sm font-medium text-gray-700">
              <Paperclip className="w-4 h-4 inline mr-1" /> Attach Documents/Images/Videos
            </label>
            <input
              type="file"
              id="evidenceFiles"
              name="evidenceFiles"
              multiple
              onChange={handleChange}
              accept="image/*,video/*,application/pdf"
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            {evidenceFiles.length > 0 && (
              <p className="mt-2 text-sm text-gray-600">
                {evidenceFiles.length} file(s) selected.
              </p>
            )}
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
