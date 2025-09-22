#include "Lighting.glsl";

attribute vec4 a_Position;
attribute vec2 a_Texcoord0;
attribute vec4 a_Color;
attribute vec3 a_Normal;

uniform mat4 u_MvpMatrix;
uniform mat4 u_WorldMat;

varying vec2 v_Texcoord0;
varying vec3 v_ViewDir;
varying vec3 v_WorldNormal;
varying vec4 v_WorldPos;
varying vec4 v_Color;

void main() {
    v_Texcoord0 = a_Texcoord0;
    vec4 tempWorldPos = u_WorldMat * a_Position;
    v_WorldPos.xyz = tempWorldPos.xyz;

    v_ViewDir = normalize(vec3(tempWorldPos.x,tempWorldPos.y,tempWorldPos.z));
    vec3 tempNormal = mat3(u_WorldMat) * a_Normal;
    v_WorldNormal = normalize(tempNormal);
    v_Color = a_Color;
    gl_Position = u_MvpMatrix * a_Position;
    gl_Position = remapGLPositionZ(gl_Position);
}

