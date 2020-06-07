import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";

interface IProps
  extends FieldRenderProps<string, HTMLElement>,
    FormFieldProps {}

const TextAreaInput: React.FC<IProps> = ({
  input,
  placeholder,
  rows,
  meta: { touched, error },
}) => {
  return (
    <Form.Field error={touched && !!error}>
      <textarea {...input} rows={rows} placeholder={placeholder}>
        {touched && error && (
          <Label basic color="red">
            {error}
          </Label>
        )}
      </textarea>
    </Form.Field>
  );
};

export default TextAreaInput;
