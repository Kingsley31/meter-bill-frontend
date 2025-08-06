"use client"
import PaginatedAsyncSelect, { LoadOptions } from "@/components/paginated-async-select";
import { ICountry, IState } from "country-state-city"
import { useEffect, useState } from "react";
import { CreateAreaFormValues, createAreaSchema } from "../validations/create-area.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateArea } from "../hooks/use-create-area.hook";
import { displayError, displaySuccess } from "@/components/display-message";
import { getErrorMessage } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CountryOption } from "@/hooks/use-country-options.hook";
import { StateOption } from "@/hooks/use-state-options.hook copy";
import { CityOption } from "@/hooks/use-cities-options.hook";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";


export type CreateAreaFormProps = {
    loadCountryOptions: LoadOptions<CountryOption>; 
    loadStateOptions: LoadOptions<StateOption>;
    loadCityOptions: LoadOptions<CityOption>;
    currentCountryOption: ICountry | undefined;
    onCountryChange: (country: ICountry | undefined) => void;
    currentStateOption: IState | undefined;
    onStateChange: (state: IState | undefined) => void;
}
export function CreateAreaForm({loadCountryOptions, loadStateOptions, loadCityOptions, currentCountryOption, currentStateOption,onCountryChange,onStateChange}: CreateAreaFormProps) {
    const [isClient, setIsClient] = useState(false);
        useEffect(() => {
            setIsClient(true);
        }, []);


        const createAreaMutation = useCreateArea();
        const form = useForm<CreateAreaFormValues>({
                resolver: zodResolver(createAreaSchema),
                defaultValues: {
                    areaName: "",
                    country: currentCountryOption ? currentCountryOption.name : "",
                    state: currentStateOption ? currentStateOption.name : "",
                    city: "",
                    address: "",
                },
            });

        const onSubmit: (values: CreateAreaFormValues) => Promise<void> = async (values) => {
                createAreaMutation.mutate({...values}, {
                    onSuccess: (data) => {
                        displaySuccess("Area created successfully", `Area ${data.areaName} has been created.`);
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
                        <CardTitle className="text-2xl">Create Area</CardTitle>
                        <CardDescription>Fill in the details to create a new area.</CardDescription>
                    </CardHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <CardContent className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <FormField
                                        control={form.control}
                                        name="areaName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Area Name<span className="text-red-600">*</span></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter area name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="country"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Country<span className="text-red-600">*</span></FormLabel>
                                                 <FormControl>
                                                    {isClient ? (
                                                        <PaginatedAsyncSelect<CountryOption>
                                                            {...field}
                                                            loadOptions={loadCountryOptions}
                                                            {...(currentCountryOption && { defaultValue:{label: currentCountryOption.name,value: currentCountryOption.name,country: currentCountryOption} })}
                                                            setFormValue={(option: CountryOption | null) => {
                                                                field.onChange(option?.value)
                                                                onCountryChange(option?.country)
                                                            }}
                                                            placeholder="Select country"
                                                            name="country"
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
                                        name="state"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>State<span className="text-red-600">*</span></FormLabel>
                                                 <FormControl>
                                                    {isClient ? (
                                                        <PaginatedAsyncSelect<StateOption>
                                                            {...field}
                                                            loadOptions={loadStateOptions}
                                                            {...(currentStateOption && { defaultValue:{label: currentStateOption.name,value: currentStateOption.name,state: currentStateOption} })}
                                                            setFormValue={(option: StateOption | null) => {
                                                                field.onChange(option?.value)
                                                                onStateChange(option?.state)
                                                            }}
                                                            placeholder="Select state"
                                                            clearCacheOnMenuClose
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
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>City<span className="text-red-600">*</span></FormLabel>
                                                 <FormControl>
                                                    {isClient ? (
                                                        <PaginatedAsyncSelect<CityOption>
                                                            {...field}
                                                            loadOptions={loadCityOptions}
                                                            setFormValue={(option: CityOption | null) => {
                                                                field.onChange(option?.value)
                                                            }}
                                                            placeholder="Select city"
                                                            clearCacheOnMenuClose
                                                        />
                                                    ) : (
                                                        <div className="h-10 bg-muted rounded" />
                                                    )}
                                                 </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Address<span className="text-red-600">*</span></FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Enter area address" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                            <Separator />
                            <CardFooter className="flex justify-between items-center pt-2">
                                <Button 
                                    variant="outline" 
                                    disabled={form.formState.isSubmitting || createAreaMutation.status === "pending"}
                                    onClick={()=> form.reset()}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={form.formState.isSubmitting || createAreaMutation.status === "pending"}>
                                    {form.formState.isSubmitting || createAreaMutation.status === "pending" ? "Creating..." : "Create Area"}
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                </Card>
            )
}