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
uniform lowp float _OffsetX;
uniform lowp float _OffsetY;
uniform lowp float _DisturbScale;
uniform lowp float _DistanceAhpla;
varying highp vec2 xlv_TEXCOORD0;
varying highp vec4 xlv_TEXCOORD1;
void main()
{
  vec4 _Time = vec4(u_Time * 0.05, u_Time, u_Time * 2.0, u_Time * 3.0);

  highp vec2 tmpvar_1;
  mediump vec4 h_2;
  highp vec2 c_3;
  highp vec4 ahlpaMask_4;
  lowp vec4 tmpvar_5;
  tmpvar_5 = texture2D (_MaskTex, xlv_TEXCOORD0);
  ahlpaMask_4 = tmpvar_5;
  highp vec2 tmpvar_6;
  tmpvar_6.x = (0.0015 * _CloudMove.x);
  //y转成opengl需要变负
  tmpvar_6.y = (-0.00075 * _CloudMove.y);
  tmpvar_1 = (xlv_TEXCOORD0 + (_Time.xy * tmpvar_6));
  highp vec2 tmpvar_7;
  tmpvar_7.x = 0.0;
  tmpvar_7.y = (_Time.x * _DisturbScale);
  highp vec2 P_8;
  P_8 = (tmpvar_1 + tmpvar_7);
  highp vec2 tmpvar_9;
  tmpvar_9.y = 0.0;
  tmpvar_9.x = (_Time.x * 0.1);
  highp vec2 P_10;
  P_10 = (tmpvar_1 + tmpvar_9);
  lowp vec2 tmpvar_11;
  tmpvar_11 = ((texture2D (_DecorativeTex, P_8).yz + texture2D (_DecorativeTex, P_10).yz) - 1.0);
  c_3 = tmpvar_11;
  highp vec3 tmpvar_12;
  tmpvar_12 = (xlv_TEXCOORD1.xyz - u_CameraPos);
  lowp float x_13;
  x_13 = (1.0 + _DistanceAhpla);
  lowp vec2 tmpvar_14;
  tmpvar_14.x = _OffsetX;
  tmpvar_14.y = _OffsetY;
  lowp vec4 tmpvar_15;
  highp vec2 P_16;
  P_16 = (((
    (tmpvar_1 - vec2(0.5, 0.5))
   + 
    (c_3 * 0.02)
  ) + tmpvar_14) * _TexScale);
  tmpvar_15 = texture2D (_MainTex, P_16);
  h_2 = tmpvar_15;
  h_2 = (h_2 * _CloudColor);
  highp float tmpvar_17;
  mediump float y_18;
  y_18 = (h_2.w * (1.0 - max (0.0, 
    (h_2.z - h_2.x)
  )));
  tmpvar_17 = mix (h_2.w, y_18, _CloudController);
  h_2.w = (h_2.w * tmpvar_17);
  h_2.w = ((h_2.w * ahlpaMask_4.x) * (_AhplaController * 3.0));
  highp float tmpvar_19;
  tmpvar_19 = max (0.0, ((h_2.w * 
    min (x_13, sqrt(dot (tmpvar_12, tmpvar_12)))
  ) - _DistanceAhpla));
  h_2.w = tmpvar_19;
  gl_FragColor = h_2;
}