import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { FormFieldProps, Form, Label } from 'semantic-ui-react'
import { DateTimePicker } from 'react-widgets'

interface IProps extends FieldRenderProps<any, HTMLElement>, FormFieldProps {
}

export const DateInput: React.FC<IProps> = ({ input, placeholder, meta: { touched, error }, date, time, id, open, ...rest }) => {
    return (
        <Form.Field error={touched && !!error}>
            <DateTimePicker
                id={id?.toString()}
                placeholder={placeholder}
                onChange={input.onChange}
                {...rest}
                date={date}
                time={time}
                open={open}
            />
            {touched && !!error && (<Label basic color="red">{error}</Label>)}
        </Form.Field>
    )
}   
