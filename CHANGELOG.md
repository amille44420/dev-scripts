# [2.0.0-next.10](https://github.com/amille44420/dev-scripts/compare/v2.0.0-next.9...v2.0.0-next.10) (2020-02-29)


### Bug Fixes

* remove invalid plugins from babel loader for react production build ([0c65943](https://github.com/amille44420/dev-scripts/commit/0c65943770d0a96f586a3bafe601b0eb9a8e438d))

# [2.0.0-next.9](https://github.com/amille44420/dev-scripts/compare/v2.0.0-next.8...v2.0.0-next.9) (2020-02-29)


### Features

* create build directory using recursive option ([c5999d4](https://github.com/amille44420/dev-scripts/commit/c5999d4418621b893a6321fa682132b6f04c3135))

# [2.0.0-next.8](https://github.com/amille44420/dev-scripts/compare/v2.0.0-next.7...v2.0.0-next.8) (2020-02-29)


### Features

* **WebpackPackagePlugin:** customize stringify to get a cleaner package file ([7cd15c9](https://github.com/amille44420/dev-scripts/commit/7cd15c9e80b386c72d03227c576e246fb5228d66))

# [2.0.0-next.7](https://github.com/amille44420/dev-scripts/compare/v2.0.0-next.6...v2.0.0-next.7) (2020-02-29)


### Bug Fixes

* **WebpackPackagePlugin:** fix mistake in checks ([fc8c062](https://github.com/amille44420/dev-scripts/commit/fc8c062ac91729bc5c9d39cd6a6ce9f724c3e6db))

# [2.0.0-next.6](https://github.com/amille44420/dev-scripts/compare/v2.0.0-next.5...v2.0.0-next.6) (2020-02-28)


### Features

* add custom webpack plugin WebpackPackagePlugin ([02b08d4](https://github.com/amille44420/dev-scripts/commit/02b08d421548a90daca1c9303576144887c29e39))
* stop using default export for node hmr ([76d2250](https://github.com/amille44420/dev-scripts/commit/76d225071fec54b77a8d3a86f69c86884d2e5f63))


### BREAKING CHANGES

* the server entry point must now use module.exports to return the server instance instance of default export

# [2.0.0-next.5](https://github.com/amille44420/dev-scripts/compare/v2.0.0-next.4...v2.0.0-next.5) (2020-02-20)


### Features

* allow experimental usage of react-refresh for HMR ([e3d587a](https://github.com/amille44420/dev-scripts/commit/e3d587ad1dc4f210792185f23aa0d1a3887909b8))

# [2.0.0-next.4](https://github.com/amille44420/dev-scripts/compare/v2.0.0-next.3...v2.0.0-next.4) (2020-02-20)


### Bug Fixes

* pass options to getStyleLoaders ([70d832d](https://github.com/amille44420/dev-scripts/commit/70d832dcd650aed405ca4fa407d483247cf01bc2))

# [2.0.0-next.3](https://github.com/amille44420/dev-scripts/compare/v2.0.0-next.2...v2.0.0-next.3) (2020-02-19)


### Bug Fixes

* fix hooks and start scripts ([5b22d51](https://github.com/amille44420/dev-scripts/commit/5b22d51dc291b90b1804da35fa764131350a08be))

# [2.0.0-next.2](https://github.com/amille44420/dev-scripts/compare/v2.0.0-next.1...v2.0.0-next.2) (2020-02-19)


### Features

* move every env settings into the option step ([b7811a7](https://github.com/amille44420/dev-scripts/commit/b7811a7fc4f406a9da66113b386569e2d6d3d4a7))

# [2.0.0-next.1](https://github.com/amille44420/dev-scripts/compare/v1.1.5...v2.0.0-next.1) (2020-02-14)


### Features

* provide hook system to have dynamic settings on runtime ([b0d809b](https://github.com/amille44420/dev-scripts/commit/b0d809bfcf97d46fd8b894edf10a355488b1fc72))


### BREAKING CHANGES

* the whole customization has been updated to hooks

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
