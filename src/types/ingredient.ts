export interface Ingredient {
	_id?: string;
	name: string;
	measuringUnit: MeasuringUnit;
	amount: number; 
	costPerUnit?: number;
}

export enum MeasuringUnit {
	GRAM = "gram",
	OUNCE = "ounce",
	CUP = "cup",
	TABLESPOON = "tablespoon",
	TEASPOON = "teaspoon",
	PIECE = "piece",
}