#include "Lighting.glsl";
attribute vec4 a_Position;
attribute vec3 a_Normal;
attribute vec4 a_Texcoord0;
attribute vec4 a_Texcoord1;
uniform highp mat4 u_WorldMat;
uniform highp mat4 u_ViewProjection;
uniform lowp vec4 _LightDir;
varying highp vec2 xlv_TEXCOORD0;
varying highp vec2 xlv_TEXCOORD1;
varying highp vec4 xlv_TEXCOORD2;
varying highp vec4 xlv_TEXCOORD3;
varying highp vec3 xlv_NORMAL;
void main()
{

  highp vec4 tmpvar_1;
  highp vec4 tmpvar_2;
  tmpvar_2.w = 1.0;
  tmpvar_2.xyz = a_Position.xyz;
  tmpvar_1 = (u_WorldMat * a_Position);
  highp mat3 tmpvar_3;
  tmpvar_3[0] = u_WorldMat[0].xyz;
  tmpvar_3[1] = u_WorldMat[1].xyz;
  tmpvar_3[2] = u_WorldMat[2].xyz;
  xlv_TEXCOORD0 = a_Texcoord0.xy;
  xlv_TEXCOORD1 = a_Texcoord1.xy;
  gl_Position = remapGLPositionZ(u_ViewProjection * (u_WorldMat * a_Position));
  xlv_TEXCOORD2 = normalize((_LightDir - tmpvar_1));
  xlv_TEXCOORD3 = tmpvar_1;
  xlv_NORMAL = normalize((tmpvar_3 * a_Normal));
}