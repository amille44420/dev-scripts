## [2.1.5](https://github.com/amille44420/dev-scripts/compare/v2.1.4...v2.1.5) (2020-04-24)

## [2.1.4](https://github.com/amille44420/dev-scripts/compare/v2.1.3...v2.1.4) (2020-04-23)

## [2.1.3](https://github.com/amille44420/dev-scripts/compare/v2.1.2...v2.1.3) (2020-04-22)

## [2.1.2](https://github.com/amille44420/dev-scripts/compare/v2.1.1...v2.1.2) (2020-04-20)

## [2.1.1](https://github.com/amille44420/dev-scripts/compare/v2.1.0...v2.1.1) (2020-04-20)

# [2.1.0](https://github.com/amille44420/dev-scripts/compare/v2.0.17...v2.1.0) (2020-04-13)


### Features

* improve environment configuration ([327c1bb](https://github.com/amille44420/dev-scripts/commit/327c1bbd58986e500f4bc6396cdc8265b29e53c0))

## [2.0.17](https://github.com/amille44420/dev-scripts/compare/v2.0.16...v2.0.17) (2020-04-13)

## [2.0.16](https://github.com/amille44420/dev-scripts/compare/v2.0.15...v2.0.16) (2020-04-08)

## [2.0.15](https://github.com/amille44420/dev-scripts/compare/v2.0.14...v2.0.15) (2020-04-07)

## [2.0.14](https://github.com/amille44420/dev-scripts/compare/v2.0.13...v2.0.14) (2020-04-06)


### Bug Fixes

* fix invalid babel cache identifier ([1ba50c0](https://github.com/amille44420/dev-scripts/commit/1ba50c03d073f407a4dc35db7b6d26babf2745cf))

## [2.0.13](https://github.com/amille44420/dev-scripts/compare/v2.0.12...v2.0.13) (2020-04-02)

## [2.0.12](https://github.com/amille44420/dev-scripts/compare/v2.0.11...v2.0.12) (2020-03-30)

## [2.0.11](https://github.com/amille44420/dev-scripts/compare/v2.0.10...v2.0.11) (2020-03-30)

## [2.0.10](https://github.com/amille44420/dev-scripts/compare/v2.0.9...v2.0.10) (2020-03-26)

## [2.0.9](https://github.com/amille44420/dev-scripts/compare/v2.0.8...v2.0.9) (2020-03-25)

## [2.0.8](https://github.com/amille44420/dev-scripts/compare/v2.0.7...v2.0.8) (2020-03-25)

## [2.0.7](https://github.com/amille44420/dev-scripts/compare/v2.0.6...v2.0.7) (2020-03-24)

## [2.0.6](https://github.com/amille44420/dev-scripts/compare/v2.0.5...v2.0.6) (2020-03-23)

## [2.0.5](https://github.com/amille44420/dev-scripts/compare/v2.0.4...v2.0.5) (2020-03-23)

## [2.0.4](https://github.com/amille44420/dev-scripts/compare/v2.0.3...v2.0.4) (2020-03-16)

## [2.0.3](https://github.com/amille44420/dev-scripts/compare/v2.0.2...v2.0.3) (2020-03-09)

## [2.0.2](https://github.com/amille44420/dev-scripts/compare/v2.0.1...v2.0.2) (2020-03-06)

## [2.0.1](https://github.com/amille44420/dev-scripts/compare/v2.0.0...v2.0.1) (2020-03-02)

# [2.0.0](https://github.com/amille44420/dev-scripts/compare/v1.1.6...v2.0.0) (2020-03-02)


### Bug Fixes

* remove invalid plugins from babel loader for react production build ([7ad69d8](https://github.com/amille44420/dev-scripts/commit/7ad69d80c84194b499c461a2bc57488c69329d09))
* **WebpackPackagePlugin:** fix mistake in checks ([23cc740](https://github.com/amille44420/dev-scripts/commit/23cc7403f0905fdee809dac504ebccec1eeba434))
* fix hooks and start scripts ([d0f6283](https://github.com/amille44420/dev-scripts/commit/d0f6283dfa234c64e1fb01efc40917d9657a4349))
* pass options to getStyleLoaders ([d04eacc](https://github.com/amille44420/dev-scripts/commit/d04eacc9ce5c7da970bb48900b8cf279f1775759))


### Features

* create build directory using recursive option ([558085b](https://github.com/amille44420/dev-scripts/commit/558085b8ea69f8c757c848c9ef622c87fcee8f2e))
* **WebpackPackagePlugin:** customize stringify to get a cleaner package file ([943c4ae](https://github.com/amille44420/dev-scripts/commit/943c4aee65771402db300e15805fffa444dd78b3))
* add custom webpack plugin WebpackPackagePlugin ([f502b62](https://github.com/amille44420/dev-scripts/commit/f502b62e183d90095dfd5115abd19903cf35c166))
* allow experimental usage of react-refresh for HMR ([043ab8d](https://github.com/amille44420/dev-scripts/commit/043ab8d3cdfe747f835234948b8d132fc424c295))
* move every env settings into the option step ([7d7b03c](https://github.com/amille44420/dev-scripts/commit/7d7b03c69a7567b3df789bbbb40d666125387f34))
* provide hook system to have dynamic settings on runtime ([8f9d405](https://github.com/amille44420/dev-scripts/commit/8f9d40577068d83da112ab5d92ac22d18f35a6da))
* stop using default export for node hmr ([fde14a8](https://github.com/amille44420/dev-scripts/commit/fde14a869c3bccabeeb6f6ef5f55aa6b4c5756f6))


### BREAKING CHANGES

* the server entry point must now use module.exports to return the server instance instance of default export
* the whole customization has been updated to hooks

## [1.1.6](https://github.com/amille44420/dev-scripts/compare/v1.1.5...v1.1.6) (2020-02-19)

## [1.1.5](https://github.com/amille44420/dev-scripts/compare/v1.1.4...v1.1.5) (2020-02-12)

## [1.1.4](https://github.com/amille44420/dev-scripts/compare/v1.1.3...v1.1.4) (2020-02-11)

## [1.1.3](https://github.com/amille44420/dev-scripts/compare/v1.1.2...v1.1.3) (2020-02-07)

## [1.1.2](https://github.com/amille44420/dev-scripts/compare/v1.1.1...v1.1.2) (2020-02-05)

## [1.1.1](https://github.com/amille44420/dev-scripts/compare/v1.1.0...v1.1.1) (2020-02-01)

# [1.1.0](https://github.com/amille44420/dev-scripts/compare/v1.0.1...v1.1.0) (2020-01-26)


### Features

* **webpack-node:** add BannerPlugin to webpack configuration ([5063fd9](https://github.com/amille44420/dev-scripts/commit/5063fd9ac3ef07143d18af870ef43046c8019c5d))

## [1.0.1](https://github.com/amille44420/dev-scripts/compare/v1.0.0...v1.0.1) (2020-01-24)


### Bug Fixes

* **webpack-browser:** remove undefined rules ([0e5ddf6](https://github.com/amille44420/dev-scripts/commit/0e5ddf618a5a5d0d08a4e428a8f4d2f0512ec2f8))

# 1.0.0 (2020-01-24)


### Bug Fixes

* **build:** remove undefined plugin on production build for node ([dc2aa5b](https://github.com/amille44420/dev-scripts/commit/dc2aa5b8ccafeae71d667f2e11786271bc399901))
* **webpack-node:** use package.json for node externals ([1158870](https://github.com/amille44420/dev-scripts/commit/1158870a817675d6927969b3eee3984b9d88064f))


### Features

* initial features ([24ca131](https://github.com/amille44420/dev-scripts/commit/24ca131854cf4e8231e0fd90372b564d245c60e6))
* provide an entry point to override webpack ([bcfb7c7](https://github.com/amille44420/dev-scripts/commit/bcfb7c7fc2d0a4bb0b41d7fa3ad52df499c3a4ea))

# [1.0.0-next.2](https://github.com/amille44420/dev-scripts/compare/v1.0.0-next.1...v1.0.0-next.2) (2020-01-24)


### Bug Fixes

* **build:** remove undefined plugin on production build for node ([dc2aa5b](https://github.com/amille44420/dev-scripts/commit/dc2aa5b8ccafeae71d667f2e11786271bc399901))
* **webpack-node:** use package.json for node externals ([1158870](https://github.com/amille44420/dev-scripts/commit/1158870a817675d6927969b3eee3984b9d88064f))


### Features

* provide an entry point to override webpack ([bcfb7c7](https://github.com/amille44420/dev-scripts/commit/bcfb7c7fc2d0a4bb0b41d7fa3ad52df499c3a4ea))

# 1.0.0-next.1 (2020-01-24)


### Features

* initial features ([24ca131](https://github.com/amille44420/dev-scripts/commit/24ca131854cf4e8231e0fd90372b564d245c60e6))
