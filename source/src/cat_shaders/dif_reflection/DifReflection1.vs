#include "Lighting.glsl";
#include "ShaderTool.glsl";
attribute vec4 a_Position;
attribute vec4 a_Texcoord0;
attribute vec4 a_Texcoord1;
uniform highp float u_Time;
uniform highp mat4 u_WorldMat;
//unity_WorldToObject;
uniform highp mat4 u_ViewProjection;
uniform highp vec3 p;
uniform highp vec3 n;
uniform highp float _Pose;
uniform highp float _Range;
varying highp vec2 xlv_TEXCOORD0;
varying highp vec2 xlv_TEXCOORD1;
varying highp vec3 xlv_TEXCOORD2;
void main()
{
  vec4 _Time = vec4(u_Time * 0.05, u_Time, u_Time * 2.0, u_Time * 3.0);
  mat4 unity_WorldToObject = invert(u_WorldMat);

  mediump float nd_1;
  highp vec4 wpos_2;
  wpos_2 = (u_WorldMat * a_Position);
  highp vec3 tmpvar_3;
  tmpvar_3 = (wpos_2.xyz - p);
  highp float tmpvar_4;
  tmpvar_4 = dot (n, tmpvar_3);
  nd_1 = tmpvar_4;
  wpos_2.xyz = (wpos_2.xyz + (-(n) * (
    (nd_1 * 2.0)
   + 
    (wpos_2.y * _Pose)
  )));
  highp vec4 tmpvar_5;
  tmpvar_5.x = wpos_2.x;
  tmpvar_5.y = (wpos_2.y * 0.5);
  tmpvar_5.zw = wpos_2.zw;
  mediump float tmpvar_6;
  tmpvar_6 = min (1.0, abs(nd_1));
  wpos_2 = (unity_WorldToObject * mix (wpos_2, (tmpvar_5 + 
    ((sin((
      (wpos_2.y * 50.0)
     + 
      (_Time * 30.0)
    )) * _Range) * 0.01)
  .x), vec4(tmpvar_6)));
  highp vec4 tmpvar_7;
  tmpvar_7.w = 1.0;
  tmpvar_7.xyz = wpos_2.xyz;
  xlv_TEXCOORD0 = a_Texcoord0.xy;
  xlv_TEXCOORD1 = a_Texcoord1.xy;
  gl_Position = remapGLPositionZ(u_ViewProjection * (u_WorldMat * a_Position));
  xlv_TEXCOORD2 = tmpvar_3;
}