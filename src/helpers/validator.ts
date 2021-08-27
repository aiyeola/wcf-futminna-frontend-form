import * as yup from 'yup';

const messages = {
  short: 'Too short',
  required: 'This field is required',
  maxDate: "The birth date can't be later than 01-01-2002",
  phone: 'The phone number has to be exactly 10 numbers',
  gender: 'You have to choose a gender',
  emailAddress: 'Invalid email address',
  validLong: 'Reason must be at least 30 characters',
  alphaNum: 'Has to start with a letter',
};

const schema = {
  firstName: yup
    .string()
    .required(messages.required)
    .matches(/^[a-zA-Z]/, messages.alphaNum),
  lastName: yup
    .string()
    .required(messages.required)
    .matches(/^[a-zA-Z]/, messages.alphaNum),
  gender: yup.string().min(3, messages.gender),
  department: yup.string().required(messages.required),
  level: yup.string().matches(/^[0-9]{10}$/, messages.phone),
  campus: yup.string().required(messages.required),
  email: yup.string().email().required(messages.required),
  schoolAddress: yup.string().required(messages.required),
  homeAddress: yup.string().min(3, messages.short),
  contactNumber1: yup.string().matches(/^[0-9]{10}$/, messages.phone),
  contactNumber2: yup.string().matches(/^[0-9]{10}$/, messages.phone),
  unit: yup.string().min(3, messages.short),
  origin: yup.string().min(3, messages.short),
  dob: yup.date().max('01-01-2002', messages.maxDate),
};

export default async function validator(key, value) {
  const newSchema = yup.object().shape({ [key]: schema[key] });
  const toCheck = { [key]: value };
  try {
    return await newSchema.nullable().validate(toCheck);
  } catch (err) {
    return {
      error: err.errors[0],
    };
  }
}
