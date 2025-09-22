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
  highp vec3 tmpvar_2;
  highp vec4 tmpvar_3;
  highp vec4 tmpvar_4;
  tmpvar_4.w = 1.0;
  tmpvar_4.xyz = a_Position.xyz;
  tmpvar_3 = (u_ViewProjection * (u_WorldMat * tmpvar_4));
  tmpvar_1.zw = tmpvar_3.zw;
  highp mat3 tmpvar_5;
  tmpvar_5[0] = u_WorldMat[0].xyz;
  tmpvar_5[1] = u_WorldMat[1].xyz;
  tmpvar_5[2] = u_WorldMat[2].xyz;
  tmpvar_2 = (tmpvar_5 * a_Normal);
  tmpvar_1.xy = (tmpvar_3.xy + (tmpvar_2.xy * _GlowSize));
  xlv_TEXCOORD0 = a_Texcoord0.xy;
  gl_Position = remapGLPositionZ(u_ViewProjection * (u_WorldMat * a_Position));
  xlv_TEXCOORD3 = (u_WorldMat * a_Position);
  xlv_NORMAL = tmpvar_2;
}