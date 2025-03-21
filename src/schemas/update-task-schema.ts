import { z } from "zod";

const updateTaskScheme = z.object({
  title: z.string().min(5).max(255).optional(),
  description: z.string().optional(),
  dueDate: z
    .string()
    .regex(
      /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
      "Invalid date format"
    )
    .refine((date) => {
      const parsedDate = new Date(date);
      return parsedDate.toISOString().slice(0, 10) === date;
    }, "Invalid date")
    .optional(),
  priority: z.enum(["Low", "Medium", "High"]).optional(),
  status: z.enum(["Pending", "In Progress", "Completed"]).optional(),
});

export default updateTaskScheme;
