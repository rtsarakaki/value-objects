export function ValidateEntity<T extends { new(...args: any[]): { initProp: (instance: any, value: any) => any; errors: any; }; }>(constructor: T) {
	return class extends constructor {
		constructor(...args: any[]) {
			super(...args);
			this.init();
		}

		init() {
			Object.getOwnPropertyNames(this)
				.filter(property => property !== 'errors')
				.forEach(property => this.initProp(this, this[property as keyof typeof this]));
		}

		validate() {
			const errors = this.errors;
			if (Object.keys(errors).length > 0) {
				throw new Error(JSON.stringify(errors));
			}
		}
	};
}
