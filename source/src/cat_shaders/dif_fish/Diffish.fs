precision highp float;
#include "Lighting.glsl";
uniform sampler2D _MainTex;
uniform sampler2D _LightTex;
uniform lowp vec4 _LightDir;
uniform lowp vec4 _LightColor;
uniform highp float _LightController;
uniform lowp vec4 _Color;
uniform lowp float _ColorController;
varying highp vec2 xlv_TEXCOORD0;
varying highp vec2 xlv_TEXCOORD1;
varying highp vec3 xlv_NORMAL;
void main()
{

  highp vec3 wordLightDir_1;
  lowp vec4 col_2;
  lowp vec4 tmpvar_3;
  tmpvar_3 = texture2D (_MainTex, xlv_TEXCOORD0);
  col_2.w = tmpvar_3.w;
  lowp vec3 tmpvar_4;
  tmpvar_4 = normalize(_LightDir).xyz;
  //z转成opengl需要变负
  tmpvar_4.z *= -1.0;
  wordLightDir_1 = tmpvar_4;
  lowp vec4 tmpvar_5;
  tmpvar_5.w = 0.0;
  tmpvar_5.xyz = tmpvar_3.xyz;
  col_2.xyz = mix (tmpvar_5, _Color, vec4(_ColorController)).xyz;
  col_2.xyz = mix (col_2.xyz, (col_2.xyz * texture2D (_LightTex, xlv_TEXCOORD1).z), vec3(0.8, 0.8, 0.8));
  highp vec3 tmpvar_6;
  tmpvar_6 = mix (col_2.xyz, ((col_2.xyz * 
    (max (0.0, dot (normalize(xlv_NORMAL), wordLightDir_1)) * _LightColor)
  .xyz) + (col_2.xyz * 0.5)), vec3(_LightController));
  col_2.xyz = tmpvar_6;
  gl_FragColor = col_2;
}