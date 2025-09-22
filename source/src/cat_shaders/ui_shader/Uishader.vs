#include "Lighting.glsl";
attribute vec4 a_Position;
attribute vec4 a_Texcoord0;
attribute vec4 a_Texcoord1;
uniform highp mat4 u_WorldMat;
uniform highp mat4 u_ViewProjection;
varying highp vec2 xlv_TEXCOORD0;
varying highp vec2 xlv_TEXCOORD1;
void main()
{
  xlv_TEXCOORD0 = a_Texcoord0.xy;
  gl_Position = remapGLPositionZ(u_ViewProjection * (u_WorldMat * a_Position));
  xlv_TEXCOORD1 = a_Texcoord1.xy;
}