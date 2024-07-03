"use client";

import { useAtom } from "jotai";
import { calcResult } from "../../atoms/calcResult";

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

const renderInput = InputContent.map((input) => (
	<FormInput
		key={input.id}
		identifier={input.key}
		label={input.label}
		id={input.id}
	/>
));

const handleHours = (e: React.FormEvent<HTMLFormElement>) => {
	e.preventDefault();
	console.log(e.currentTarget.elements);
};

export default function FormCalculator() {
	const [showResult] = useAtom(calcResult);
	return (
		<form className=" w-max-96" onSubmit={handleHours}>
			<FormInput key={1} identifier={1} label="Hora diária" id="based-hour" />
			{renderInput}
			{showResult && <div>oioi</div>}
			<button
				type="submit"
				className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
			>
				manda
			</button>
		</form>
	);
}
