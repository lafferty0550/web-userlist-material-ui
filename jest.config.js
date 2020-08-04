module.exports = {
    testEnvironment: 'jest-environment-node',
    moduleNameMapper: {
        "@actions/(.*)": "<rootDir>/src/front/actions/$1",
        "@init/(.*)": "<rootDir>/src/init/$1",
        "@api/(.*)": "<rootDir>/src/front/api/$1"
    }
};