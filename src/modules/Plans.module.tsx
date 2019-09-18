import React from "react";
import { usePlan } from "../providers/Plan.provider";
import { Plan, Maybe } from "../types/Plans.types";

import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton, ListItemSecondaryAction } from "@material-ui/core";

// const log = console.info;

type MaybePlan = Maybe<Plan>;
type MaybePlanArray = Maybe<Plan[]>;

// This should be in utils
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomNewPlan() {
  const descriptions = [
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters",
    "as opposed to using 'Content here, content here', making it look like readable English."
  ];
  const id = getRandomInt(10, 100);
  const newPlan: Plan = {
    id: id,
    description: descriptions[getRandomInt(0, 2)].concat(` ${id}`)
  };
  return newPlan;
}

const PlanItem = ({
  plan,
  deleteAction
}: {
  plan: MaybePlan;
  deleteAction: any;
}) => {
  if (!plan) return null;
  return (
    <ListItem key={plan.id} button>
      <ListItemText>{plan.description}</ListItemText>
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => {
            deleteAction(plan.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const PlanList = ({
  items,
  deleteAction
}: {
  items: MaybePlanArray;
  deleteAction: any;
}) => {
  return (
    <List component="nav">
      {items &&
        items.map(item => <PlanItem plan={item} deleteAction={deleteAction} />)}
    </List>
  );
};

const PlansView: React.FC = () => {
  const { plans, loadPlans, dispatch } = usePlan();

  const deleteAction = (id: number) => {
    dispatch({
      type: "DELETE_PLAN",
      payload: id
    });
  };

  return (
    <div>
      <PlanList items={plans} deleteAction={deleteAction} />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          loadPlans();
        }}
      >
        Reset Plans
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          dispatch({
            type: "ADD_PLAN",
            payload: getRandomNewPlan()
          });
        }}
      >
        Add Plan
      </Button>
    </div>
  );
};

export default PlansView;
