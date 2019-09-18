import React, {
  useContext,
  useEffect,
  useReducer,
  useMemo,
  useCallback
} from "react";
import planReducer, { Action, PlansState } from "./Plan.reducer";
import { Maybe } from "../types/Plans.types";

const log = console.info;

const data = {
  plans: [
    {
      id: 1,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
      id: 2,
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
    },
    {
      id: 3,
      description:
        "When an unknown printer took a galley of type and scrambled it to make a type specimen book"
    },
    {
      id: 4,
      description: "It has survived not only five centuries"
    }
  ]
};

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

  const value = useMemo(() => ({ ...state, dispatch, loadPlans }), [state]);

  return <PlanContext.Provider value={value} {...props} />;
};

export { usePlan };
export default PlanProvider;
