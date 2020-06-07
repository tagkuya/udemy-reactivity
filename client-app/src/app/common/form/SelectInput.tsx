import React from "react";
import { Form, Select, FormFieldProps, Label } from "semantic-ui-react";
import { category } from "../options/categoryOptions";
import { FieldRenderProps } from "react-final-form";

interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {
  e: any;
}

export const SelectInput: React.FC<IProps> = ({
  input,
  placeholder,
  meta: { touched, error },
}) => {
  return (
    <Form.Field>
      <Select
        value={input.value}
        options={category}
        placeholder={placeholder}
        onChange={(e, data) => input.onChange(data.value)}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};
