/**import { CrimeReport } from '../types/CrimeReports';

export const mockReports: CrimeReport[] = [
  {
    id: '1',
    title: 'Vehicle Break-in on Main Street',
    description: 'Car window smashed and personal items stolen from vehicle parked overnight.',
    crimeType: 'Theft',
    priority: 'Medium',
    status: 'Under Investigation',
    location: '1234 Main Street, Downtown',
    dateTime: '2024-01-15T14:30:00Z',
    reporterName: 'John Smith',
    reporterContact: 'john.smith@email.com',
    officerAssigned: 'Officer Johnson',
    evidence: ['Photos of broken window', 'Witness statement'],
    createdAt: '2024-01-15T15:00:00Z',
    updatedAt: '2024-01-16T10:30:00Z'
  },
  {
    id: '2',
    title: 'Assault at City Park',
    description: 'Physical altercation between two individuals resulted in minor injuries.',
    crimeType: 'Assault',
    priority: 'High',
    status: 'Pending',
    location: 'City Park, West Entrance',
    dateTime: '2024-01-14T20:15:00Z',
    reporterName: 'Sarah Williams',
    reporterContact: '(555) 123-4567',
    evidence: ['Medical report', 'Security footage'],
    createdAt: '2024-01-14T21:00:00Z',
    updatedAt: '2024-01-14T21:00:00Z'
  },
  {
    id: '3',
    title: 'Graffiti Vandalism on Public Building',
    description: 'Spray paint graffiti found on the exterior wall of the community center.',
    crimeType: 'Vandalism',
    priority: 'Low',
    status: 'Resolved',
    location: '567 Community Drive',
    dateTime: '2024-01-13T08:00:00Z',
    reporterName: 'City Maintenance',
    reporterContact: 'maintenance@city.gov',
    officerAssigned: 'Officer Davis',
    evidence: ['Before/after photos', 'Cost estimate for cleanup'],
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-17T14:20:00Z'
  }
];

export const generateReportId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}; **/