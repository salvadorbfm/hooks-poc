import React, { useEffect } from "react";
import { Plan } from "../types/Plans.types";
import PlanProvider, { usePlan } from "./Plan.provider";
import { getMocks } from "./Plan.mocks";
import { render, RenderResult } from "@testing-library/react";

const spy = jest.fn();

const { plans, newPlan } = getMocks();

function Child(props: any): null {
  const { selectedPlan, plans } = usePlan();

  useEffect(() => {
    spy({ selectedPlan, plans });
  }, [selectedPlan, plans]);

  return null;
}

const ProviderActions: React.FunctionComponent = () => {
  const { plans, dispatch } = usePlan();
  const updatedPlan = plans && plans[0];
  if (!updatedPlan) return null;

  updatedPlan.description = "Updated";

  const updatePlan = () => {
    dispatch({ type: "UPDATE_PLAN", payload: updatedPlan });
  };

  const deletePlan = () => {
    dispatch({ type: "DELETE_PLAN", payload: 1 });
  };

  return (
    <>
      <button onClick={updatePlan}>Add Profile</button>
      <button onClick={deletePlan}>Delete Profile</button>
    </>
  );
};

function renderProvider(props: any): RenderResult {
  return render(
    <PlanProvider>
      <Child {...props} />
      <ProviderActions />
    </PlanProvider>
  );
}

describe("Plan provider", () => {
  test("returns profiles as null if doesn't exist", () => {
    renderProvider({});
    const expectedValue = { plans: null, selectedPlan: null };
    expect(spy).toHaveBeenCalledWith(expectedValue);
  });
});
