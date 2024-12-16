export default {
	extends: ['@commitlint/config-conventional'],
	rules: {
		// typeCase: ['lower-case', 'camel-case', 'kebab-case', 'pascal-case', 'sentence-case', 'start-case'],
		// typeEmpty: [2, 'never'],
		// typeEnum: ['feat', 'fix', 'refactor', 'hotfix', 'test'],
		'type-enum': [
			2,
			'always',
			['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test'],
		],
	},
};
