import z from "zod"

export const assignMeterAreaFormSchema = z.object({
  areaId: z.string().min(1, "Please select an area."),
  location: z.string().min(2, "Location is required."),
})

export type AssignMeterAreaFormValues = z.infer<typeof assignMeterAreaFormSchema>