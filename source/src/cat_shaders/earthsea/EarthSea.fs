precision highp float;
#include "Lighting.glsl";
uniform highp vec3 u_CameraPos;
uniform sampler2D _BumpMap;
uniform sampler2D _ReflectiveColor;
uniform sampler2D _LightMap;
uniform highp vec4 _LightDir;
uniform highp float _SpecPower;
uniform highp vec4 _WaterSpecColor;
uniform highp vec4 _WaterColor;
uniform highp float _SpecSacle;
uniform highp vec4 _fresnel;
uniform highp vec4 _LightDir2;
uniform highp float _EdgeAhpla;
varying highp vec2 xlv_TEXCOORD0;
varying highp vec2 xlv_TEXCOORD1;
varying highp vec2 xlv_TEXCOORD2;
varying highp vec3 xlv_TEXCOORD4;
varying highp vec3 xlv_NORMAL;
varying highp vec4 xlv_TEXCOORD5;
void main()
{

  mediump vec4 tmpvar_1;
  highp vec4 color_2;
  highp vec4 water_3;
  highp vec3 sampledNormalT2_4;
  highp vec3 sampledNormalT1_5;
  highp float lightTex_6;
  highp vec3 tmpvar_7;
  tmpvar_7 = normalize(xlv_NORMAL);
  highp vec3 tmpvar_8;
  tmpvar_8 = normalize((u_CameraPos - xlv_TEXCOORD5.xyz));
  lowp float tmpvar_9;
  tmpvar_9 = texture2D (_LightMap, xlv_TEXCOORD2).z;
  lightTex_6 = tmpvar_9;
  highp vec3 tmpvar_10;
  tmpvar_10 = normalize(xlv_TEXCOORD4);
  lowp vec3 tmpvar_11;
  tmpvar_11 = ((texture2D (_BumpMap, xlv_TEXCOORD0).xyz * 2.0) - 1.0);
  sampledNormalT1_5 = tmpvar_11;
  highp vec3 tmpvar_12;
  tmpvar_12 = normalize(sampledNormalT1_5);
  sampledNormalT1_5 = tmpvar_12;
  lowp vec3 tmpvar_13;
  tmpvar_13 = ((texture2D (_BumpMap, xlv_TEXCOORD1).xyz * 2.0) - 1.0);
  sampledNormalT2_4 = tmpvar_13;
  highp vec3 tmpvar_14;
  tmpvar_14 = normalize(sampledNormalT2_4);
  sampledNormalT2_4 = tmpvar_14;
  highp vec3 tmpvar_15;
  tmpvar_15 = (normalize((0.5 * 
    (tmpvar_12 + tmpvar_14)
  )).xzy * 0.2);
  highp vec3 tmpvar_16;
  tmpvar_16 = normalize(tmpvar_15);
  highp float tmpvar_17;
  tmpvar_17 = dot (((tmpvar_10 * _fresnel.xyz) * 0.1), tmpvar_15);
  lowp vec4 tmpvar_18;
  tmpvar_18 = texture2D (_ReflectiveColor, vec2(tmpvar_17));
  water_3 = tmpvar_18;
  highp vec4 tmpvar_19;
  tmpvar_19.w = 0.6;
  tmpvar_19.xyz = (mix (water_3.xyz, _WaterColor.xyz, water_3.www) + ((
    pow (max (dot (-(
      normalize((_LightDir.xyz - (2.0 * (
        dot (tmpvar_16, _LightDir.xyz)
       * tmpvar_16))))
    ), tmpvar_10), 0.0), _SpecPower)
   * _WaterSpecColor) * _SpecSacle).xyz);
  color_2.w = tmpvar_19.w;
  highp vec4 tmpvar_20;
  tmpvar_20.w = 0.0;
  tmpvar_20.xyz = tmpvar_7;
  highp float tmpvar_21;
  highp vec4 tempLightDir2 = _LightDir2;
  tempLightDir2.x *= -1.0;
  tmpvar_21 = ((max (0.0, 
    (0.5 - dot (tmpvar_8, tmpvar_7))
  ) * 1.2) * ((
    max (0.0, abs(dot (tmpvar_20, tempLightDir2)))
   + 2.0) * 0.25));
  color_2.xyz = (tmpvar_19.xyz * (lightTex_6 * 1.5));
  color_2.xyz = (color_2.xyz + tmpvar_21);
  color_2.w = (0.25 + tmpvar_21);
  color_2.w = (color_2.w * min (1.0, (
    (max (0.0, dot (tmpvar_7, tmpvar_8)) - _EdgeAhpla)
   * 10.0)));
  tmpvar_1 = color_2;
  gl_FragColor = tmpvar_1;
}