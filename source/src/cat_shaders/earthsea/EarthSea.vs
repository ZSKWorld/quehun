#include "Lighting.glsl";
attribute vec4 a_Position;
attribute vec3 a_Normal;
attribute vec4 a_Texcoord0;
uniform highp float u_Time;
uniform highp vec3 u_CameraPos;
uniform highp mat4 u_WorldMat;
uniform highp mat4 u_ViewProjection;
uniform highp vec4 _WaveSpeed;
uniform highp vec4 _WaveScale;
varying highp vec2 xlv_TEXCOORD0;
varying highp vec2 xlv_TEXCOORD1;
varying highp vec2 xlv_TEXCOORD2;
varying highp vec3 xlv_TEXCOORD4;
varying highp vec3 xlv_NORMAL;
varying highp vec4 xlv_TEXCOORD5;
void main()
{
  vec4 _Time = vec4(u_Time * 0.05, u_Time, u_Time * 2.0, u_Time * 3.0);

  highp vec4 temp_1;
  highp vec4 tmpvar_2;
  tmpvar_2.x = (_WaveScale.w * 0.1);
  tmpvar_2.y = (_WaveScale.x * 0.1);
  tmpvar_2.z = (_WaveScale.y * 0.1);
  tmpvar_2.w = (_WaveScale.z * 0.1);
  temp_1.xy = (a_Position.xz * tmpvar_2.xy);
  temp_1.zw = (a_Position.xz * tmpvar_2.zw);
  highp vec4 tmpvar_3;
  tmpvar_3.w = 1.0;
  tmpvar_3.xyz = a_Position.xyz;
  highp mat3 tmpvar_4;
  tmpvar_4[0] = u_WorldMat[0].xyz;
  tmpvar_4[1] = u_WorldMat[1].xyz;
  tmpvar_4[2] = u_WorldMat[2].xyz;
  gl_Position = remapGLPositionZ(u_ViewProjection * (u_WorldMat * a_Position));
  xlv_TEXCOORD0 = (temp_1.xy + (_WaveSpeed.xy * _Time.y));
  xlv_TEXCOORD1 = (temp_1.wz + ((_WaveSpeed.zw * _Time.x) * 10.0));
  xlv_TEXCOORD2 = a_Texcoord0.xy;
  highp vec4 tmpvar_5;
  tmpvar_5 = (u_WorldMat * a_Position);
  xlv_TEXCOORD4 = normalize((u_CameraPos - tmpvar_5.xyz));
  xlv_NORMAL = normalize((tmpvar_4 * a_Normal));
  xlv_TEXCOORD5 = tmpvar_5;
}