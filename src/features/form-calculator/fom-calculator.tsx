import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FormCalculator() {
	return (
		<form data-testid="teste-id">
			<Label htmlFor="based-hour">Insira a carga horária diária</Label>
			<Input id="based-hour" type="time" />
		</form>
	);
}
