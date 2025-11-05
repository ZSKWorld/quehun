#define SHADER_NAME BaseRender2DVS

#include "Sprite2DVertex.glsl";

void main() {
    vertexInfo info;
    getVertexInfo(info);
    v_texcoord = info.uv;
    v_color = info.color;
#ifdef LIGHT2D_ENABLE
    lightAndShadow(info);
#endif
    gl_Position = getPosition(info.pos);
}