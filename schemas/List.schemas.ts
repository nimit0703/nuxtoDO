import { z } from "zod";

export default z.object({
  name: z.string().trim().min(1, "Give your list a name").max(255),
  cards: z.array(z.string()).optional(),
  board: z.string(),
});
