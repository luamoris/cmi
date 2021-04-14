
const randomInt = (min, max) => {
	if(typeof min != 'number' ||typeof max != 'number') {
		throw Error('Invalid parameters.')
	}
	min = Math.ceil(min);
	max = Math.floor(max);
	const random = Math.random() * (max - min);
	return Math.floor(random) + min;
};

const lib = {
	randomInt,
};

module.exports = lib;
