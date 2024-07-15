"use client";

import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
	basedHour,
	showResult,
	timeLeft,
	timeToGoHome,
} from "../../atoms/calcResult";
import { useCalculateHour } from "../../hooks/calculate";
import FormInput from "../form-input/form-input";

const InputContent = [
	{
		label: "Entrada",
		id: "enter-hour",
		key: 2,
	},
	{
		label: "1° pausa",
		id: "pause-hour",
		key: 3,
	},
	{
		label: "1° retorno",
		id: "return-hour",
		key: 4,
	},
];

const showHour = atom(basedHour === atom(""));

export default function FormCalculator() {
	const [basedHourValue, setBasedHourValue] = useAtom(basedHour);
	const [timeToGo, setTimeToGo] = useAtom(timeToGoHome);
	const [timeLeftToGo, setTimeLeftToGo] = useAtom(timeLeft);
	const [showBasedHour, setShowBasedHour] = useAtom(showHour);
	const [showResultResponse, setShowResultResponse] = useAtom(showResult);
	const [basedInputFilled, setBasedInputFilled] = useState(
		basedHourValue !== "",
	);
	const { verifyBasedHour } = useCalculateHour();
	const { toast } = useToast();

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
		setShowResultResponse(0);
		const inputs = Array.from(document.querySelectorAll("input"));

		for (const input of inputs) {
			input.value = "";
		}
	};

	useEffect(() => {
		if (basedHourValue) {
			setBasedInputFilled(true);
			setShowBasedHour(true);
		}
	}, [basedHourValue, setShowBasedHour]);

	return (
		<div className="flex w-max-96 flex-col justify-center">
			{showBasedHour ? (
				<div className="flex items-center justify-center gap-4">
					<div>Carga horária: {basedHourValue}</div>
					<Button onClick={resetBasedHour}>Alterar</Button>
				</div>
			) : (
				<FormInput
					key={1}
					identifier={1}
					type="time"
					label="Carga horária"
					id="based-hour"
					onBlur={verifyBasedHour}
				/>
			)}

			{renderInput}

			<h1 className="mt-4 flex justify-center">
				{timeLeftToGo && timeToGo && showResultResponse === 0 && (
					<span className="text-center">
						Faltam {timeLeftToGo} para você ir para casa, {timeToGo} pode sair.
					</span>
				)}
				{showResultResponse === 1 && (
					<span className="text-center">Você completou sua carga horária</span>
				)}
				{showResultResponse === 2 && (
					<span className="text-center">
						Você fez {timeLeftToGo} horas extras
					</span>
				)}
				{showResultResponse === 3 && (
					<span className="text-center">
						Você ficará devendo {timeLeftToGo} indo embora às 00H:00
					</span>
				)}
			</h1>
		</div>
	);
}
