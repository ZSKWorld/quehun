precision highp float;
#include "Lighting.glsl";
uniform sampler2D _BumpMap;
uniform sampler2D _ReflectiveColor;
uniform highp vec4 _LightDir;
uniform highp float _SpecPower;
uniform highp vec4 _WaterSpecColor;
uniform highp vec4 _WaterColor;
uniform highp float _SpecSacle;
uniform highp vec4 _fresnel;
uniform highp float _MwController;
varying highp vec2 xlv_TEXCOORD0;
varying highp vec2 xlv_TEXCOORD1;
varying highp vec3 xlv_TEXCOORD4;
varying highp vec3 xlv_NORMAL;
void main()
{

  mediump vec4 tmpvar_1;
  highp vec3 colorL_2;
  highp vec4 color_3;
  highp vec4 water_4;
  highp vec3 sampledNormalT2_5;
  highp vec3 sampledNormalT1_6;
  highp vec3 tmpvar_7;
  tmpvar_7 = normalize(xlv_TEXCOORD4);
  lowp vec3 tmpvar_8;
  tmpvar_8 = ((texture2D (_BumpMap, xlv_TEXCOORD0).xyz * 2.0) - 1.0);
  sampledNormalT1_6 = tmpvar_8;
  highp vec3 tmpvar_9;
  tmpvar_9 = normalize(sampledNormalT1_6);
  sampledNormalT1_6 = tmpvar_9;
  lowp vec3 tmpvar_10;
  tmpvar_10 = ((texture2D (_BumpMap, xlv_TEXCOORD1).xyz * 2.0) - 1.0);
  sampledNormalT2_5 = tmpvar_10;
  highp vec3 tmpvar_11;
  tmpvar_11 = normalize(sampledNormalT2_5);
  sampledNormalT2_5 = tmpvar_11;
  highp vec3 tmpvar_12;
  tmpvar_12 = normalize(((tmpvar_9 + tmpvar_11) * _MwController));
  highp vec3 tmpvar_13;
  tmpvar_13 = normalize(tmpvar_12.xzy);
  highp vec3 I_14;
  I_14 = (_LightDir.xyz * 0.01);
  I_14.x *= -1.0;
  highp float tmpvar_15;
  tmpvar_15 = dot (((tmpvar_7 * _fresnel.xyz) * 0.1), tmpvar_12.xzy);
  highp float tmpvar_16;
  tmpvar_16 = dot (tmpvar_7, xlv_NORMAL);
  lowp vec4 tmpvar_17;
  tmpvar_17 = texture2D (_ReflectiveColor, vec2(tmpvar_15));
  water_4 = tmpvar_17;
  highp vec4 tmpvar_18;
  tmpvar_18.w = 0.85;
  tmpvar_18.xyz = (mix (water_4.xyz, (water_4.xyz * _WaterColor.xyz), vec3(0.5, 0.5, 0.5)) + ((
    pow (max (dot (-(
      normalize(normalize((I_14 - (2.0 * 
        (dot (tmpvar_13, I_14) * tmpvar_13)
      ))))
    ), tmpvar_7), 0.0), _SpecPower)
   * _WaterSpecColor) * _SpecSacle).xyz);
  color_3.w = tmpvar_18.w;
  color_3.xyz = (tmpvar_18.xyz * ((0.9 - tmpvar_16) + 1.3));
  lowp vec4 col_19;
  col_19 = color_3;
  lowp vec3 tmpvar_20;
  tmpvar_20 = vec3((((col_19.x * 0.2125) + (col_19.y * 0.7154)) + (col_19.z * 0.0721)));
  colorL_2 = tmpvar_20;
  highp vec4 tmpvar_21;
  tmpvar_21.w = 0.0;
  tmpvar_21.xyz = colorL_2;
  color_3.xyz = mix (color_3, tmpvar_21, vec4((max (0.0, 
    (tmpvar_16 - 0.55)
  ) * 1.15))).xyz;
  color_3.w = 0.7225;
  tmpvar_1 = color_3;
  gl_FragColor = tmpvar_1;
}