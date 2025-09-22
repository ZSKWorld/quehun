precision highp float;
#include "Lighting.glsl";
uniform highp float u_Time;
uniform highp vec3 u_CameraPos;
uniform lowp vec4 _GlowColor;
uniform lowp float _GlowPow;
lowp vec4 xlat_mutable_GlowColor;
varying highp vec4 xlv_TEXCOORD3;
varying highp vec3 xlv_NORMAL;
void main()
{
  vec4 _Time = vec4(u_Time * 0.05, u_Time, u_Time * 2.0, u_Time * 3.0);

  xlat_mutable_GlowColor.xyz = _GlowColor.xyz;
  lowp float gp_1;
  highp float tmpvar_2;
  tmpvar_2 = (_GlowPow + (sin(
    (_Time * 40.0)
  ) * 0.4)).x;
  gp_1 = tmpvar_2;
  highp vec3 tmpvar_3;
  tmpvar_3 = normalize(xlv_NORMAL);
  highp vec3 tmpvar_4;
  tmpvar_4 = normalize((xlv_TEXCOORD3.xyz - u_CameraPos));
  highp float tmpvar_5;
  tmpvar_5 = clamp (dot (tmpvar_4, tmpvar_3), 0.0, 1.0);
  xlat_mutable_GlowColor.w = pow (tmpvar_5, gp_1);
  highp float tmpvar_6;
  tmpvar_6 = dot (tmpvar_4, tmpvar_3);
  xlat_mutable_GlowColor.w = (xlat_mutable_GlowColor.w * tmpvar_6);
  gl_FragColor = xlat_mutable_GlowColor;
}