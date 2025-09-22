precision highp float;
#include "Lighting.glsl";
uniform highp vec3 u_CameraPos;
uniform sampler2D _MainTex;
uniform lowp vec4 _GlowColor;
uniform lowp float _GlowPow;
lowp vec4 xlat_mutable_GlowColor;
varying highp vec2 xlv_TEXCOORD0;
varying highp vec4 xlv_TEXCOORD3;
varying highp vec3 xlv_NORMAL;
void main()
{

  xlat_mutable_GlowColor.xyz = _GlowColor.xyz;
  highp vec3 tmpvar_1;
  tmpvar_1 = normalize(xlv_NORMAL);
  highp vec3 tmpvar_2;
  tmpvar_2 = normalize((xlv_TEXCOORD3.xyz - u_CameraPos));
  highp float tmpvar_3;
  tmpvar_3 = clamp (dot (tmpvar_2, tmpvar_1), 0.0, 1.0);
  xlat_mutable_GlowColor.w = pow (tmpvar_3, _GlowPow);
  highp float tmpvar_4;
  tmpvar_4 = dot (tmpvar_2, tmpvar_1);
  xlat_mutable_GlowColor.w = (xlat_mutable_GlowColor.w * (tmpvar_4 * 10.0));
  xlat_mutable_GlowColor = (xlat_mutable_GlowColor * texture2D (_MainTex, xlv_TEXCOORD0));
  gl_FragColor = xlat_mutable_GlowColor;
}