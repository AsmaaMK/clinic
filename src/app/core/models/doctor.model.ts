export type DoctorData = {
  name: string;
  email: string;
  phone: string;
  specialty: string;
};

export type Doctor = DoctorData & {
  _id: string;
};
