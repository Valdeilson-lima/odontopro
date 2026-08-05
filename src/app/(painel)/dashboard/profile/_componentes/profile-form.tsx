import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ProfileFormValues {
  name: string | null;
  address?: string | null;
  phone?: string | null;
  status: boolean;
  timeZone: string | null;
}

export const profileSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  address: z.string().optional(),
  phone: z.string().optional(),
  status: z.boolean(),
  timeZone: z.string().min(1, "O fuso horário é obrigatório"),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export function useUserProfileForm({
  name,
  address,
  phone,
  status,
  timeZone,
}: ProfileFormValues) {
  return useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: name || "",
      address: address || "",
      phone: phone || "",
      status: status ?? true,
      timeZone: timeZone || "",
    },
  });
}
