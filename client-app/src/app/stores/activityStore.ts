import { observable, action, computed } from "mobx";
import { createContext } from "react";
import { IActivity } from "../models/activity";
import agent from "../../api/agent";
import { v4 as uuid } from "uuid";

class ActivityStore {
  @observable activitiesRegistory = new Map();
  @observable activities: IActivity[] = [];
  @observable selectedActivity: IActivity | undefined;
  @observable lodingInitial = false;
  @observable editMode = false;
  @observable submitting = false;

  @computed get activitiesByDate() {
    return Array.from(this.activitiesRegistory.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action loadActivities = async () => {
    this.lodingInitial = true;
    try {
      const activities = await agent.Activities.list();
      activities.forEach((activity) => {
        activity.date = activity.date.split(".")[0];
        this.activitiesRegistory.set(activity.id, activity);
      });
      this.lodingInitial = false;
    } catch (error) {
      console.log(error);
      this.lodingInitial = false;
    }
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      this.activitiesRegistory.set(activity.id, activity);
      this.editMode = false;
      this.submitting = false;
    } catch (error) {
      console.log(error);
      this.submitting = false;
    }
  };

  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedActivity = undefined;
  };

  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activitiesRegistory.get(id);
    this.editMode = false;
  };
}

export default createContext(new ActivityStore());
