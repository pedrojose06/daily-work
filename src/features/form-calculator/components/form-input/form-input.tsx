import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormInputProps = {
	id: string;
	label: string;
	disable?: boolean;
};

export default function FormInput({
	id,
	label,
	disable,
	...props
}: FormInputProps) {
	return (
		<div className="m-4 flex w-full flex-col">
			<Label htmlFor={id} className="text-gray-600">
				{label}
			</Label>
			<Input
				id={id}
				disabled={disable}
				type="time"
				className="max-w-24 rounded border border-gray-300 p-2 "
				{...props}
			/>
		</div>
	);
}
