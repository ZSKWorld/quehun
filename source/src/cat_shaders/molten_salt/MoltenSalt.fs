precision highp float;
#include "Lighting.glsl";
uniform highp float u_Time;
uniform sampler2D _MainTex;
uniform lowp float _ColorController;
uniform lowp float _SaltContorller;
lowp float xlat_mutable_ColorController;
varying highp vec2 xlv_TEXCOORD0;
varying highp vec4 xlv_COLOR;
void main()
{
  vec4 _Time = vec4(u_Time * 0.05, u_Time, u_Time * 2.0, u_Time * 3.0);

  lowp vec4 col_1;
  lowp vec4 tmpvar_2;
  tmpvar_2 = texture2D (_MainTex, xlv_TEXCOORD0);
  highp vec4 tmpvar_3;
  tmpvar_3 = mix (vec4(_ColorController), (_ColorController * (
    (sin((_Time * 20.0)) * 1.5)
   + 1.5)), vec4(_SaltContorller));
  xlat_mutable_ColorController = tmpvar_3.x;
  lowp vec4 tmpvar_4;
  tmpvar_4 = mix (tmpvar_2, (tmpvar_2 * xlat_mutable_ColorController), vec4(0.5, 0.5, 0.5, 0.5));
  col_1.xyz = tmpvar_4.xyz;
  col_1.w = (tmpvar_4.w * xlv_COLOR.x);
  gl_FragColor = col_1;
}