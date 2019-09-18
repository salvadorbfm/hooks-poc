import planReducer, { Action, PlansState } from "./Plan.reducer";
import { getMocks } from "./Plan.mocks";
import { Plan } from "../types/Plans.types";

const { plans, newPlan } = getMocks();
describe("Plan Reducer Test Suite", () => {
  it("load plans", () => {
    const state: PlansState = { plans: null, selectedPlan: null };
    const newState: PlansState = { plans: plans, selectedPlan: plans[0] };
    const action: Action = { type: "LOAD_PLANS", payload: plans };

    expect(planReducer(state, action)).toEqual(newState);
  });

  it("add new plan", () => {
    const state: PlansState = { plans: plans, selectedPlan: plans[0] };
    const newState: PlansState = {
      plans: plans.concat(newPlan),
      selectedPlan: plans[0]
    };
    const action: Action = { type: "ADD_PLAN", payload: newPlan };

    expect(planReducer(state, action)).toEqual(newState);
  });

  it("update a plan", () => {
    const state: PlansState = { plans: plans, selectedPlan: plans[0] };
    const updatedPlan: Plan = {
      id: 1,
      description: "Just Updated"
    };
    const updatedPlans = plans.slice(1).concat(updatedPlan);
    const newState: PlansState = {
      plans: updatedPlans,
      selectedPlan: updatedPlans[0]
    };
    const action: Action = { type: "UPDATE_PLAN", payload: updatedPlan };

    expect(planReducer(state, action)).toEqual(newState);
  });
});
