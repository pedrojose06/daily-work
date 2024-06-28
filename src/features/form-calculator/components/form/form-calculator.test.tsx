import { render } from "@testing-library/react"; // Assuming you're using @testing-library/react
import { expect, test } from "vitest";
import FormCalculator from "./fom-calculator";

test("render FormCalculator", () => {
	const getByText = render(<FormCalculator />);
	const teste = getByText.getByText("Hora diária");
	expect(teste).toBeDefined();
});
