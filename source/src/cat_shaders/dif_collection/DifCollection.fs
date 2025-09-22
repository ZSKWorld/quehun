precision highp float;
#include "Lighting.glsl";
uniform highp float u_Time;
uniform lowp vec4 _GlowColor;
lowp vec4 xlat_mutable_GlowColor;
void main()
{
  vec4 _Time = vec4(u_Time * 0.05, u_Time, u_Time * 2.0, u_Time * 3.0);

  xlat_mutable_GlowColor.xyz = _GlowColor.xyz;
  lowp float gp_1;
  highp float tmpvar_2;
  tmpvar_2 = abs(sin((_Time * 30.0))).x;
  gp_1 = tmpvar_2;
  xlat_mutable_GlowColor.w = (_GlowColor.w * gp_1);
  gl_FragColor = xlat_mutable_GlowColor;
}