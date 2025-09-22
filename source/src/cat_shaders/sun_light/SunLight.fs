precision highp float;
#include "Lighting.glsl";
uniform highp float u_Time;
uniform sampler2D _MainTex;
uniform sampler2D _MaskTex;
uniform lowp float _ColorController;
uniform lowp vec4 _LightColor;
uniform lowp float _ViewController;
uniform lowp float _AlphaController;
varying highp vec2 xlv_TEXCOORD0;
void main()
{
  vec4 _Time = vec4(u_Time * 0.05, u_Time, u_Time * 2.0, u_Time * 3.0);

  lowp vec2 uv2_1;
  lowp vec4 col_2;
  lowp vec4 tmpvar_3;
  tmpvar_3 = texture2D (_MainTex, xlv_TEXCOORD0);
  col_2.w = tmpvar_3.w;
  uv2_1 = xlv_TEXCOORD0;
  uv2_1.x = (uv2_1.x + (_Time.x * _ViewController));
  lowp vec4 tmpvar_4;
  tmpvar_4 = texture2D (_MaskTex, uv2_1);
  col_2.xyz = (tmpvar_3.xyz * _LightColor.xyz);
  lowp vec4 tmpvar_5;
  tmpvar_5 = mix (col_2, ((col_2 * _ColorController) * tmpvar_4), vec4(0.5, 0.5, 0.5, 0.5));
  col_2.xyz = tmpvar_5.xyz;
  col_2.w = (mix ((tmpvar_5.w * 2.0), (
    (tmpvar_5.w * tmpvar_4.w)
   * 5.0), 0.3) * _AlphaController);
  gl_FragColor = col_2;
}