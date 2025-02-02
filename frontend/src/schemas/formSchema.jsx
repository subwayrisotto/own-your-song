import { z } from 'zod';

// Full form schema
export const formSchema = z.object({
  funnyStory: z.string().min(5, { message: "Funny story must be at least 5 characters long" }),
  characterTraits: z.string().min(5, { message: "Character traits must be at least 5 characters long" }),
  hobbies: z.string().min(5, { message: "Hobbies must be at least 5 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
  recipient: z.string().min(3, { message: "Recipient name must be at least 3 characters long" }),
  recipientRole: z.string().min(3, { message: "Recipient role must be at least 3 characters long" }),
  songMood: z.string().min(3, { message: "Song mood must be at least 3 characters long" }),
  songStyle: z.string().min(3, { message: "Song style must be at least 3 characters long" }),
  songTempo: z.string().min(3, { message: "Song tempo must be at least 3 characters long" }),
  instruments: z.string().min(3, { message: "Instruments must be at least 3 characters long" }),
  story: z.string().min(5, { message: "Story must be at least 5 characters long" })
});

// You can still pick the specific subset for each form step:
export const formSchemaStep1 = formSchema.pick({
  funnyStory: true,
  characterTraits: true,
  hobbies: true
});
