"use client";

import { useAtom } from "jotai";
import { useEffect, useState } from "react";

import { basedHour, timeToGoHome } from "../../atoms/calcResult";
import { useCalculateHour } from "../../hooks/calculate";
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
	const [basedHourValue] = useAtom(basedHour);
	const [basedInputFilled, setBasedInputFilled] = useState(
		basedHourValue !== "",
	);
	const [timeToGo] = useAtom(timeToGoHome);
	const { canCalculate, verifyBasedHour } = useCalculateHour();

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
			<h1>{timeToGo}</h1>
		</div>
	);
}
