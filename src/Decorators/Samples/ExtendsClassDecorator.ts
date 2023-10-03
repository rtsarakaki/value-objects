function ExtendsClassDecorator(value: string) {
	return (construtor: any): any => {
		return class extends construtor {
			InjectedProperty = value;
		};
	};
}
