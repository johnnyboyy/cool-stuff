import { Field as ArkField } from "@ark-ui/solid";
import { createUniqueId } from "solid-js";
import { type JSX } from "solid-js";

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

function UncontrolledField({
	label,
	id,
	helperText,
	errorText,
	...props
}: Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "id"> & {
	label: string;
	id?: string;
	helperText?: string;
	errorText?: string;
}) {
	const labelToInputId = createUniqueId();

	return (
		<div id={id} data-error={errorText === undefined ? undefined : true}>
			<label for={labelToInputId}>{label}</label>
			<input {...props} id={labelToInputId} />
			<span>{helperText}</span>
			<span>{errorText}</span>
		</div>
	);
}

export { Field, UncontrolledField };
