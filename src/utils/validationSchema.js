import * as Yup from 'yup';
import 'yup-phone';

export const contactSchema = Yup.object().shape({
  name: Yup.string().min(2).max(20).required(),
  number: Yup.string().phone('', false).required(),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().email(),
  password: Yup.string().min(7).max(20),
});

export const signupSchema = Yup.object().shape({
  name: Yup.string().min(2).max(20),
  email: Yup.string().email(),
  password: Yup.string().min(7).max(20),
});
