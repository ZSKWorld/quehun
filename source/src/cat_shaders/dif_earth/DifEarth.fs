precision highp float;
#include "Lighting.glsl";
uniform highp vec3 u_CameraPos;
uniform sampler2D _MainTex;
uniform sampler2D _LightTex;
uniform lowp float _LightController;
uniform lowp float _CastController;
uniform lowp float _GlobalController;
uniform lowp vec4 _LightCol;
uniform lowp vec4 _ShadowCol;
uniform lowp float _BloomRange;
uniform lowp float _BloomPow;
uniform lowp float _LightRange;
uniform lowp float _Saturation;
uniform lowp float _SpRange;
uniform lowp float _Alpha;
uniform lowp float _SpecPower;
uniform lowp vec4 _SpeculaCrolor;
uniform lowp float _Gloss;
lowp float xlat_mutable_BloomRange;
varying highp vec2 xlv_TEXCOORD0;
varying highp vec2 xlv_TEXCOORD1;
varying highp vec4 xlv_TEXCOORD2;
varying highp vec4 xlv_TEXCOORD3;
varying highp vec3 xlv_NORMAL;
varying highp vec4 xlv_COLOR;
void main()
{

  lowp vec4 col_l_1;
  lowp vec4 col_2;
  lowp vec3 viewDir_3;
  lowp vec3 refDir_4;
  highp vec4 tmpvar_5;
  tmpvar_5.w = 0.0;
  tmpvar_5.xyz = xlv_NORMAL;
  highp vec4 I_6;
  I_6 = -(xlv_TEXCOORD2);
  highp vec3 tmpvar_7;
  tmpvar_7 = normalize((I_6 - (2.0 * 
    (dot (tmpvar_5, I_6) * tmpvar_5)
  ))).xyz;
  refDir_4 = tmpvar_7;
  highp vec3 tmpvar_8;
  tmpvar_8 = normalize((u_CameraPos - xlv_TEXCOORD3.xyz));
  viewDir_3 = tmpvar_8;
  lowp vec4 tmpvar_9;
  tmpvar_9 = texture2D (_MainTex, xlv_TEXCOORD0);
  col_2.w = tmpvar_9.w;
  lowp vec4 tmpvar_10;
  tmpvar_10 = texture2D (_LightTex, xlv_TEXCOORD1);
  col_l_1.w = tmpvar_10.w;
  xlat_mutable_BloomRange = (_BloomRange * 0.85);
  col_l_1.xyz = mix (tmpvar_10.xxx, tmpvar_10.yyy, vec3(_LightRange));
  col_l_1 = (col_l_1 + ((
    max (xlat_mutable_BloomRange, mix (tmpvar_10.x, tmpvar_10.z, _SpRange))
   - xlat_mutable_BloomRange) * (0.7 * _BloomPow)));
  col_2.xyz = mix (tmpvar_9.xyz, (tmpvar_9.xyz * col_l_1.xyz), vec3(_LightController));
  lowp vec4 tmpvar_11;
  tmpvar_11.w = 0.0;
  tmpvar_11.xyz = col_2.xyz;
  lowp vec4 tmpvar_12;
  tmpvar_12.w = 0.0;
  tmpvar_12.xyz = (_LightCol.xyz * col_2.xyz);
  lowp vec4 tmpvar_13;
  tmpvar_13 = mix (tmpvar_11, tmpvar_12, max (vec4(0.0, 0.0, 0.0, 0.0), (col_l_1 - 0.65)));
  lowp vec4 tmpvar_14;
  tmpvar_14.w = 0.0;
  tmpvar_14.xyz = tmpvar_13.xyz;
  lowp vec4 tmpvar_15;
  tmpvar_15.w = 0.0;
  tmpvar_15.xyz = (_ShadowCol.xyz + tmpvar_13.xyz);
  col_2.xyz = clamp (mix (col_2.xyz, min (vec3(1.0, 1.0, 1.0), 
    (mix (tmpvar_14, tmpvar_15, max (vec4(0.0, 0.0, 0.0, 0.0), (1.0 - 
      (col_l_1 * 1.35)
    ))).xyz * _GlobalController)
  ), vec3(_CastController)), 0.0, 1.0);
  col_2.xyz = (mix (vec3((
    ((col_2.x * 0.2125) + (col_2.y * 0.7154))
   + 
    (col_2.z * 0.0721)
  )), col_2.xyz, vec3(_Saturation)) + ((
    (_SpeculaCrolor.xyz * pow (max (0.0, dot (viewDir_3, refDir_4)), _Gloss))
   * _SpecPower) * _SpeculaCrolor.xyz));
  col_2.w = (_Alpha * xlv_COLOR.x);
  gl_FragColor = col_2;
}