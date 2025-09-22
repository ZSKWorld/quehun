#include "Lighting.glsl";
attribute vec4 a_Position;
attribute vec3 a_Normal;
attribute vec4 a_Texcoord0;
uniform highp mat4 u_WorldMat;
uniform highp mat4 u_ViewProjection;
uniform lowp float _GlowSize;
varying highp vec2 xlv_TEXCOORD0;
void main()
{

  highp vec4 tmpvar_1;
  tmpvar_1.w = a_Position.w;
  tmpvar_1.xyz = (a_Position.xyz + ((a_Normal * _GlowSize) * 0.01));
  xlv_TEXCOORD0 = a_Texcoord0.xy;
  gl_Position = remapGLPositionZ(u_ViewProjection * (u_WorldMat * tmpvar_1));
}