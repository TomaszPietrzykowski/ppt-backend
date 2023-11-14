const extractSnippet = (html, cap) => {
	let stringContent = html.replace(/<[^>]+>/g, ' ');
	if (cap && cap > 10 && stringContent.length > cap) {
		stringContent = stringContent.slice(0, cap - 6) + '(...)';
	}
	return stringContent;
};

module.exports = extractSnippet;
