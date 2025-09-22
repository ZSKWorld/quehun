#include "Lighting.glsl";
attribute vec4 a_Position;
attribute vec4 a_Texcoord0;
attribute vec4 a_Texcoord1;
uniform highp mat4 u_WorldMat;
uniform highp mat4 u_ViewProjection;
varying highp vec2 xlv_TEXCOORD0;
varying highp vec2 xlv_TEXCOORD1;
varying highp vec3 xlv_TEXCOORD4;
varying highp vec3 xlv_NORMAL;
varying highp vec4 xlv_TEXCOORD5;
void main()
{

  highp vec3 tmpvar_1;
  highp vec3 tmpvar_2;
  highp vec4 tmpvar_3;
  highp vec4 tmpvar_4;
  tmpvar_4.w = 1.0;
  tmpvar_4.xyz = a_Position.xyz;
  xlv_TEXCOORD0 = a_Texcoord0.xy;
  xlv_TEXCOORD1 = a_Texcoord1.xy;
  gl_Position = remapGLPositionZ(u_ViewProjection * (u_WorldMat * a_Position));
  xlv_TEXCOORD4 = tmpvar_1;
  xlv_NORMAL = tmpvar_2;
  xlv_TEXCOORD5 = tmpvar_3;
}