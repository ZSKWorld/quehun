const { load } = require("protobufjs");

/**
 * 设置LayaNative屏幕方向，可设置以下值
 * landscape           横屏
 * portrait            竖屏
 * sensor_landscape    横屏(双方向)
 * sensor_portrait     竖屏(双方向)
 */
window.screenOrientation = "landscape";

loadLib("libs/laya.core.js");
loadLib("libs/laya.d3.js");
loadLib("libs/laya.webgl_2D.js");
loadLib("libs/laya.webgl_3D.js");
// loadLib("libs/laya.ui.js");
loadLib("libs/laya.light2D.js");
loadLib("libs/laya.line2D.js");
loadLib("libs/laya.trailCommon.js");
loadLib("libs/laya.trail2D.js");
loadLib("libs/laya.particleCommon.js");
loadLib("libs/laya.particle.js");
// loadLib("libs/laya.tilemap.js");
// loadLib("libs/laya.physics2D.js");
// loadLib("libs/laya.box2d.js");
loadLib("libs/spine-core-4.2.js");
loadLib("libs/laya.spine.js");
// loadLib("libs/laya.navMeshCommon.js");
// loadLib("libs/laya.navMesh2d.js");
loadLib("libs/laya.ani.js");
loadLib("libs/laya.trail3D.js");
loadLib("libs/laya.particle3D.js");
loadLib("libs/laya.postProcess.js");
loadLib("libs/laya.physics3D.js");
loadLib("libs/laya.bullet.js");
// loadLib("libs/laya.navMesh3d.js");
loadLib("libs/laya.gltf.js");
loadLib("libs/laya.device.js");

loadLib("libs_game/crypto-js.js");
loadLib("libs_game/fairygui.js");
loadLib("libs_game/extend.js");
loadLib("libs_game/logger.js");
loadLib("libs_game/messageid.js");
loadLib("libs_game/mygame.js");
loadLib("libs_game/protobuf.js");
loadLib("libs_game/proxyid.js");
loadLib("libs_game/respath.js");
loadLib("libs_game/userdataevent.js");
loadLib("libs_game/viewid.js");

//leb js
loadLib("libs_leb/proto.d.js");

loadLib("js/bundle.js");

