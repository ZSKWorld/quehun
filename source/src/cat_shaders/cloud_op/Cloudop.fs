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
uniform lowp float _Fresnelrange;
uniform lowp float _OffsetX;
uniform lowp float _OffsetY;
uniform lowp float _DisturbScale;
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
  highp float tmpvar_5;
  tmpvar_5 = max (0.0, (dot (
    normalize((u_CameraPos - xlv_TEXCOORD1.xyz))
  , 
    normalize(xlv_NORMAL)
  ) - _Fresnelrange));
  lowp vec4 tmpvar_6;
  tmpvar_6 = texture2D (_MaskTex, xlv_TEXCOORD0);
  ahlpaMask_4 = tmpvar_6;
  highp vec2 tmpvar_7;
  tmpvar_7.x = (0.0015 * _CloudMove.x);
  tmpvar_7.y = (-0.00075 * _CloudMove.y);
  tmpvar_1 = (xlv_TEXCOORD0 + (_Time.xy * tmpvar_7));
  highp vec2 tmpvar_8;
  tmpvar_8.x = 0.0;
  tmpvar_8.y = (_Time.x * _DisturbScale);
  highp vec2 P_9;
  P_9 = (tmpvar_1 + tmpvar_8);
  highp vec2 tmpvar_10;
  tmpvar_10.y = 0.0;
  tmpvar_10.x = (_Time.x * 0.1);
  highp vec2 P_11;
  P_11 = (tmpvar_1 + tmpvar_10);
  lowp vec2 tmpvar_12;
  tmpvar_12 = ((texture2D (_DecorativeTex, P_9).yz + texture2D (_DecorativeTex, P_11).yz) - 1.0);
  c_3 = tmpvar_12;
  lowp vec2 tmpvar_13;
  tmpvar_13.x = _OffsetX;
  tmpvar_13.y = _OffsetY;
  lowp vec4 tmpvar_14;
  highp vec2 P_15;
  P_15 = (((
    (tmpvar_1 - vec2(0.5, 0.5))
   + 
    (c_3 * 0.02)
  ) + tmpvar_13) * _TexScale);
  tmpvar_14 = texture2D (_MainTex, P_15);
  h_2.xyz = tmpvar_14.xyz;
  h_2.w = ((ahlpaMask_4.x * (1.0 - _AhplaController)) * (tmpvar_5 * 3.0));
  highp float tmpvar_16;
  mediump float y_17;
  y_17 = (h_2.w * (1.0 - max (0.0, 
    (h_2.z - h_2.x)
  )));
  tmpvar_16 = mix (h_2.w, y_17, _CloudController);
  h_2.w = tmpvar_16;
  gl_FragColor = h_2;
}