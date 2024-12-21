export default {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'type-enum': [2, 'always', ['feat', 'fix', 'refactor', 'style']],
		'subject-case': [2, 'always', ['lower-case', 'camel-case', 'pascal-case', 'sentence-case', 'start-case']],
	},
};
