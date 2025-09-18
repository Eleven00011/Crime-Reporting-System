// SupabaseIntegration.ts (Corrected)
import { supabase } from './Supabase';
import { PostgrestError } from '@supabase/supabase-js'; // Import Supabase error type

interface ReportData {
  incident_title: string;
  crime_type: string;
  location: string;
  date_time: string;
  detailed_description: string;
  full_name: string;
  contact_information: string;
  priority_level: string;
  witness: string;
  evidence_description: string;
}

interface SubmitResult {
  success: boolean;
  error?: string;
}

export const submitReport = async (formData: ReportData): Promise<SubmitResult> => {
  try {
    // Ab yeh code user login ko nahi check karega,
    // jisse public users bhi reports submit kar payenge.
    
    // Insert the report into the crime_reports table
    const { error } = await supabase.from('crime_reports').insert([
      {
        // user_id field ab yahaan nahi hai
        incident_title: formData.incident_title,
        crime_type: formData.crime_type,
        location: formData.location,
        date_time: formData.date_time,
        detailed_description: formData.detailed_description,
        full_name: formData.full_name,
        contact_information: formData.contact_information,
        priority_level: formData.priority_level,
        witness: formData.witness || null, // Handle optional fields
        evidence_description: formData.evidence_description || null,
      },
    ]);

    if (error) {
      return { success: false, error: error.message || 'Failed to insert report.' };
    }

    return { success: true };
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (error && typeof error === 'object' && 'message' in error) {
      errorMessage = (error as PostgrestError).message;
    }
    console.log('Submission error:', error); // For debugging
    return { success: false, error: errorMessage };
  }
};