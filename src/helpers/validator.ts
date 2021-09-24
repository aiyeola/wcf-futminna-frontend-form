import * as yup from 'yup';

const messages = {
  short: 'Too short',
  required: 'This field is required',
  phone: 'The phone number has to be exactly 10 numbers',
  level: 'You no get level? ehn!',
  gender: 'You have to choose a gender, Male or Female',
  emailAddress: 'Invalid email address',
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
  gender: yup.mixed().oneOf(['male', 'female']).required(),
  department: yup.string().required(messages.required),
  level: yup.string().matches(/^[0-9]{3}$/, messages.level),
  campus: yup.string().required(messages.required),
  email: yup.string().email().required(messages.required),
  schoolAddress: yup.string().required(messages.required),
  homeAddress: yup.string().required(messages.required),
  contactNumber1: yup.string().matches(/^[0-9]{10}$/, messages.phone),
  contactNumber2: yup
    .string()
    .matches(/^[0-9]{10}$/, messages.phone)
    .optional(),
  unit: yup.string().min(3, messages.short),
  origin: yup.string().required(messages.required),
  dob: yup.date().required(),
};

export const yupSchema = yup.object().shape(schema);

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
    console.log('value: ', value);
    if (value.length !== 0) {
      return yup
        .string()
        .matches(/^[0-9]{10}$/, messages.phone)
        .required();
    }
    return yup.string().notRequired();
  }),
});
