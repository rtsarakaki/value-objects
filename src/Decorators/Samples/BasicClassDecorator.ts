//The next functions are just and example of how to create decorators
function BasicClassDecorator(label: string) {
	return (construtor: any) => {
		console.log(`BasicClassDecorator : target ${label}`, construtor);
	};
}
