export function stringToHours(value: string) {
	const hour = Number(value.split(":")[0]);
	const minutes = Number(value.split(":")[1]);
	return minutes <= 0 ? hour : hour + minutes / 60;
}

export function hoursToString(value: number) {
	const hour = Math.floor(value);
	const minutes = Math.round((value - hour) * 60);
	return `${hour}:${minutes}`;
}
