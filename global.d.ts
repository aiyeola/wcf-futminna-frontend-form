import 'little-state-machine';
import { DateType } from '@date-io/type';

declare module 'little-state-machine' {
  interface GlobalState {
    personalInfo: {
      firstName: string;
      lastName: string;
      gender: string;
      origin: string;
      homeAddress: string;
      schoolAddress: string;
      dob: DateType;
    };
    contactInfo: {
      email: string;
      contactNumber1: string;
      contactNumber2?: string;
    };
    academicInfo: {
      campus: string;
      department: string;
      level: string;
    };
    fellowshipInfo: {
      unit: string[];
    };
  }
}
