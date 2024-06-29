import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import FormInput from "./form-input";

describe("FormInput", () => {
	test("renders the label and input element", () => {
		const id = "input-id";
		const label = "Input Label";
		const disable = false;

		render(<FormInput id={id} label={label} disable={disable} />);

		const labelElement = screen.getByText(label);

		expect(labelElement).toBeDefined();
	});
});
