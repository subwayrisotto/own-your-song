import * as yup from "yup";

// Full form schema
export const formSchema = [
  yup.object({
    funnyStory: yup.string().min(5, { message: "Funny story must be at least 5 characters long" }),
    characterTraits: yup.string().min(5, { message: "Character traits must be at least 5 characters long" }),
    hobbies: yup.string().min(5, { message: "Hobbies must be at least 5 characters long" }),
  }).required(),
  yup.object({
    email: yup.string().email({ message: "Invalid email address" }),
    name: yup.string().min(3, { message: "Name must be at least 3 characters long" }),
    recipient: yup.string().min(3, { message: "Recipient name must be at least 3 characters long" }),
    recipientRole: yup.string().min(3, { message: "Recipient role must be at least 3 characters long" }),
  }).required(),
  yup.object({
    songMood: yup.string().min(3, { message: "Song mood must be at least 3 characters long" }),
    songStyle: yup.string().min(3, { message: "Song style must be at least 3 characters long" }),
    songTempo: yup.string().min(3, { message: "Song tempo must be at least 3 characters long" }),
    instruments: yup.string().min(3, { message: "Instruments must be at least 3 characters long" }),
  }).required(),
  yup.object({
    story: yup.string().min(5, { message: "Story must be at least 5 characters long" })
  }).required()
];