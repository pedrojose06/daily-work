import { useAtom } from "jotai";
import { useState } from "react";

import { basedHour, calcResult, timeToGoHome } from "../atoms/calcResult";
import { decimalToHours } from "../utils/hours";

export const useCalculateHour = () => {
	const [, setShowResult] = useAtom(calcResult);
	const [, setTimeToGo] = useAtom(timeToGoHome);
	const [basedHourValue, setBasedHourValue] = useAtom(basedHour);
	const [, setBasedInputFilled] = useState(basedHourValue !== "");

	const canCalculate = async () => {
		const intBasedHour =
			Number(basedHourValue.split(":")[0]) +
			Number(basedHourValue.split(":")[1]) / 60;
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

	return { canCalculate, verifyBasedHour };
};
