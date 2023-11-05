export interface MedicalRecord {
    date: Date;
    symptoms: string[];
    analysis: string[];
    xRays: string[]; // This could be URLs to the images
    diagnosis: string;
    treatment: string;
    notes: string;
  }
  