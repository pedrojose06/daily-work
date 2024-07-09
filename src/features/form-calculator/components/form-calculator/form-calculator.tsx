"use client";

import { useAtom } from "jotai";
import { useEffect, useState } from "react";

import { basedHour, calcResult } from "../../atoms/calcResult";
import FormInput from "../form-input/form-input";

const InputContent = [
	{
		label: "Horário de entrada",
		id: "enter-hour",
		key: 2,
	},
	{
		label: "1 pausa",
		id: "pause-hour",
		key: 3,
	},
	{
		label: "1 retorno",
		id: "return-hour",
		key: 4,
	},
];

export default function FormCalculator() {
	const [showResult] = useAtom(calcResult);
	const [basedHourValue, setBasedHourValue] = useAtom(basedHour);
	const [basedInputFilled, setBasedInputFilled] = useState(
		basedHourValue !== "",
	);

	const verifyBasedHour = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (value === "" || value === "00:00") return setBasedInputFilled(false);

		const hour = Number(value.split(":")[0]);
		const minutes = Number(value.split(":")[1]);

		if (hour > 24 || minutes > 60 || hour < 0 || minutes < 0)
			return setBasedInputFilled(false);
		setBasedHourValue(value);
		return setBasedInputFilled(true);
	};

	const renderInput = InputContent.map((input) => (
		<FormInput
			key={input.id}
			identifier={input.key}
			label={input.label}
			disabled={!basedInputFilled}
			id={input.id}
		/>
	));
	useEffect(() => {
		if (basedHourValue) setBasedInputFilled(true);
	}, [basedHourValue]);

	return (
		<div className=" w-max-96">
			<FormInput
				key={1}
				identifier={1}
				type="time"
				label="Hora diária"
				id="based-hour"
				onBlur={verifyBasedHour}
			/>
			{!!basedHourValue && <div>Horário base salvo :{basedHourValue}</div>}
			{renderInput}
		</div>
	);
}
