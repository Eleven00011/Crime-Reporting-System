export interface CrimeReport {
  id: string;
  title: string;
  type: 'theft' | 'assault' | 'vandalism' | 'fraud' | 'burglary' | 'drug' | 'traffic' | 'domestic' | 'other';
  description: string;
  location: string;
  dateTime: string;
  reporterName: string;
  reporterContact: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'investigating' | 'resolved' | 'closed';
  submittedAt: string;
  witnesses?: string;
  evidence?: string;
}