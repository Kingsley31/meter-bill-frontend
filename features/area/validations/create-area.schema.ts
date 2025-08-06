import { z } from "zod"

export const createAreaSchema = z.object({
    areaName: z.string().min(1, "Area Name is required"),
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),
    address: z.string().min(1, "Address is required"),
});

export type CreateAreaFormValues = z.infer<typeof createAreaSchema>