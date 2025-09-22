precision highp float;
#include "Lighting.glsl";
uniform highp float u_Time;
uniform highp vec3 u_CameraPos;
uniform sampler2D _MainTex;
uniform sampler2D _DecorativeTex;
uniform sampler2D _MaskTex;
uniform highp float _AhplaController;
uniform highp float _TexScale;
uniform highp vec4 _CloudMove;
uniform highp float _CloudController;
uniform lowp vec4 _CloudColor;
uniform lowp float _Fresnelrange;
uniform lowp float _OffsetX;
uniform lowp float _OffsetY;
uniform lowp float _DisturbScale;
uniform lowp float _EdgeAhpla;
varying highp vec2 xlv_TEXCOORD0;
varying highp vec3 xlv_NORMAL;
varying highp vec4 xlv_TEXCOORD1;
void main()
{
  vec4 _Time = vec4(u_Time * 0.05, u_Time, u_Time * 2.0, u_Time * 3.0);

  highp vec2 tmpvar_1;
  mediump vec4 h_2;
  highp vec2 c_3;
  highp vec4 ahlpaMask_4;
  highp vec3 tmpvar_5;
  tmpvar_5 = normalize(xlv_NORMAL);
  highp vec3 tmpvar_6;
  tmpvar_6 = normalize((u_CameraPos - xlv_TEXCOORD1.xyz));
  highp float tmpvar_7;
  tmpvar_7 = (min (1.0, (
    max (0.0, dot (tmpvar_5, tmpvar_6))
   - _EdgeAhpla)) * 7.5);
  highp float tmpvar_8;
  tmpvar_8 = max (0.0, (_Fresnelrange - dot (tmpvar_6, tmpvar_5)));
  lowp vec4 tmpvar_9;
  tmpvar_9 = texture2D (_MaskTex, xlv_TEXCOORD0);
  ahlpaMask_4 = tmpvar_9;
  highp vec2 tmpvar_10;
  tmpvar_10.x = (0.0015 * _CloudMove.x);
  tmpvar_10.y = (-0.00075 * _CloudMove.y);
  tmpvar_1 = (xlv_TEXCOORD0 + (_Time.xy * tmpvar_10));
  highp vec2 tmpvar_11;
  tmpvar_11.x = 0.0;
  highp float tmpvar_12;
  tmpvar_12 = (_Time.x * _DisturbScale);
  tmpvar_11.y = tmpvar_12;
  highp vec2 P_13;
  P_13 = (tmpvar_1 + tmpvar_11);
  highp vec2 tmpvar_14;
  tmpvar_14.y = 0.0;
  tmpvar_14.x = tmpvar_12;
  highp vec2 P_15;
  P_15 = (tmpvar_1 + tmpvar_14);
  lowp vec2 tmpvar_16;
  tmpvar_16 = ((texture2D (_DecorativeTex, P_13).yz + texture2D (_DecorativeTex, P_15).yz) - 1.0);
  c_3 = tmpvar_16;
  lowp vec2 tmpvar_17;
  tmpvar_17.x = _OffsetX;
  tmpvar_17.y = _OffsetY;
  lowp vec4 tmpvar_18;
  highp vec2 P_19;
  P_19 = (((
    (tmpvar_1 - vec2(0.5, 0.5))
   + 
    (c_3 * 0.02)
  ) + tmpvar_17) * _TexScale);
  tmpvar_18 = texture2D (_MainTex, P_19);
  h_2 = tmpvar_18;
  h_2.xyz = (h_2 * _CloudColor).xyz;
  h_2.w = ((ahlpaMask_4.x * (1.0 - _AhplaController)) * (tmpvar_8 * 3.0));
  mediump float y_20;
  y_20 = (h_2.w * (1.0 - max (0.0, 
    (h_2.z - h_2.x)
  )));
  highp float tmpvar_21;
  tmpvar_21 = max (0.0, mix (h_2.w, y_20, _CloudController));
  h_2.w = tmpvar_21;
  h_2.w = (h_2.w * tmpvar_7);
  gl_FragColor = h_2;
}