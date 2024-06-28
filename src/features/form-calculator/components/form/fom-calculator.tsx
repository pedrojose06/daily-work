"use client";

import { useState } from "react";

import FormInput from "../form-input/form-input";

export default function FormCalculator() {
	const [hour, setHour] = useState(true);

	const verifyHour = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const hour = Number(value.split(":")[0]);
		const minutes = Number(value.split(":")[1]);

		if (hour > 24 || minutes > 60) {
			alert("Hora inválida");
			setHour(true);
		} else {
			setHour(false);
		}
	};

	return (
		<div
			className="flex h-lvh w-full items-center justify-center"
			data-testid="teste-id"
		>
			<div className=" w-max-96">
				<FormInput disable={!hour} label="Hora diária" id="based-hour" />
				<FormInput disable={hour} label="Horário de entrada" id="enter-hour" />
				<FormInput disable={hour} label="Horário de pausa" id="pause-hour" />
				<FormInput disable={hour} label="Horário de retorno" id="return-hour" />
			</div>
		</div>
	);
}
