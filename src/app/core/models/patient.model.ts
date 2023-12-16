export type PatientData = {
  name: string;
  email: string;
  dateOfBirth: Date;
  gender: 'male' | 'female';
};

export type Patient = PatientData & {
  _id: string;
};
