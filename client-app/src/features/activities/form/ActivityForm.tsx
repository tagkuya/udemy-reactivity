import React, { useState, FormEvent, useContext, useEffect, Fragment } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { IActivity, IActivityFormValues, ActivityFormValues } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from 'react-final-form'
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import { SelectInput } from "../../../app/common/form/SelectInput";
import { DateInput } from "../../../app/common/form/DateInput";
import { combineDateAndTime } from "../../../app/common/util/util";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    activity: initialFormState,
    loadActivity,
    clearActivity,
  } = activityStore;

  const [activity, setActivity] = useState(new ActivityFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadActivity(match.params.id).then((activity) => {
        setActivity(new ActivityFormValues(activity));
      }).finally(() => {
        setLoading(false);
      });
    }
  }, [
    loadActivity,
    match.params.id,
  ]);

  // const handleSubmit = () => {
  //   if (activity.id.length === 0) {
  //     let newActivity = {
  //       ...activity,
  //       id: uuid(),
  //     };
  //     createActivity(newActivity).then(() =>
  //       history.push(`/activities/${newActivity.id}`)
  //     );
  //   } else {
  //     editActivity(activity).then(() =>
  //       history.push(`/activities/${activity.id}`)
  //     );
  //   }
  // };

  const handleFinalFromSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, ...activity } = values;
    activity.date = dateAndTime;
    if (activity.id) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`)
      );
    } else {
      editActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    }
  }

  // const handleInputChange = (
  //   event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = event.currentTarget;
  //   setActivity({ ...activity, [name]: value });
  // };

  /* React-Final-Formを使用することにより、DOMの変更を行ってくれる。Stateの管理をしなくてもいい。*/

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            initialValues={activity}
            onSubmit={handleFinalFromSubmit}
            render={({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={activity.title}
                  component={TextInput}
                />
                <Field
                  type="text"
                  name="description"
                  rows={2}
                  placeholder="Description"
                  value={activity.description}
                  component={TextAreaInput}
                />
                <Field
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={activity.category}
                  component={SelectInput}
                />
                <Form.Group widths="equal">
                  <Field
                    name="date"
                    placeholder="Date"
                    date={true}
                    time={false}
                    value={activity.date}
                    component={DateInput}
                  />
                  <Field
                    name="time"
                    placeholder="Time"
                    date={false}
                    time={true}
                    value={activity.time}
                    component={DateInput}
                  />
                </Form.Group>
                <Field
                  type="text"
                  name="city"
                  placeholder="City"
                  value={activity.city}
                  component={TextInput}
                />
                <Field
                  type="text"
                  name="venue"
                  placeholder="Venue"
                  value={activity.venue}
                  component={TextInput}
                />
                <Button
                  loading={submitting}
                  disabled={loading}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                />
                <Button
                  onClick={() => history.push("/activities")}
                  disabled={loading}
                  floated="right"
                  type="button"
                  content="Cancel"
                />
              </Form>
            )} />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
