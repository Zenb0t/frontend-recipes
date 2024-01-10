import { useFormikContext } from "formik";
import { Recipe } from "../types/recipe";
import { useEffect } from "react";


/**
 * Component that logs form errors to the console.
 * @returns {null} This component doesn't render anything.
 */
export function FormErrorsLogger(): null {
		const { errors } = useFormikContext<Recipe>();

		useEffect(() => {
			if (errors) console.log(errors);
		}, [errors]);

		return null;
};
