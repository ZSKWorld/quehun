#define SHADER_NAME TextureFS2D

#if defined(GL_FRAGMENT_PRECISION_HIGH)
    precision highp float;
#else
    precision mediump float;
#endif

#include "Sprite2DFrag.glsl";

void main() {
    clip();
    vec4 color = getSpriteTextureColor();
    setglColor(color);
}