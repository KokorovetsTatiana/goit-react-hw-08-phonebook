import { Formik, Form, Field } from 'formik';
import { debounce } from 'throttle-debounce';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';
import css from './FormItems.module.css';

export const FormItems = ({
  schema,
  onSubmit,
  children,
  initValues,
  inputTags,
}) => {
  const onError = debounce(500, error => {
    toast.error(error);
  });

  return (
    <Formik
      initialValues={initValues}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form className={css.form}>
          {inputTags.map(el => {
            return (
              <label className={css.label} htmlFor={el.id} key={el.id}>
                {el.label}
                <Field
                  type={el.type}
                  className={css.input}
                  id={el.id}
                  name={el.id}
                  placeholder={`Enter ${el.label}`}
                />
                {touched[el.id] && errors[el.id] && onError(errors[el.id])}
              </label>
            );
          })}
          {children}
        </Form>
      )}
    </Formik>
  );
};

FormItems.propTypes = {
  schema: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  initValues: PropTypes.objectOf(PropTypes.string.isRequired),
  inputTags: PropTypes.arrayOf(PropTypes.object.isRequired),
};