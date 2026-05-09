import { useFieldContext } from "@niama/ui-react/hooks/form-context";
import { Textarea } from "@niama/ui-react/textarea";
import { Field } from "./field";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export default function TextareaField({ label }: TextareaFieldProps) {
	const { handleBlur, handleChange, name, state } = useFieldContext<string>();

	return (
		<Field label={label}>
			{(isInvalid) => (
				<Textarea
					aria-invalid={isInvalid}
					id={name}
					onBlur={handleBlur}
					onChange={(e) => handleChange(e.target.value)}
					placeholder={label}
					value={state.value}
				/>
			)}
		</Field>
	);
}
export type TextareaFieldProps = { label: string };
