import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { FormFieldProps, Form, Label } from 'semantic-ui-react'
import { DateTimePicker } from 'react-widgets'

interface IProps extends FieldRenderProps<Date, HTMLElement>, FormFieldProps {
}

export const DateInput: React.FC<IProps> = ({ input, placeholder, meta: { touched, error } }) => {
    return (
        <Form.Field error={touched && !!error}>
            <DateTimePicker
                {...input}
                placeholder={placeholder}
                onChange={(e, data) => input.onChange(data)} />
            {touched && !!error && (<Label basic color="red">{error}</Label>)}
        </Form.Field>
    )
}   
