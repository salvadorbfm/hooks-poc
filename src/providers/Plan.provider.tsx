import React, {
  useContext,
  useEffect,
  useReducer,
  useMemo,
  useCallback
} from "react";
import planReducer, { Action, PlansState } from "./Plan.reducer";
import { Maybe } from "../types/Plans.types";
import { getMocks } from "../providers/Plan.mocks";
const log = console.info;

interface PlanContext extends PlansState {
  dispatch: React.Dispatch<Action>;
  loadPlans(): void;
}

const PlanContext = React.createContext<Maybe<PlanContext>>(null);

function usePlan() {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("PlanProvider cannot be found");
  }
  return context;
}

/* PlanProvider fetchs/mocks the plans and dispatch LOAD_PLANS */
const PlanProvider: React.FunctionComponent = props => {
  const [state, dispatch] = useReducer(planReducer, {
    plans: null,
    selectedPlan: null
  });

  // Query to Apollo
  const data = getMocks();
  useEffect(() => {
    if (data && data.plans && !state.plans) {
      dispatch({ type: "LOAD_PLANS", payload: data.plans });
    }
  });

  const loadPlans = useCallback(() => {
    // We can query again here
    log("Calling loadPlans");
    dispatch({ type: "LOAD_PLANS", payload: data.plans });
  }, [data]);

  const value = useMemo(() => ({ ...state, dispatch, loadPlans }), [
    state,
    loadPlans
  ]);

  return <PlanContext.Provider value={value} {...props} />;
};

export { usePlan };
export default PlanProvider;
