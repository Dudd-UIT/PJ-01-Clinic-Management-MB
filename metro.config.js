const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

module.exports = mergeConfig(getDefaultConfig(__dirname), {
  resolver: {
    assetExts: ['bin', ...getDefaultConfig(__dirname).resolver.assetExts], // Thêm 'bin' vào danh sách assetExts
  },
});
