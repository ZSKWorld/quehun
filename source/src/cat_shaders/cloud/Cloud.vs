#include "Lighting.glsl";

attribute vec4 a_Position;
attribute vec4 a_Color;
attribute vec2 a_Texcoord0;
attribute vec3 a_Normal;

uniform mat4 u_MvpMatrix;
uniform mat4 u_WorldMat;
uniform vec3 u_CameraPos;
#ifdef TILINGOFFSET
uniform vec4 u_TilingOffset;
#endif

varying vec3 v_ViewDir;
varying vec2 v_Texcoord0;
varying vec3 v_Normal;

void main() {
    vec4 position;
    position = a_Position;
    gl_Position = u_MvpMatrix * position;
    v_Texcoord0 = a_Texcoord0;
    v_Normal =  mat3(u_WorldMat) * a_Normal;
    v_ViewDir = u_CameraPos.xyz - (u_WorldMat * position).xyz;
    gl_Position = remapGLPositionZ(gl_Position);
}

