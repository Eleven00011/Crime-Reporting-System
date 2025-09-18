import { useState, useEffect } from 'react';
import { ReportForm } from './components/ReportForm';
import { ReportsList } from './components/ReportsList';
import { SearchFilters } from './components/SearchFilters';
import { Header } from './components/Header';
import { CrimeReport } from './types/CrimeReport';
import { submitReport } from './components/SupabaseIntergration';
import { supabase } from './components/Supabase';
import { Search, Plus } from 'lucide-react';

// Supabase se aane wale data ka type define karein
interface SupabaseReport {
  id: string;
  incident_title: string;
  crime_type: string | null; // Nullable type
  location: string;
  date_time: string;
  detailed_description: string;
  full_name: string;
  contact_information: string;
  priority_level: string;
  witness: string | null; // Nullable type
  evidence_description: string | null; // Nullable type
  status: 'pending' | 'investigating' | 'resolved' | 'closed';
  submittedAt: string;
}

function App() {
  const [reports, setReports] = useState<CrimeReport[]>([]);
  const [activeTab, setActiveTab] = useState<'reports' | 'submit'>('reports');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Supabase se reports fetch karne ka function
  const fetchReports = async () => {
    setLoading(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from('crime_reports')
      .select('*')
      .order('date_time', { ascending: false });

    if (fetchError) {
      console.error('Error fetching reports:', fetchError.message);
      setError('Failed to load reports. Please check your Supabase connection and policies.');
      setReports([]); // Clear reports on error
    } else if (data) {
      const fetchedReports: CrimeReport[] = (data as SupabaseReport[]).map((item) => ({
        id: item.id,
        title: item.incident_title,
        // Yahan galti theek ki gayi hai: Null check
        type: (item.crime_type || 'other') as CrimeReport['type'], 
        location: item.location,
        dateTime: item.date_time,
        description: item.detailed_description,
        reporterName: item.full_name,
        reporterContact: item.contact_information,
        priority: item.priority_level as CrimeReport['priority'],
        status: item.status,
        submittedAt: item.submittedAt,
        witnesses: item.witness || '',
        evidence: item.evidence_description || '',
      }));
      setReports(fetchedReports);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleSubmitReport = async (reportData: Omit<CrimeReport, 'id' | 'submittedAt' | 'status'>) => {
    const formData = {
      incident_title: reportData.title,
      crime_type: reportData.type,
      location: reportData.location,
      date_time: reportData.dateTime,
      detailed_description: reportData.description,
      full_name: reportData.reporterName,
      contact_information: reportData.reporterContact,
      priority_level: reportData.priority,
      witness: reportData.witnesses || '',
      evidence_description: reportData.evidence || ''
    };

    const result = await submitReport(formData);
    
    if (result.success) {
      alert('Report submitted successfully!');
      fetchReports();
      setActiveTab('reports');
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearchTerm = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || report.type === filterType;
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    return matchesSearchTerm && matchesType && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
      <Header />
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('reports')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                activeTab === 'reports'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Search className="w-5 h-5 inline mr-2" />
              View Reports
            </button>
            <button
              onClick={() => setActiveTab('submit')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                activeTab === 'submit'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Plus className="w-5 h-5 inline mr-2" />
              Submit Report
            </button>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'reports' ? (
          <div className="space-y-6">
            <SearchFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterType={filterType}
              setFilterType={setFilterType}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
            />
            {loading ? (
              <div className="text-center py-12 text-gray-500">
                <p>Loading reports...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-500">
                <p>{error}</p>
                <p className="mt-2 text-sm text-gray-500">Please check your internet connection and Supabase dashboard.</p>
              </div>
            ) : (
              <ReportsList reports={filteredReports} />
            )}
          </div>
        ) : (
          <ReportForm onSubmit={handleSubmitReport} />
        )}
      </div>
    </div>
  );
}

export default App;