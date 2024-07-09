export function decimalToHours(decimal: number) {
	const hours = Math.floor(decimal);
	const minutes = Math.round((decimal - hours) * 60);
	return `${hours}:${minutes < 10 ? "0" : ""}${minutes} `;
}
