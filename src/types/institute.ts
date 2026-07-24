export interface Institute {
  id: number;
  gymId: number;
  name: string;
  address: string;
  city: string;
  email: string;
  active: boolean;
  mob:number;
  isLoggedIn?: number;
  planType?: number;
  renewalDate?: string;
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
