export interface MedicalRecord {
  date: Date;
  symptoms: string[];
  analysis: string[];
  xRays: string[]; // This could be URLs to the images
  diagnosis: string;
  treatment: string;
  notes: string;
}


export class MedicalRecordImpl implements MedicalRecord {
  date: Date;
  symptoms: string[];
  analysis: string[];
  xRays: string[];
  diagnosis: string;
  treatment: string;
  notes: string;

  constructor() {
    // You can provide default values or initialize the properties here
    this.date = new Date();
    this.symptoms = [];
    this.analysis = [];
    this.xRays = [];
    this.diagnosis = '';
    this.treatment = '';
    this.notes = '';
  }
}
