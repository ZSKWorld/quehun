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
uniform highp float _RimColorController;
uniform highp float _RimColorRange;
uniform highp vec4 _RimColor;
lowp float xlat_mutable_BloomRange;
varying highp vec2 xlv_TEXCOORD0;
varying highp vec2 xlv_TEXCOORD1;
varying highp vec3 xlv_NORMAL;
varying highp vec4 xlv_TEXCOORD2;
void main()
{

  mediump vec3 rimColor_1;
  lowp vec4 col_l_2;
  lowp vec4 col_3;
  mediump float f_4;
  lowp vec3 viewDir_5;
  highp vec3 tmpvar_6;
  tmpvar_6 = normalize((u_CameraPos - xlv_TEXCOORD2.xyz));
  viewDir_5 = tmpvar_6;
  highp float tmpvar_7;
  tmpvar_7 = max (0.0, (_RimColorRange - clamp (
    dot (viewDir_5, normalize(xlv_NORMAL))
  , 0.0, 1.0)));
  f_4 = tmpvar_7;
  lowp vec4 tmpvar_8;
  tmpvar_8 = texture2D (_MainTex, xlv_TEXCOORD0);
  col_3.w = tmpvar_8.w;
  lowp vec4 tmpvar_9;
  tmpvar_9 = texture2D (_LightTex, xlv_TEXCOORD1);
  col_l_2.w = tmpvar_9.w;
  xlat_mutable_BloomRange = (_BloomRange * 0.85);
  highp vec3 tmpvar_10;
  tmpvar_10 = ((f_4 * tmpvar_8.xyz) * _RimColorController);
  rimColor_1 = tmpvar_10;
  col_l_2.xyz = mix (tmpvar_9.xxx, tmpvar_9.yyy, vec3(_LightRange));
  col_l_2 = (col_l_2 + ((
    max (xlat_mutable_BloomRange, mix (tmpvar_9.x, tmpvar_9.z, _SpRange))
   - xlat_mutable_BloomRange) * (0.7 * _BloomPow)));
  col_3.xyz = mix (tmpvar_8.xyz, (tmpvar_8.xyz * col_l_2.xyz), vec3(_LightController));
  lowp vec4 tmpvar_11;
  tmpvar_11.w = 0.0;
  tmpvar_11.xyz = col_3.xyz;
  lowp vec4 tmpvar_12;
  tmpvar_12.w = 0.0;
  tmpvar_12.xyz = (_LightCol.xyz * col_3.xyz);
  lowp vec4 tmpvar_13;
  tmpvar_13 = mix (tmpvar_11, tmpvar_12, max (vec4(0.0, 0.0, 0.0, 0.0), (col_l_2 - 0.65)));
  lowp vec4 tmpvar_14;
  tmpvar_14.w = 0.0;
  tmpvar_14.xyz = tmpvar_13.xyz;
  lowp vec4 tmpvar_15;
  tmpvar_15.w = 0.0;
  tmpvar_15.xyz = (_ShadowCol.xyz + tmpvar_13.xyz);
  col_3.xyz = clamp (mix (col_3.xyz, min (vec3(1.0, 1.0, 1.0), 
    (mix (tmpvar_14, tmpvar_15, max (vec4(0.0, 0.0, 0.0, 0.0), (1.0 - 
      (col_l_2 * 1.35)
    ))).xyz * _GlobalController)
  ), vec3(_CastController)), 0.0, 1.0);
  col_3.xyz = mix (vec3(((
    (col_3.x * 0.2125)
   + 
    (col_3.y * 0.7154)
  ) + (col_3.z * 0.0721))), col_3.xyz, vec3(_Saturation));
  col_3.xyz = (col_3.xyz + (rimColor_1 * _RimColor.xyz));
  col_3.w = _Alpha;
  gl_FragColor = col_3;
}