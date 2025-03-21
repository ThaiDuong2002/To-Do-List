import { z } from "zod";

const createDependencyScheme = z.object({
  dependsOnTaskId: z.string().uuid(),
});

export default createDependencyScheme;
