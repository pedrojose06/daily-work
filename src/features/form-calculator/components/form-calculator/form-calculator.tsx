"use client";

import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { basedHour, timeLeft, timeToGoHome } from "../../atoms/calcResult";
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
const showHour = atom(!!basedHour);

export default function FormCalculator() {
	const [basedHourValue, setBasedHourValue] = useAtom(basedHour);
	const [timeToGo, setTimeToGo] = useAtom(timeToGoHome);
	const [timeLeftToGo, setTimeLeftToGo] = useAtom(timeLeft);
	const [basedInputFilled, setBasedInputFilled] = useState(
		basedHourValue !== "",
	);
	const [showBasedHour, setShowBasedHour] = useAtom(showHour);
	const { verifyBasedHour } = useCalculateHour();

	const renderInput = InputContent.map((input) => (
		<FormInput
			key={input.id}
			identifier={input.key}
			label={input.label}
			disabled={!basedInputFilled}
			id={input.id}
		/>
	));

	const resetBasedHour = () => {
		setShowBasedHour(false);
		setBasedInputFilled(false);
		setBasedHourValue("");
		setTimeToGo("");
		setTimeLeftToGo("");

		const inputs = Array.from(document.querySelectorAll("input"));

		for (const input of inputs) {
			input.value = "";
		}
	};

	useEffect(() => {
		if (basedHourValue) setBasedInputFilled(true);
	}, [basedHourValue]);

	return (
		<div className="flex w-max-96 flex-col justify-center">
			{showBasedHour ? (
				<div className="flex items-center justify-center gap-4">
					<div>Horário base salvo: {basedHourValue}</div>
					<Button onClick={resetBasedHour}>Alterar</Button>
				</div>
			) : (
				<FormInput
					key={1}
					identifier={1}
					type="time"
					label="Hora diária"
					id="based-hour"
					onBlur={verifyBasedHour}
				/>
			)}
			{renderInput}

			{timeLeftToGo && timeToGo && (
				<h1 className="mt-4">
					Faltam {timeLeftToGo} para voce ir para casa, {timeToGo} já pode sair.
				</h1>
			)}
		</div>
	);
}
