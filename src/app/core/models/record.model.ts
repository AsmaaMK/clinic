export type RecordData = {
  doctorId: string;
  patientId: {
    _id: string;
    name: string;
    email: string;
    dateOfBirth: Date;
    gender: 'male' | 'female';
  };
  notes: string;
  sessionDate: Date;
  treatment: string;
  messages: {
    message: string;
    date: Date;
  }[];
};

export type Record = RecordData & {
  _id: string;
};
