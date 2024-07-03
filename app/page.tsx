import dynamic from "next/dynamic";
import { Suspense } from "react";

const FormCalculator = dynamic(
	() =>
		import(
			"../src/features/form-calculator/components/form-calculator/form-calculator"
		),
	{
		loading: () => <p>Loading...</p>,
	},
);

export default function Home() {
	return (
		<Suspense fallback={<p>Loading...</p>}>
			<div className="flex h-lvh w-full items-center justify-center">
				<FormCalculator />
			</div>
		</Suspense>
	);
}
