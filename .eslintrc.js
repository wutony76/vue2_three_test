module.exports = {
    env: {
			browser: true,
			es6: true,
			node: true,
			// "es2021": true,
			// "commonjs": true
    },
		"globals": {
			"process": true
		}, 
    "extends": [
			'plugin:vue/essential',
			'eslint:recommended'
        // "plugin:vue/vue3-essential",
        // "standard-with-typescript"
    ],
    "overrides": [
    ],
    parserOptions: {
			// parser: 'babel-eslint',
			ecmaVersion: 12,
			sourceType: "module",
			allowImpotExportEverywhere: true, 
			ecmaFeatures: {
				"jsx": true,
				"module": true,
				"legacyDecorators": true
			}
    },
    "plugins": [
			"vue"
    ],
    "rules": {
			'vue/no-unused-components':'off',
			'no-unused-vars':'off',
			"vue/multi-word-component-names": "off"
			// 'vue/multi-word-component-names': [
			// 	'error',
			// 	{
			// 		ignores: ['micro'], //需要忽略的组件名
			// 	},
			// ]
    }
}
