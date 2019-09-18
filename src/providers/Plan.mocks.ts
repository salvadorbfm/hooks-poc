import { Plan } from "../types/Plans.types";

function getMocks() {
  const plans: Plan[] = [
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
  ];

  const newPlan: Plan = {
    id: 100,
    description: "It has survived not only five centuries"
  };

  return { plans, newPlan };
}

export { getMocks };
