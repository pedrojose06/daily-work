import { useAtom } from "jotai";
import { useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import {
	basedHour,
	showResult,
	timeLeft,
	timeToGoHome,
} from "../atoms/calcResult";
import { decimalToHours } from "../utils/hours";

export const useCalculateHour = () => {
	const [basedHourValue, setBasedHourValue] = useAtom(basedHour);
	const [, setTimeLeft] = useAtom(timeLeft);
	const [, setTimeToGo] = useAtom(timeToGoHome);
	const [, setShowResult] = useAtom(showResult);
	const [, setBasedInputFilled] = useState(basedHourValue !== "");
	const { toast } = useToast();

	function clearInputs() {
		const inputs = Array.from(document.querySelectorAll("input"));
		const filteredInputs = inputs.filter(
			(input) => input.id !== "enter-hour" && input.id !== "based-hour",
		);

		for (const input of filteredInputs) {
			input.value = "";
		}
	}

	async function verifyInputHours(e: React.ChangeEvent<HTMLInputElement>) {
		const value = e.target.value;

		const inputs = Array.from(document.querySelectorAll("input"));
		const stopFor = inputs.findIndex((input) => input.id === e.target.id);

		if (stopFor === 0) clearInputs();

		for (let i = stopFor; i > 0; i--) {
			if (inputs[i].value === "00:00") break;
			if (inputs[i].value <= inputs[i - 1].value) {
				e.target.value = "";
				return toast({
					variant: "destructive",
					title: "Hora inválida",
					description: "Preencha com um horário maior que o anterior",
				});
			}
		}

		if (value === "00:00")
			toast({
				variant: "destructive",
				title: "Hora vazia",
				description: "Preencha com um horário maior que 00:00",
			});

		const hour = Number(value.split(":")[0]);
		const minutes = Number(value.split(":")[1]);

		if (hour > 24 || minutes > 60 || hour < 0 || minutes < 0)
			toast({
				variant: "destructive",
				title: "Hora inválida",
				description: "Preencha com um horário válido",
			});
	}

	const canCalculate = async (e: React.ChangeEvent<HTMLInputElement>) => {
		await verifyInputHours(e);
		const intBasedHour =
			Number(basedHourValue.split(":")[0]) +
			Number(basedHourValue.split(":")[1]) / 60;
		const inputs = Array.from(document.querySelectorAll("input"));
		const filteredElements = inputs.filter(
			(element) => element.id !== "based-hour",
		);
		const values = inputs.map((input) => input.value);
		const intTime = values.map((val) => {
			const hour = Number(val.split(":")[0]);
			const minutes = Number(val.split(":")[1]);
			return hour + minutes / 60;
		});

		const countInputs = filteredElements.filter((input) => input.value !== "");

		let time = 0;

		if (countInputs.length > 1) {
			for (let i = 0; i < intTime.length - 1; i = i + 2) {
				time = intBasedHour - (intTime[i + 1] - intTime[i]);
			}
			if (time > 0 && countInputs.length % 2 === 1) {
				setShowResult(0);
				setTimeLeft(decimalToHours(time));
			} else if (time === 0) {
				setShowResult(1);
				setTimeLeft(decimalToHours(0));
			} else if (time < 0) {
				setShowResult(2);
				setTimeLeft(decimalToHours(time * -1));
			}
		}

		if (filteredElements.every((input) => input.value !== "")) {
			const hour = intTime[intTime.length - 1] + time;

			setTimeToGo(decimalToHours(hour));
		}
	};

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

	return { canCalculate, verifyBasedHour, verifyInputHours };
};
