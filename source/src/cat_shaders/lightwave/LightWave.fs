precision highp float;
#include "Lighting.glsl";
uniform highp float u_Time;
uniform sampler2D _MainTex;
uniform highp float _Speed;
uniform highp float _AlphaController;
uniform highp float _WaveFrequency;
uniform highp float _Speed2;
uniform highp vec4 _Color;
uniform highp float _OffsetX;
uniform highp float _OffsetY;
varying highp vec2 xlv_TEXCOORD0;
varying highp vec4 xlv_COLOR;
void main()
{
  vec4 _Time = vec4(u_Time * 0.05, u_Time, u_Time * 2.0, u_Time * 3.0);

  highp vec2 tmpvar_1;
  lowp vec4 outCol_2;
  highp vec2 uv2_3;
  highp vec2 tmpvar_4;
  tmpvar_4.x = _OffsetX;
  tmpvar_4.y = _OffsetY;
  tmpvar_1 = (xlv_TEXCOORD0 + tmpvar_4);
  uv2_3.y = (xlv_TEXCOORD0.y + ((_Time * _Speed) + _WaveFrequency).x);
  highp vec4 tmpvar_5;
  tmpvar_5 = (_Time * _Speed2);
  tmpvar_1.x = (tmpvar_1.x + (tmpvar_5 + (_WaveFrequency + 0.5)).x);
  uv2_3.x = (xlv_TEXCOORD0.x + (tmpvar_5 + _WaveFrequency).x);
  outCol_2 = ((texture2D (_MainTex, tmpvar_1) + (texture2D (_MainTex, uv2_3) * 0.5)) * _Color);
  outCol_2.w = (outCol_2.w * (xlv_COLOR * _AlphaController).x);
  gl_FragColor = outCol_2;
}