function ValidationPropertyDecorator() {
	return (classRef: any, propertyName: string) => {

		let property = classRef[propertyName];
		console.log('ValidationPropertyDecorator', classRef, propertyName, property);

		const getter = () => property;

		const setter = (value: string) => {
			if (value === '') {
				console.log('Cannot be blank!');
				property = '1234';
			} else {
				property = value;
			}
		};

		Object.defineProperty(classRef, propertyName, { get: getter, set: setter });
	};
}
