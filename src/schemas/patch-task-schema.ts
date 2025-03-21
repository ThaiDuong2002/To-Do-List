import { z } from "zod";

const patchTaskScheme = z.object({
  status: z.enum(["Pending", "In Progress", "Completed"]),
});

export default patchTaskScheme;
