function ValidationPropertyDecorator() {
	return (classRef: any, propertyName: string) => {

		let property = classRef[propertyName];

		const getter = () => property;

		const setter = (value: string) => {
			if (value === '') {
				property = '1234';
			} else {
				property = value;
			}
		};

		Object.defineProperty(classRef, propertyName, { get: getter, set: setter });
	};
}
