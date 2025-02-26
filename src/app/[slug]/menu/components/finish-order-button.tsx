"use client";

import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { isValidCpf } from "@/helpers/cpf";
import { useForm } from "react-hook-form";

const formSchema = z.object({
	name: z.string().trim().min(1, { message: "O Nome é obrigatório" }),
	cpf: z
		.string()
		.trim()
		.min(1, { message: "O CPF é obrigatório" })
		.refine((value) => isValidCpf(value), { message: "CPF inválido" }),
});

type FormSchema = z.infer<typeof formSchema>;

const FinishOrderButton = () => {
	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			cpf: "",
		},
	});

	const onSubmit = (data: FormSchema) => {
		console.log({ data });
	};

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button className="w-full rounded-full">Finalizar pedido</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Finalizar Pedido</DrawerTitle>
					<DrawerDescription>Insira suas informações abaixo para finalizar o seu pedido.</DrawerDescription>
				</DrawerHeader>

				<div className="p-5">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Seu nome</FormLabel>
										<FormControl>
											<Input placeholder="Digite seu nome..." {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="cpf"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Seu CPF</FormLabel>
										<FormControl>
											<Input placeholder="Digite seu CPF..." {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<DrawerFooter>
								<Button type="submit">Submit</Button>
								<DrawerClose>
									<Button variant="outline">Cancel</Button>
								</DrawerClose>
							</DrawerFooter>
						</form>
					</Form>
				</div>
			</DrawerContent>
		</Drawer>
	);
};

export default FinishOrderButton;
