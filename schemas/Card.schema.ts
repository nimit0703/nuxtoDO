import { z } from "zod";

export default z.object({
  title: z.string().trim().min(1, "Give your card a title").max(100),
  // HTML from the rich-text editor; null when never set
  description: z.string().max(10000).optional().nullable(),
  list: z.string(),
});
