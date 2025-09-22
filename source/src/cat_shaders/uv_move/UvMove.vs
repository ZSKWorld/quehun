#include "Lighting.glsl";

attribute vec4 a_Position;
attribute vec4 a_Color;
attribute vec2 a_Texcoord0;

uniform mat4 u_MvpMatrix;

varying vec2 v_Texcoord0;

#ifdef TILINGOFFSET
uniform vec4 u_TilingOffset;
#endif

void main() {
    vec4 position;
    position = a_Position;
    gl_Position = u_MvpMatrix * position;

    v_Texcoord0 = a_Texcoord0;

    gl_Position = remapGLPositionZ(gl_Position);
}
