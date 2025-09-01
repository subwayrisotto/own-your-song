import * as Yup from 'yup';

export const getFormSchema = (currentPlan) => [
  Yup.object({
    funnyStory: Yup.string()
      .min(5, "Funny story must be at least 5 characters long")
      .max(500, "Funny story cannot exceed 500 characters")
      .required("Funny story is required"),
    characterTraits: Yup.string()
      .min(5, "Character traits must be at least 5 characters long")
      .max(300, "Character traits cannot exceed 300 characters")
      .required("Character traits are required"),
    hobbies: Yup.string()
      .min(5, "Hobbies must be at least 5 characters long")
      .max(300, "Hobbies cannot exceed 300 characters")
      .required("Hobbies are required"),
  }),
  Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    confirmEmail: Yup.string()
      .email("Invalid email address")
      .oneOf([Yup.ref('email')], "Email addresses must match") // Ensures email and confirm email match
      .required("Please confirm your email address"),
    name: Yup.string()
      .min(3, "Name must be at least 3 characters long")
      .max(100, "Name cannot exceed 100 characters")
      .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
      .required("Name is required"),
    recipient: Yup.string()
      .min(3, "Recipient name must be at least 3 characters long")
      .max(100, "Recipient name cannot exceed 100 characters")
      .matches(/^[a-zA-Z\s]+$/, "Recipient name can only contain letters and spaces")
      .required("Recipient name is required"),
    recipientRole: Yup.string()
      .min(3, "Recipient role must be at least 3 characters long")
      .max(50, "Recipient role cannot exceed 50 characters")
      .required("Recipient role is required"),
  }),
  Yup.object({
    songMood: Yup.string()
      .min(3, "Song mood must be at least 3 characters long")
      .max(50, "Song mood cannot exceed 50 characters")
      .required("Song mood is required"),
    songStyle: Yup.string()
      .when([], {
        is: () => currentPlan === "gold" || currentPlan === "platinum",
        then: (schema) => schema.required("Song style is required for Gold/Platinum"),
        otherwise: (schema) => schema.notRequired(),
      }),
    songTempo: Yup.string()
      .min(3, "Song tempo must be at least 3 characters long")
      .max(50, "Song tempo cannot exceed 50 characters")
      .required("Song tempo is required"),
    instruments: Yup.string()
      .min(3, "Instruments must be at least 3 characters long")
      .max(100, "Instruments cannot exceed 100 characters")
      .required("Instruments are required"),
  }),
  Yup.object({
    story: Yup.string()
      .min(5, "Story must be at least 5 characters long")
      .when([], {
        is: () => currentPlan === "silver",
        then: (schema) => schema.max(50, "Story cannot exceed 50 characters for Silver plan"),
        otherwise: (schema) =>
          schema.when([], {
            is: () => currentPlan === "gold",
            then: (schema) => schema.max(100, "Story cannot exceed 100 characters for Gold plan"),
            otherwise: (schema) => schema.max(1000, "Story cannot exceed 1000 characters"),
          }),
      })
      .required("Story is required"),
    songLanguage: Yup.string()
    .min(3, "Song language must be at least 3 characters long")
    .max(50, "Song language cannot exceed 50 characters")
    .required("Song language is required"),
  })
];