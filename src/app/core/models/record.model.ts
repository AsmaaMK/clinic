export type Record = {
  _id: string;
  doctorId: string;
  patientId: string;
  notes: string;
  sessionDate: Date;
  treatment: string;
  messages: {
    message: string;
    date: Date;
  }[];
};
