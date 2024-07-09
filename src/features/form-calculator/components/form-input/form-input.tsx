import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { atom, useAtom } from "jotai";
import { useState } from "react";
import { basedHour, calcResult } from "../../atoms/calcResult";

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
	const [timeToGo, setTimeToGo] = useState("");
	const [basedHourValue, setBasedHourValue] = useAtom(basedHour);
	const intBasedHour =
		Number(basedHourValue.split(":")[0]) +
		Number(basedHourValue.split(":")[1]) / 60;

	function addHours(date: Date, hours: number) {
		const hoursToAdd = hours * 60 * 60 * 1000;
		date.setTime(date.getTime() + hoursToAdd);
		return date;
	}
	function decimalToHours(decimal: number) {
		const hours = Math.floor(decimal);
		const minutes = Math.round((decimal - hours) * 60);
		return `${hours}:${minutes < 10 ? "0" : ""}${minutes} `;
	}

	const canCalculate = async (e: React.FocusEvent<HTMLInputElement>) => {
		const inputs = Array.from(document.querySelectorAll("input"));
		const filteredElements = inputs.filter(
			(element) => element.id !== "based-hour",
		);
		const values = inputs.map((input) => input.value);

		if (filteredElements.every((input) => input.value !== "")) {
			const intTime = values.map((val) => {
				const hour = Number(val.split(":")[0]);
				const minutes = Number(val.split(":")[1]);
				return hour + minutes / 60;
			});
			let time = 0;
			for (let i = 1; i < intTime.length - 1; i = i + 2) {
				time = intBasedHour - (intTime[i + 1] - intTime[i]);
			}
			const hour = intTime[intTime.length - 1] + time;
			decimalToHours(hour);

			setTimeToGo(decimalToHours(hour));
			setShowResult(true);
		}
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
				onBlurCapture={canCalculate}
				className="max-w-24 rounded border border-gray-300 p-2 "
				{...props}
			/>
			<h1>{timeToGo}</h1>
		</div>
	);
}
