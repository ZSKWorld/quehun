precision highp float;
#include "Lighting.glsl";
uniform sampler2D _MainTex;
uniform sampler2D _LightTex;
uniform sampler2D _MaskTex;
uniform lowp float _LightController;
uniform lowp float _CastController;
uniform lowp float _GlobalController;
uniform lowp vec4 _LightCol;
uniform lowp vec4 _ShadowCol;
uniform highp float _Saturation;
uniform lowp float _BloomRange;
uniform lowp float _BloomPow;
uniform lowp float _LightRange;
uniform lowp float _SpRange;
uniform lowp float _Alpha;
lowp float xlat_mutable_BloomRange;
varying highp vec2 xlv_TEXCOORD0;
varying highp vec2 xlv_TEXCOORD1;
void main()
{

  lowp vec4 col_l_1;
  lowp vec4 col_2;
  lowp vec4 tmpvar_3;
  tmpvar_3 = texture2D (_MainTex, xlv_TEXCOORD0);
  col_2.w = tmpvar_3.w;
  lowp vec4 tmpvar_4;
  tmpvar_4 = texture2D (_LightTex, xlv_TEXCOORD1);
  col_l_1 = (tmpvar_4 + ((
    max (vec4(0.85, 0.85, 0.85, 0.85), tmpvar_4)
   - 0.85) * 0.7));
  xlat_mutable_BloomRange = (_BloomRange * 0.85);
  lowp float tmpvar_5;
  tmpvar_5 = mix (col_l_1.x, texture2D (_LightTex, xlv_TEXCOORD0).z, _SpRange);
  col_l_1.xyz = mix (col_l_1.xxx, col_l_1.yyy, vec3(_LightRange));
  col_l_1 = (col_l_1 + ((
    max (xlat_mutable_BloomRange, tmpvar_5)
   - xlat_mutable_BloomRange) * (0.7 * _BloomPow)));
  col_2.xyz = mix (tmpvar_3.xyz, (tmpvar_3.xyz * col_l_1.xyz), vec3(_LightController));
  lowp vec4 tmpvar_6;
  tmpvar_6.w = 0.0;
  tmpvar_6.xyz = col_2.xyz;
  lowp vec4 tmpvar_7;
  tmpvar_7.w = 0.0;
  tmpvar_7.xyz = (_LightCol.xyz * col_2.xyz);
  lowp vec4 tmpvar_8;
  tmpvar_8 = mix (tmpvar_6, tmpvar_7, max (vec4(0.0, 0.0, 0.0, 0.0), (col_l_1 - 0.65)));
  lowp vec4 tmpvar_9;
  tmpvar_9.w = 0.0;
  tmpvar_9.xyz = tmpvar_8.xyz;
  lowp vec4 tmpvar_10;
  tmpvar_10.w = 0.0;
  tmpvar_10.xyz = (_ShadowCol.xyz + tmpvar_8.xyz);
  col_2.xyz = clamp (mix (col_2.xyz, min (vec3(1.0, 1.0, 1.0), 
    (mix (tmpvar_9, tmpvar_10, max (vec4(0.0, 0.0, 0.0, 0.0), (1.0 - 
      (col_l_1 * 1.35)
    ))).xyz * _GlobalController)
  ), vec3(_CastController)), 0.0, 1.0);
  lowp float x_11;
  x_11 = (texture2D (_MaskTex, xlv_TEXCOORD0).x - 0.5);
  if ((x_11 < 0.0)) {
    discard;
  };
  lowp float tmpvar_12;
  tmpvar_12 = (((col_2.x * 0.2125) + (col_2.y * 0.7154)) + (col_2.z * 0.0721));
  highp vec3 tmpvar_13;
  tmpvar_13 = mix (vec3(tmpvar_12), col_2.xyz, vec3(_Saturation));
  col_2.xyz = tmpvar_13;
  col_2.w = (tmpvar_3.w * _Alpha);
  gl_FragColor = col_2;
}