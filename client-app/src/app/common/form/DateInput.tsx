import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";
import { DateTimePicker } from "react-widgets";

interface IProps extends FieldRenderProps<Date, HTMLElement>, FormFieldProps {
  id?: string | undefined;
}

export const DateInput: React.FC<IProps> = ({
  input,
  placeholder,
  meta: { touched, error },
  date,
  time,
  id,
  ...rest
}) => {
  return (
    <Form.Field error={touched && !!error}>
      <DateTimePicker
        id={id?.toString()}
        onBlur={input.onBlur}
        value={input.value || null}
        placeholder={placeholder}
        onChange={input.onChange}
        onKeyDown={(e) => e.preventDefault()}
        date={date}
        time={time}
        {...rest}
      />
      {touched && !!error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};
