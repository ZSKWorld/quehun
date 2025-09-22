#include "Lighting.glsl";

attribute vec4 a_Position;
attribute vec4 a_Color;
attribute vec2 a_Texcoord0;
attribute vec2 a_Texcoord1;

uniform float u_Time;
uniform mat4 u_MvpMatrix;

uniform lowp float _Rotation;

varying highp vec2 xlv_TEXCOORD0;
varying highp vec2 xlv_TEXCOORD1;

void main() {
    // gl_Position = remapGLPositionZ(gl_Position);

    highp vec4 pos_1;
    pos_1.yw = a_Position.yw;
    highp float tmpvar_2;
    vec4 _Time = vec4(u_Time * 0.05, u_Time, u_Time * 2.0, u_Time * 3.0);
    tmpvar_2 = (((
        (_Time * _Rotation)
    * a_Color.x).x * _Rotation) * 0.01745329);
    highp float tmpvar_3;
    tmpvar_3 = sin(tmpvar_2);
    highp float tmpvar_4;
    tmpvar_4 = cos(tmpvar_2);
    highp mat2 tmpvar_5;
    tmpvar_5[0].x = tmpvar_4;
    tmpvar_5[0].y = -(tmpvar_3);
    tmpvar_5[1].x = tmpvar_3;
    tmpvar_5[1].y = tmpvar_4;
    pos_1.xz = (a_Position.xz * tmpvar_5);
    // highp vec4 tmpvar_6;
    // tmpvar_6.w = 1.0;
    // tmpvar_6.xyz = pos_1.xyz;
    xlv_TEXCOORD0 = a_Texcoord0.xy;
    xlv_TEXCOORD1 = a_Texcoord1.xy;
    gl_Position = remapGLPositionZ(u_MvpMatrix * pos_1);
}

