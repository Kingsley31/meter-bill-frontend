import { MeterPurpose, MeterType, Operaor } from "@/shared/meter/enums"
import { z } from "zod"

export const createMeterSchema = z.object({
    meterNumber: z.string().min(1, "Meter number is required"),
    location: z.string().min(1, "Location number is required"),
    areaId: z.string().min(1, "Area is required"),
    ctRating: z.coerce.number().min(1, "CT Rating is required"),
    ctMultiplierFactor: z.coerce.number().min(1, "CT Multiplier is required"),
    purpose: z.enum([MeterPurpose.CONSUMER, MeterPurpose.BULK,MeterPurpose.AUDIT]),
    type: z.enum([MeterType.DERIVED, MeterType.MEASUREMENT]),
    calculationReferenceMeterId: z.string().optional(),
    hasMaxKwhReading: z.boolean(),
    maxKwhReading: z.coerce.number().optional(),
    subMeters: z
        .array(
            z.object({
                subMeterId: z.string().min(1, "Sub Meter is required"),
                operator: z.enum([Operaor.ADD, Operaor.MINUS]),
            })
        )
        .optional(),
}).superRefine((data, ctx) => {
       if (data.hasMaxKwhReading) {
            if (typeof data.maxKwhReading !== "number" || isNaN(data.maxKwhReading)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Max kWh Reading is required",
                    path: ["maxKwhReading"],
                })
            }
        }
        // calculationReferenceMeterId and subMeters required if type is DERIVED
        if (data.type === MeterType.DERIVED) {
            if (!data.calculationReferenceMeterId || data.calculationReferenceMeterId === "") {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Reference Meter is required",
                    path: ["calculationReferenceMeterId"],
                })
            }
            // if (!data.subMeters || data.subMeters.length === 0) {
            //     ctx.addIssue({
            //         code: z.ZodIssueCode.custom,
            //         message: "At least one sub meter is required",
            //         path: ["subMeters"],
            //     })
            // }
        }
})

export type CreateMeterFormValues = z.infer<typeof createMeterSchema>