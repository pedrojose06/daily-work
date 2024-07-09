import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { atom, useAtom } from "jotai";
import { useCalculateHour } from "../../hooks/calculate";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	identifier: number;
	id: string;
	label: string;
}

const counter = atom(1);

export default function FormInput({
	id,
	identifier,
	label,
	...props
}: FormInputProps) {
	const [hourInput] = useAtom(counter);
	const { canCalculate } = useCalculateHour();

	return (
		<div className="m-4 flex w-full flex-col">
			<Label htmlFor={id} className="text-gray-600">
				{label}
			</Label>
			<Input
				id={id}
				disabled={hourInput !== identifier}
				type={props.type || "time"}
				onBlurCapture={canCalculate}
				className="max-w-24 rounded border border-gray-300 p-2 "
				{...props}
			/>
		</div>
	);
}
