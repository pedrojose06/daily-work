import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { stringToHours } from "@/src/utils/stringToHours";
import { atom, useAtom } from "jotai";
import { calcResult } from "../../atoms/calcResult";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	identifier: number;
	id: string;
	label: string;
}

const counter = atom(0);
const counter1 = atom(1);

export default function FormInput({
	id,
	identifier,
	label,
	...props
}: FormInputProps) {
	const [hourInput, setHourInput] = useAtom(counter1);
	const [lastHour, setLastHour] = useAtom(counter);
	const [, setShowResult] = useAtom(calcResult);

	const verifyLastHour = (hour: number) => {
		if (!!hour && lastHour < hour) return true;

		return false;
	};

	const verifyHourRange = (value: string) => {
		const hour = Number(value.split(":")[0]);
		const minutes = Number(value.split(":")[1]);

		if (hour > 24 || minutes > 60 || hour === 0 || minutes === 0) return false;

		return true;
	};

	const verifyHour = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		if (verifyLastHour(stringToHours(value)) && verifyHourRange(value)) {
			setShowResult(true);
			setLastHour(stringToHours(value));
			return setHourInput(hourInput + 1);
		}

		return setHourInput(hourInput);
	};

	return (
		<div className="m-4 flex w-full flex-col">
			<Label htmlFor={id} className="text-gray-600">
				{label}
			</Label>
			<Input
				id={id}
				disabled={hourInput !== identifier}
				type={props.type || "time"}
				onBlurCapture={verifyHour}
				className="max-w-24 rounded border border-gray-300 p-2 "
				{...props}
			/>
		</div>
	);
}
