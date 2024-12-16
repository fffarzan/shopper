export default {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'type-case': [2, 'always', ['upper-case', 'snake-case']],
		'type-enum': [2, 'always', ['feat', 'fix', 'refactor', 'style', 'test']],
	},
};
