#include "Lighting.glsl";
attribute vec4 a_Position;
attribute vec3 a_Normal;
attribute vec4 a_Texcoord0;
attribute vec4 a_Texcoord1;
uniform highp mat4 u_WorldMat;
uniform highp mat4 u_ViewProjection;
varying highp vec2 xlv_TEXCOORD0;
varying highp vec2 xlv_TEXCOORD1;
varying highp vec3 xlv_NORMAL;
varying highp vec4 xlv_TEXCOORD2;
void main()
{
  highp mat3 tmpvar_2;
  tmpvar_2[0] = u_WorldMat[0].xyz;
  tmpvar_2[1] = u_WorldMat[1].xyz;
  tmpvar_2[2] = u_WorldMat[2].xyz;
  xlv_TEXCOORD0 = a_Texcoord0.xy;
  xlv_TEXCOORD1 = a_Texcoord1.xy;
  gl_Position = remapGLPositionZ(u_ViewProjection * (u_WorldMat * a_Position));
  xlv_NORMAL = (tmpvar_2 * a_Normal);
  xlv_TEXCOORD2 = (u_WorldMat * a_Position);
}