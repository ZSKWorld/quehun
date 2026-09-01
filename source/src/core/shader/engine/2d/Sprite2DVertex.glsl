#include "ClipVertex.glsl";
#include "Color.glsl";
#ifdef CAMERA2D
uniform mat3 u_view2D;
#endif
#ifdef SPRITE2DGLOBAL
#endif
#ifdef RENDERTEXTURE
uniform vec3 u_InvertMat_0;
uniform vec3 u_InvertMat_1;
#endif
#ifdef VERTEX_SIZE
uniform vec4 u_vertexSize;
#endif
uniform vec3 u_NMatrix_0;
uniform vec3 u_NMatrix_1;
uniform vec2 u_size;
varying vec4 v_color;
void transfrom(vec2 pos, vec3 xDir, vec3 yDir, out vec2 outPos) {
    outPos.x = xDir.x * pos.x + xDir.y * pos.y + xDir.z;
    outPos.y = yDir.x * pos.x + yDir.y * pos.y + yDir.z;
}
void getGlobalPos(in vec2 localPos, out vec2 globalPos) {
    transfrom(localPos, u_NMatrix_0, u_NMatrix_1, globalPos);
}
void getProjectPos(in vec2 viewPos, out vec4 projectPos) {
    projectPos = vec4((viewPos.x / u_size.x - 0.5) * 2.0, (0.5 - viewPos.y / u_size.y) * 2.0, 0., 1.0);
#ifdef INVERTY
    projectPos.y = -projectPos.y;
#endif
}
void getViewPos(in vec2 globalPos, out vec2 viewPos) {
#ifdef RENDERTEXTURE
    vec2 tempPos;
    transfrom(globalPos, u_InvertMat_0, u_InvertMat_1, tempPos);
#ifdef CAMERA2D
    viewPos.xy = (u_view2D * vec3(tempPos, 1.0)).xy + u_size / 2.;
#else
    viewPos.xy = tempPos;
#endif
#else
#ifdef CAMERA2D
    viewPos.xy = (u_view2D * vec3(globalPos, 1.0)).xy + u_size / 2.;
#else
    viewPos.xy = globalPos;
#endif
#endif
}
#ifdef TEXTUREVS
struct vertexInfo {
    vec2 pos;
    vec4 color;
    vec2 cliped;
    vec4 texcoordAlpha;
    float useTex;
    float useClip;
    vec4 customs;
};
uniform float u_VertAlpha;
varying vec4 v_texcoordAlpha;
varying float v_useTex;
varying float v_useClip;
varying vec4 v_customs;
#ifdef USE_TEX_ARRAY
varying float v_texLayer;
#endif
void getVertexInfo(inout vertexInfo info) {
    info.texcoordAlpha.xy = a_posuv.zw;
    info.color = a_attribColor;
#ifdef VERTEXALPHA
    info.color.a *= a_attribFlags.z;
#else
    info.color.a *= u_VertAlpha;
#endif
    info.color.xyz *= info.color.a;
    info.useTex = a_attribFlags.r;
    info.useClip = a_attribFlags.g;
    info.customs = a_customs;
    vec2 pos;
#ifdef VERTEX_SIZE
    pos = (a_posuv.xy * u_vertexSize.zw) + u_vertexSize.xy;
#else
    pos = a_posuv.xy;
#endif
    info.pos = pos;
}
vec4 getPosition(in vec2 positionOS) {
    vec2 globalPos;
#ifdef VERTEX_SIZE
    getGlobalPos(positionOS, globalPos);
#else
    globalPos = positionOS;
#endif
    clip(globalPos);
    vec2 viewPos;
    getViewPos(globalPos, viewPos);
    vec4 pos;
    getProjectPos(viewPos, pos);
    return pos;
}
#endif
#ifdef BASERENDER2D
varying vec2 v_texcoord;
uniform vec4 u_baseRenderColor;
#ifdef UNITQUAD
uniform vec2 u_baseRenderSize2D;
#endif
struct vertexInfo {
    vec4 color;
    vec2 uv;
    vec2 pos;
    vec2 lightUV;
};
#ifdef LIGHT2D_ENABLE
varying vec2 v_lightUV;
uniform vec4 u_LightAndShadow2DParam;
void lightAndShadow(vertexInfo info) {
    v_lightUV = info.lightUV;
}
void invertMat(inout vec3 v1, inout vec3 v2) {
    float a1 = v1.x;
    float b1 = v2.x;
    float c1 = v1.y;
    float d1 = v2.y;
    float tx1 = v1.z;
    float ty1 = v2.z;
    float n = a1 * d1 - b1 * c1;
    v1.x = d1 / n;
    v2.x = -b1 / n;
    v1.y = -c1 / n;
    v2.y = a1 / n;
    v1.z = (c1 * ty1 - d1 * tx1) / n;
    v2.z = -(a1 * ty1 - b1 * tx1) / n;
}
#endif
void getVertexInfo(inout vertexInfo info) {
#ifdef UNITQUAD
    info.pos = a_position.xy * u_baseRenderSize2D;
#else
    info.pos = a_position.xy;
#endif
    info.color = vec4(1.0, 1.0, 1.0, 1.0);
#ifdef COLOR
    info.color = a_color;
    info.color.rgb *= a_color.a;
#endif
    vec4 ucolor = linearToGamma(u_baseRenderColor);
    ucolor.rgb *= ucolor.a;
    info.color *= ucolor;
#ifdef UV
    info.uv = a_uv;
#endif
#ifdef LIGHT2D_ENABLE
    vec2 global;
    getGlobalPos(info.pos, global);
    info.lightUV.x = (global.x - u_LightAndShadow2DParam.x) / u_LightAndShadow2DParam.z;
    info.lightUV.y = 1.0 - (global.y - u_LightAndShadow2DParam.y) / u_LightAndShadow2DParam.w;
#endif
}
vec4 getPosition(in vec2 positionOS) {
    vec2 globalPos;
    getGlobalPos(positionOS, globalPos);
    clip(globalPos);
    vec2 viewPos;
    getViewPos(globalPos, viewPos);
    vec4 pos;
    getProjectPos(viewPos, pos);
    return pos;
}
#endif
