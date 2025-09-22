precision highp float;
#include "Lighting.glsl";
uniform highp float u_Time;
uniform sampler2D _MainTex;
uniform sampler2D _MaskTex;
uniform sampler2D _MaskTexY;
uniform lowp float _Alpha;
uniform lowp float _MaskXmove;
uniform lowp float _LuminanceRange;
uniform lowp float _VagueRange;
uniform lowp float _VaguePow;
uniform lowp float _MaskYmove;
uniform lowp vec4 _Disturb;
varying highp vec2 xlv_TEXCOORD0;
varying highp vec2 xlv_TEXCOORD1;
void main()
{
  vec4 _Time = vec4(u_Time * 0.05, u_Time, u_Time * 2.0, u_Time * 3.0);

  highp vec2 tmpvar_1;
  highp vec2 tmpvar_2;
  tmpvar_1.y = xlv_TEXCOORD0.y;
  tmpvar_2.y = xlv_TEXCOORD1.y;
  lowp vec4 col_3;
  lowp vec2 uvy_4;
  tmpvar_2.x = (xlv_TEXCOORD1.x + _MaskXmove);
  uvy_4 = xlv_TEXCOORD0;
  highp vec4 tmpvar_5;
  tmpvar_5 = (_Time * 120.0);
  tmpvar_1.x = (xlv_TEXCOORD0.x + (sin(
    (_Disturb.x * ((xlv_TEXCOORD0.y * 3.0) + tmpvar_5))
  ) * 0.0025).x);
  tmpvar_1.y = (xlv_TEXCOORD0.y + (sin(
    (_Disturb.y * ((tmpvar_1.x * 3.0) + tmpvar_5))
  ) * 0.0025).x);
  uvy_4.y = ((uvy_4.y * 0.4) + _MaskYmove);
  lowp vec4 tmpvar_6;
  tmpvar_6 = texture2D (_MainTex, tmpvar_1);
  lowp vec4 col_7;
  col_7.w = tmpvar_6.w;
  lowp vec2 uv_8;
  uv_8 = tmpvar_1;
  highp vec4 lm1_9;
  lowp float tmpvar_10;
  tmpvar_10 = (_VagueRange * 0.001);
  lowp vec2 tmpvar_11;
  tmpvar_11.x = (uv_8.x + tmpvar_10);
  tmpvar_11.y = uv_8.y;
  lowp vec4 tmpvar_12;
  tmpvar_12 = texture2D (_MainTex, tmpvar_11);
  highp vec4 tmpvar_13;
  tmpvar_13 = (tmpvar_12 * 0.118318);
  lowp vec2 tmpvar_14;
  tmpvar_14.x = (uv_8.x - tmpvar_10);
  tmpvar_14.y = uv_8.y;
  lowp vec4 tmpvar_15;
  tmpvar_15 = texture2D (_MainTex, tmpvar_14);
  lm1_9 = (tmpvar_13 + (tmpvar_15 * 0.118318));
  lowp vec2 tmpvar_16;
  tmpvar_16.x = (uv_8.x - tmpvar_10);
  tmpvar_16.y = (uv_8.y + tmpvar_10);
  lowp vec4 tmpvar_17;
  tmpvar_17 = texture2D (_MainTex, tmpvar_16);
  lm1_9 = (lm1_9 + (tmpvar_17 * 0.0947416));
  lowp vec4 tmpvar_18;
  tmpvar_18 = texture2D (_MainTex, (uv_8 - vec2(tmpvar_10)));
  lm1_9 = (lm1_9 + (tmpvar_18 * 0.0947416));
  lowp vec4 tmpvar_19;
  tmpvar_19 = texture2D (_MainTex, (uv_8 + vec2(tmpvar_10)));
  lm1_9 = (lm1_9 + (tmpvar_19 * 0.0947416));
  lowp vec2 tmpvar_20;
  tmpvar_20.x = (uv_8.x + tmpvar_10);
  tmpvar_20.y = (uv_8.y - tmpvar_10);
  lowp vec4 tmpvar_21;
  tmpvar_21 = texture2D (_MainTex, tmpvar_20);
  lm1_9 = (lm1_9 + (tmpvar_21 * 0.0947416));
  lowp vec2 tmpvar_22;
  tmpvar_22.x = uv_8.x;
  tmpvar_22.y = (uv_8.y + tmpvar_10);
  lowp vec4 tmpvar_23;
  tmpvar_23 = texture2D (_MainTex, tmpvar_22);
  lm1_9 = (lm1_9 + (tmpvar_23 * 0.118318));
  lowp vec2 tmpvar_24;
  tmpvar_24.x = uv_8.x;
  tmpvar_24.y = (uv_8.y - tmpvar_10);
  lowp vec4 tmpvar_25;
  tmpvar_25 = texture2D (_MainTex, tmpvar_24);
  lm1_9 = (lm1_9 + (tmpvar_25 * 0.118318));
  lowp vec4 tmpvar_26;
  tmpvar_26 = texture2D (_MainTex, uv_8);
  lm1_9 = (lm1_9 + (tmpvar_26 * 0.147761));
  highp vec3 tmpvar_27;
  tmpvar_27 = mix (tmpvar_6.xyz, lm1_9.xyz, vec3(_VaguePow));
  col_7.xyz = tmpvar_27;
  lowp vec4 col_28;
  col_28.w = col_7.w;
  col_28.xyz = mix (col_7.xyz, (vec3((
    ((col_7.x * 0.2125) + (col_7.y * 0.7154))
   + 
    (col_7.z * 0.0721)
  )) + _LuminanceRange), vec3(_LuminanceRange));
  col_3.xyz = col_28.xyz;
  col_3.w = ((tmpvar_6.w * _Alpha) * (texture2D (_MaskTex, tmpvar_2).x * texture2D (_MaskTexY, uvy_4).x));
  gl_FragColor = col_3;
}