#include "Lighting.glsl";
attribute vec4 a_Position;
attribute vec4 a_Texcoord0;
attribute vec4 a_Texcoord1;
uniform highp mat4 u_WorldMat;
uniform highp mat4 u_ViewProjection;
uniform highp vec3 p;
varying highp vec2 xlv_TEXCOORD0;
varying highp vec2 xlv_TEXCOORD1;
varying highp vec3 xlv_TEXCOORD2;
void main()
{

  highp vec4 tmpvar_1;
  tmpvar_1.w = 1.0;
  tmpvar_1.xyz = a_Position.xyz;
  xlv_TEXCOORD0 = a_Texcoord0.xy;
  xlv_TEXCOORD1 = a_Texcoord1.xy;
  gl_Position = remapGLPositionZ(u_ViewProjection * (u_WorldMat * a_Position));
  xlv_TEXCOORD2 = ((u_WorldMat * a_Position).xyz - p);
}