import { Plan, Maybe } from "../types/Plans.types";

export interface PlansState {
  plans: Maybe<Plan[]>;
  selectedPlan: Maybe<Plan>;
}

export type Action =
  | { type: "LOAD_PLANS"; payload: Plan[] }
  | { type: "ADD_PLAN"; payload: Plan }
  | { type: "UPDATE_PLAN"; payload: Plan }
  | { type: "DELETE_PLAN"; payload: number };

function excludePlanByID(plans: Plan[], id: number) {
  return plans.filter(plan => plan.id !== id);
}

function planReducer(state: PlansState, action: Action): PlansState {
  switch (action.type) {
    case "LOAD_PLANS": {
      return {
        plans: action.payload,
        selectedPlan: action.payload[0]
      };
    }

    case "ADD_PLAN": {
      if (!state.plans) {
        return state;
      }

      const plans = state.plans.concat(action.payload);
      const selectedPlan = plans[0];

      return { ...state, plans, selectedPlan };
    }

    case "UPDATE_PLAN": {
      if (!state.plans) {
        return state;
      }
      const plans = excludePlanByID(state.plans, action.payload.id).concat(
        action.payload
      );
      const selectedPlan = plans[0];

      return { ...state, plans, selectedPlan };
    }

    case "DELETE_PLAN": {
      const idToDelete = action.payload;
      if (!state.plans) {
        return state;
      }

      const plans = excludePlanByID(state.plans, idToDelete);
      return { ...state, plans };
    }

    default: {
      throw new Error("Action not defined");
    }
  }
}

export default planReducer;
