#include "Lighting.glsl";

attribute vec4 a_Position;
attribute vec2 a_Texcoord0;
attribute vec3 a_Color;

uniform mat4 u_MvpMatrix;
uniform vec4 U_MainTex_ST;
#ifdef TILINGOFFSET
    uniform vec4 u_TilingOffset;
#endif


varying vec2 v_Texcoord0;
varying vec3 v_Color;
void main() {
    v_Color = a_Color;
    gl_Position = u_MvpMatrix * a_Position;
    
#ifdef TILINGOFFSET
    v_Texcoord0 = ((a_Texcoord0.xy * u_TilingOffset.xy) + u_TilingOffset.zw);
#else
    v_Texcoord0 = (a_Texcoord0.xy * 1.0);
#endif
    gl_Position = remapGLPositionZ(gl_Position);
}

