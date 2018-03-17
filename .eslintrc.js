module.exports = {
  "env": {
    "browser": true,
  },
  "extends": "airbnb-base",
  "rules": {
    "no-use-before-define": ["error", { "functions": false, "classes": true }],
    "func-names": ["error", "as-needed"],
    "import/no-extraneous-dependencies": ["error", {"devDependencies": ["**/*webpack*.js", "**/*.config.js"], "optionalDependencies": false, "peerDependencies": false}]
  }
};