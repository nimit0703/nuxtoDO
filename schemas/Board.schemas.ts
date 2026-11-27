import { z } from "zod";

export default z.object({
  name: z.string().trim().min(1, "Give your board a name").max(255),
  description: z.string().min(1).max(255).optional(),
  coverImage: z.string().url().max(500).optional().nullable(),
  lists: z.array(z.string()).optional(),
});
