#include "Lighting.glsl";

attribute vec4 a_Position;
attribute vec2 a_Texcoord0;
attribute vec3 a_Normal;
attribute mat4 a_WorldMat;

uniform mat4 u_MvpMatrix;

varying highp vec2 xlv_TEXCOORD0;
varying highp vec3 xlv_NORMAL;


void main() {
    highp mat3 tmpvar_2;
    tmpvar_2[0] = a_WorldMat[0].xyz;
    tmpvar_2[1] = a_WorldMat[1].xyz;
    tmpvar_2[2] = a_WorldMat[2].xyz;
    xlv_TEXCOORD0 = a_Texcoord0.xy;
    xlv_NORMAL = (tmpvar_2 * a_Normal);
    gl_Position = remapGLPositionZ(u_MvpMatrix * a_Position);
}

