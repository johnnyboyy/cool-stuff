import { Field as ArkField } from "@ark-ui/solid";

function Field({
	label,
	helperText,
	errorText,
	...props
}: ArkField.InputProps & {
	label: string;
	helperText?: string;
	errorText?: string;
}) {
	return (
		<ArkField.Root>
			<ArkField.Label>{label}</ArkField.Label>
			<ArkField.Input {...props} />
			<ArkField.HelperText>{helperText}</ArkField.HelperText>
			<ArkField.ErrorText>Testing</ArkField.ErrorText>
		</ArkField.Root>
	);
}

export { Field };
