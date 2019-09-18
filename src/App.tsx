import React from "react";
import "./App.css";
import PlanProvider from "../src/providers/Plan.provider";
import { usePlan } from "../src/providers/Plan.provider";
import { Plan, Maybe } from "../src/types/Plans.types";

import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton, ListItemSecondaryAction } from "@material-ui/core";

const log = console.info;

type MaybePlan = Maybe<Plan>;
type MaybePlanArray = Maybe<Plan[]>;

// This should be in utils
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
            payload: { id: getRandomInt(10, 100), description: "Just added" }
          });
        }}
      >
        Add Plan
      </Button>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="App">
      <PlanProvider>
        <PlansView />
      </PlanProvider>
    </div>
  );
};

export default App;
