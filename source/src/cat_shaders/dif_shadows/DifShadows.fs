precision highp float;
#include "Lighting.glsl";
uniform sampler2D _MainTex;
uniform highp vec4 _ShadowsColor;
uniform highp float _AlphaScale;
varying highp vec2 xlv_TEXCOORD0;
void main()
{

  lowp vec4 col_1;
  lowp vec4 tmpvar_2;
  tmpvar_2 = texture2D (_MainTex, xlv_TEXCOORD0);
  col_1.xyz = (tmpvar_2.xyz + _ShadowsColor.xyz);
  col_1.w = (tmpvar_2.w * _AlphaScale);
  gl_FragColor = col_1;
}