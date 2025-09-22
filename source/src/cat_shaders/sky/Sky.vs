#include "Lighting.glsl";

attribute vec4 a_Position;
attribute vec2 a_Texcoord0;

uniform mat4 u_MvpMatrix;
uniform mat4 u_WorldMat;

varying vec2 v_Texcoord0;
varying vec2 v_Texcoord1;

#ifdef TILINGOFFSET
uniform vec4 u_TilingOffset;
#endif

void main() {
    gl_Position = u_MvpMatrix * a_Position;
    v_Texcoord0 = a_Texcoord0;
    v_Texcoord1 = a_Texcoord0;		
    gl_Position = remapGLPositionZ(gl_Position);
}
