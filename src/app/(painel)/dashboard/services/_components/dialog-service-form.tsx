import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "O nome do serviço é obrigatório"),
  description: z.string().optional(),
  price: z.string().min(0, "O preço deve ser maior ou igual a zero"),
  hours: z.string().optional(),
  minutes: z.string().optional(),
});

interface UseDialogServiceFormProps {
  initialValues?: {
    name: string;
    description?: string;
    price: number;
    hours: string;
    minutes: string;
  };
}

export type DialogServiceFormData = z.infer<typeof formSchema>;

export function useDialogServiceForm() {
  return useForm<DialogServiceFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      hours: "",
      minutes: "",
    },
  });
}
