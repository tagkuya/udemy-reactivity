import React, { useContext } from "react";
import { Item, Button, Segment, Icon } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";
import { IActivity } from "../../../app/models/activity";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

interface IProps {
  activity: IActivity;
}

const ActivityListItem: React.FC<IProps> = ({ activity }) => {
  const activityStore = useContext(ActivityStore);
  const { submitting, target } = activityStore;
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              size="tiny"
              src={`/assets/user.png`}
              circular
            ></Item.Image>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Description>Bob</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="clock" />
        {activity.date}
        <Icon name="marker" />
        {activity.venue},{activity.city}
      </Segment>
      <Segment secondary>Attendees will go here</Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          name={activity.id}
          loading={target === activity.id && submitting}
          floated="right"
          content="View"
          color="blue"
        />
      </Segment>
    </Segment.Group>
  );
};

export default observer(ActivityListItem);
