import * as yup from 'yup';

const messages = {
  required: 'This field is required',
  phone: 'The phone number has to be exactly 10 numbers',
  level: 'You no get level? ehn!',
  gender: 'You have to choose a gender, Male or Female',
  alphaNum: 'Has to start with a letter',
  unit: 'You have to be in at least a unit',
};

export const personalInfoSchema = yup.object().shape({
  firstName: yup
    .string()
    .required(messages.required)
    .matches(/^[a-zA-Z]/, messages.alphaNum),
  lastName: yup
    .string()
    .required(messages.required)
    .matches(/^[a-zA-Z]/, messages.alphaNum),
  gender: yup.mixed().oneOf(['male', 'female']).defined(),
  origin: yup.string().required(messages.required),
  homeAddress: yup.string().required(messages.required),
  schoolAddress: yup.string().required(messages.required),
  dob: yup
    .date()
    .required()
    .test(
      'age',
      `C'mon, you can't be less than 18 years old`,
      function (birthdate) {
        const cutoff = new Date();
        cutoff.setFullYear(cutoff.getFullYear() - 18);
        return birthdate <= cutoff;
      },
    ),
});

export const contactInfoSchema = yup.object().shape({
  email: yup.string().email().required(messages.required),
  contactNumber1: yup
    .string()
    .matches(/^[0-9]{10}$/, messages.phone)
    .required(),
  contactNumber2: yup.lazy((value) => {
    if (value.length !== 0) {
      return yup
        .string()
        .matches(/^[0-9]{10}$/, messages.phone)
        .required();
    }
    return yup.string().notRequired();
  }),
});

export const academicInfoSchema = yup.object().shape({
  campus: yup.string().required(messages.required),
  department: yup.string().required(messages.required),
  level: yup.string().required(messages.level),
});

export const fellowshipInfoSchema = yup.object().shape({
  unit: yup.mixed().oneOf(['male', 'female']).typeError(messages.unit),
});
