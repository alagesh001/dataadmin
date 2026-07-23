export interface Institute {
  id: number;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  active: boolean;
}

export interface CreateInstituteForm {
  name: string;
  phone: string;
  email: string;
  city: string;
  address: string;
}

export type CreateInstituteFormErrors = Partial<
  Record<keyof CreateInstituteForm, string>
>;
