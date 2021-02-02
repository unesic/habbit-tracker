export const hexToRgb = (hex: string) => {
	let c: any;
	c = hex.substring(1).split("");
	c = "0x" + c.join("");
	return [(c >> 16) & 255, (c >> 8) & 255, c & 255];
};

export const getContrast = (color: string) => {
	const [r, g, b] = hexToRgb(color);
	const brightness = Math.round((r * 299 + g * 587 + b * 114) / 1000);
	return brightness > 125;
};
