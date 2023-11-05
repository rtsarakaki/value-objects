export type AttributesEnforcement<T extends Record<string, any>> = {
	[Property in keyof T as `${'_'}${Property & string}`]: any;
};