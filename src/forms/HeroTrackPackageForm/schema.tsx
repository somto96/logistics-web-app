import * as yup from "yup";

export const HeroTrackPackageFormSchema = yup.object({
    trackingId: yup.string().required(),
});

export type HeroTrackPackageFormState = yup.InferType<typeof HeroTrackPackageFormSchema>;