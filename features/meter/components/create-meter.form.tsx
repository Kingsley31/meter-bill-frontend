"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { Separator } from "@/components/ui/separator"
import { createMeterSchema, CreateMeterFormValues } from "../validations/create-meter.schema"
import { subMeterOperators } from "../data"

import PaginatedAsyncSelect, { LoadOptions, OptionType } from "@/components/paginated-async-select"
import { useCreateMeter } from "../hooks/use-create-meter.hook"
import { getErrorMessage } from "@/lib/utils"
import { displayError, displaySuccess } from "@/components/display-message"
import { MeterPurpose, MeterType, Operaor } from "@/shared/meter/enums"

type CreateMeterFormProps = {
    loadAreaOptions: LoadOptions;
    loadMeterOptions: LoadOptions;
}

export function CreateMeterForm({ loadAreaOptions, loadMeterOptions }: CreateMeterFormProps) {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    const [subMeterError, setSubMeterError] = useState<string | null>(null);
    const [areaName, setAreaName] = useState<string>("");

    const createMeterMutation = useCreateMeter();

    const form = useForm<CreateMeterFormValues>({
        resolver: zodResolver(createMeterSchema),
        defaultValues: {
            meterNumber: "",
            areaId: "",
            location: "",
            ctRating: 0,
            ctMultiplierFactor: 0,
            purpose: MeterPurpose.CONSUMER,
            type: MeterType.MEASUREMENT,
            calculationReferenceMeterId: "",
            hasMaxKwhReading: false,
            maxKwhReading: undefined,
            subMeters: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "subMeters",
    });

    const watchHasMaxKwh = form.watch("hasMaxKwhReading");
    const watchType = form.watch("type");

    const onSubmit: (values: CreateMeterFormValues) => Promise<void> = async (values) => {
        setSubMeterError(null)
        if (values.type === MeterType.DERIVED && (!values.subMeters || values.subMeters.length === 0)) {
            setSubMeterError("At least one sub meter is required.")
            return
        }
        createMeterMutation.mutate({...values, areaName}, {
            onSuccess: (data) => {
                displaySuccess("Meter created successfully", `Meter ${data.meterNumber} has been created.`);
                form.reset();
            },
            onError: (error: unknown) => {
                const message = getErrorMessage(error);
                displayError("Failed to create meter", message);
            }
        });
    }

    return (
        <Card className="max-w-5/6 mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl">Create Meter</CardTitle>
                <CardDescription>Fill in the details to register a new meter.</CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <CardContent className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <FormField
                                control={form.control}
                                name="meterNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Meter Number<span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter meter number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
								control={form.control}
								name="ctRating"
								render={({ field }) => (
									<FormItem>
										<FormLabel>CT Rating<span className="text-red-600">*</span></FormLabel>
										<FormControl>
											<Input type="number" placeholder="CT Rating" {...field} value={field.value ?? ""}/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="ctMultiplierFactor"
								render={({ field }) => (
									<FormItem>
										<FormLabel>CT Multiplier Factor<span className="text-red-600">*</span></FormLabel>
										<FormControl>
											<Input type="number" step="0.01" placeholder="CT Multiplier" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
                            <FormField
								control={form.control}
								name="purpose"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Purpose<span className="text-red-600">*</span></FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select purpose" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={MeterPurpose.CONSUMER}>{MeterPurpose.CONSUMER.toUpperCase()}</SelectItem>
                                                <SelectItem value={MeterPurpose.BULK}>{MeterPurpose.BULK.toUpperCase()}</SelectItem>
                                                <SelectItem value={MeterPurpose.AUDIT}>{MeterPurpose.AUDIT.toUpperCase()}</SelectItem>
                                            </SelectContent>
                                        </Select>
										<FormMessage />
									</FormItem>
								)}
							/>
                            <FormField
                                control={form.control}
                                name="hasMaxKwhReading"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col items-start gap-2">
                                        <FormLabel>Has Max kWh Reading?</FormLabel>
                                        <div className="flex w-full h-9 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs">
                                            <FormControl>
                                                <input
                                                    type="checkbox"
                                                    checked={field.value}
                                                    onChange={(e) => field.onChange(e.target.checked)}
                                                    className="mr-2"
                                                />
                                            </FormControl>
                                            <p>meter has max kwh reading</p>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {watchHasMaxKwh && (
                                <FormField
                                    control={form.control}
                                    name="maxKwhReading"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Max kWh Reading<span className="text-red-600">*</span></FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="Max kWh Reading" {...field} value={field.value ?? ""}/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location<span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter meter location" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="areaId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Area<span className="text-red-600">*</span></FormLabel>
                                         <FormControl>
                                            {isClient ? (
                                                <PaginatedAsyncSelect
                                                    loadOptions={loadAreaOptions}
                                                    setFormValue={(option: OptionType | null) => {
                                                        field.onChange(option?.value)
                                                        setAreaName(option?.label || "")
                                                    }}
                                                    placeholder="Select area"
                                                />
                                            ) : (
                                                <div className="h-10 bg-muted rounded" />
                                            )}
                                         </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
								control={form.control}
								name="type"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Type<span className="text-red-600">*</span></FormLabel>
										<Select onValueChange={field.onChange} value={field.value}>
											<FormControl>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Select type" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value={MeterType.DERIVED}>{MeterType.DERIVED.toUpperCase()}</SelectItem>
												<SelectItem value={MeterType.MEASUREMENT}>{MeterType.MEASUREMENT.toUpperCase()}</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
                            {watchType==MeterType.DERIVED && (
                                <FormField
                                    control={form.control}
                                    name="calculationReferenceMeterId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Calculation Reference Meter<span className="text-red-600">*</span></FormLabel>
                                            <FormControl>
                                                {isClient ? (
                                                    <PaginatedAsyncSelect
                                                        loadOptions={loadMeterOptions}
                                                        setFormValue={(option: OptionType | null) => {
                                                            field.onChange(option?.value)
                                                        }}
                                                        placeholder="Select reference meter"
                                                    />
                                                ) : (
                                                    <div className="h-10 bg-muted rounded" />
                                                )}
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </div>
                        {watchType==MeterType.DERIVED && (
                            <div className="mb-6">
                                <Separator className="mb-4"/>
                                <div className="flex items-center justify-between mb-6">
                                    <span className="font-medium">Sub Meters<span className="text-red-600">*</span></span>
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="outline"
                                        onClick={() => append({ subMeterId: "", operator: Operaor.ADD })}
                                    >
                                        Add Sub Meter
                                    </Button>
                                </div>
                                {fields.length === 0 && (
                                    <div className="text-sm text-muted-foreground">No sub meters added.</div>
                                )}
                                {subMeterError && (
                                    <div className="text-sm text-red-600 mb-2">{subMeterError}</div>
                                )}
                                {fields.map((fieldItem, idx) => (
                                    <div key={fieldItem.id} className="grid grid-cols-5 gap-6 mb-6 items-end justify-start">
                                        <FormField
                                            control={form.control}
                                            name={`subMeters.${idx}.subMeterId`}
                                            render={({ field }) => (
                                                <FormItem className="col-span-3">
                                                    <FormLabel>Sub Meter</FormLabel>
                                                    <FormControl>
                                                        {isClient ? (
                                                            <PaginatedAsyncSelect
                                                                loadOptions={loadMeterOptions}
                                                                setFormValue={(option: OptionType | null) => {
                                                                    field.onChange(option?.value)
                                                                }}
                                                                placeholder="Select sub meter"
                                                            />
                                                        ) : (
                                                            <div className="h-10 bg-muted rounded" />
                                                        )}
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`subMeters.${idx}.operator`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Operator</FormLabel>
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Operator" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {subMeterOperators.map((op) => (
                                                                <SelectItem key={op.value} value={op.value}>
                                                                    {op.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => remove(idx)}
                                        >
                                            &times;
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
					</CardContent>
                    <Separator />
					<CardFooter className="flex justify-between items-center pt-2">
                        <Button 
                            variant="outline" 
                            disabled={form.formState.isSubmitting || createMeterMutation.status === "pending"}
                            onClick={()=> form.reset()}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={form.formState.isSubmitting || createMeterMutation.status === "pending"}>
                            {form.formState.isSubmitting || createMeterMutation.status === "pending" ? "Creating..." : "Create Meter"}
                        </Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	)
}