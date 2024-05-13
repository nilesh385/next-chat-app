import { useMutation } from "convex/react";
import React, { useState } from "react";

export const useMutationState = (mutatioToRun: any) => {
  const [pending, setPending] = useState(false);

  const mutationFN = useMutation(mutatioToRun);

  const mutate = (payload: any) => {
    setPending(true);

    return mutationFN(payload)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => setPending(false));
  };

  return { mutate, pending };
};
