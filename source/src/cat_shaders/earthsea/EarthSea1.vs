#include "Lighting.glsl";
attribute vec4 a_Position;
attribute vec3 a_Normal;
attribute vec4 a_Texcoord0;
uniform highp mat4 u_WorldMat;
uniform highp mat4 u_ViewProjection;
uniform lowp float _GlowSize;
varying highp vec2 xlv_TEXCOORD0;
varying highp vec4 xlv_TEXCOORD3;
varying highp vec3 xlv_NORMAL;
void main()
{

  highp vec4 tmpvar_1;
  tmpvar_1.w = a_Position.w;
  tmpvar_1.xyz = (a_Position.xyz + (a_Normal * _GlowSize));
  highp vec4 tmpvar_2;
  tmpvar_2.w = 1.0;
  tmpvar_2.xyz = tmpvar_1.xyz;
  highp mat3 tmpvar_3;
  tmpvar_3[0] = u_WorldMat[0].xyz;
  tmpvar_3[1] = u_WorldMat[1].xyz;
  tmpvar_3[2] = u_WorldMat[2].xyz;
  xlv_TEXCOORD0 = a_Texcoord0.xy;
  // gl_Position = remapGLPositionZ(u_ViewProjection * (u_WorldMat * a_Position));
  //a_Position 需要改成tmpvar_1
  gl_Position = remapGLPositionZ(u_ViewProjection * (u_WorldMat * tmpvar_1));
  xlv_TEXCOORD3 = (u_WorldMat * tmpvar_1);
  xlv_NORMAL = (tmpvar_3 * a_Normal);
}