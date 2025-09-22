#include "Lighting.glsl";

attribute vec4 a_Position;
attribute vec2 a_Texcoord0;
attribute vec2 a_Texcoord1;

uniform mat4 u_MvpMatrix;

#ifdef TILINGOFFSET
uniform vec4 u_TilingOffset;
#endif

varying vec2 uvr;
varying vec2 uvg;
varying vec2 uvb;
varying vec2 uva;
varying vec2 uv4;
varying vec2 uv5;

void main() {
    #ifdef TILINGOFFSET
        uvr=TransformUV(a_Texcoord0,u_TilingOffset);
        uvg=TransformUV(a_Texcoord0,u_TilingOffset);
        uvb=TransformUV(a_Texcoord0,u_TilingOffset);
        uva=TransformUV(a_Texcoord0,u_TilingOffset);
    #else
        uvr=a_Texcoord0;
        uvg=a_Texcoord0;
        uvb=a_Texcoord0;
        uva=a_Texcoord0;
    #endif

    uv4 = a_Texcoord0;
    uv5 = a_Texcoord1;

    gl_Position = u_MvpMatrix * a_Position;
    gl_Position = remapGLPositionZ(gl_Position);
}

