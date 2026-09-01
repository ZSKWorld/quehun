#define SHADER_NAME BaseRender2DPS

#if defined(GL_FRAGMENT_PRECISION_HIGH)
    precision highp float;
#else
    precision mediump float;
#endif

#include "Sprite2DFrag.glsl";

void main() {
    clip();
    vec4 textureColor = texture2D(u_baseRender2DTexture, v_texcoord.xy);
#ifdef LIGHT2D_ENABLE
    lightAndShadow(textureColor);
#endif
    textureColor = transspaceColor(textureColor);
    setglColor(textureColor);
}