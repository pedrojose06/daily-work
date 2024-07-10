import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCalculateHour } from "../../hooks/calculate";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	identifier: number;
	id: string;
	label: string;
}

export default function FormInput({
	id,
	identifier,
	label,
	...props
}: FormInputProps) {
	const { canCalculate, verifyInputHours } = useCalculateHour();

	return (
		<div className="mt-4 flex w-full flex-col items-center justify-center">
			<Label htmlFor={id} className="text-gray-600">
				{label}
			</Label>
			<Input
				id={id}
				type={props.type || "time"}
				key={identifier}
				onBlurCapture={(e) => canCalculate(e)}
				className="max-w-24 rounded border border-gray-300 p-2 "
				{...props}
			/>
		</div>
	);
}
