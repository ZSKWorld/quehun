precision highp float;

#include "Lighting.glsl";

uniform sampler2D _MainTex;
uniform sampler2D _LightTex;
uniform lowp float _LightController;
uniform lowp float _CastController;
uniform lowp float _GlobalController;
uniform lowp vec4 _LightCol;
uniform lowp vec4 _ShadowCol;
uniform lowp float _BloomRange;
uniform lowp float _BloomPow;
uniform lowp float _LightRange;
uniform lowp float _Saturation;
uniform lowp float _SpRange;
uniform lowp float _Alpha;

lowp float xlat_mutable_BloomRange;
varying highp vec2 xlv_TEXCOORD0;

void main()
{

    lowp vec4 col_l_1;
    lowp vec4 col_2;
    lowp vec4 tmpvar_3;
    tmpvar_3 = texture2D (_MainTex, xlv_TEXCOORD0);
    col_2.w = tmpvar_3.w;
    lowp vec4 tmpvar_4;
    tmpvar_4 = texture2D (_LightTex, xlv_TEXCOORD0);
    col_l_1.w = tmpvar_4.w;
    xlat_mutable_BloomRange = (_BloomRange * 0.85);
    col_l_1.xyz = mix (tmpvar_4.xxx, tmpvar_4.yyy, vec3(_LightRange));
    col_l_1 = (col_l_1 + ((
        max (xlat_mutable_BloomRange, mix (tmpvar_4.x, tmpvar_4.z, _SpRange))
    - xlat_mutable_BloomRange) * (0.7 * _BloomPow)));
    col_2.xyz = mix (tmpvar_3.xyz, (tmpvar_3.xyz * col_l_1.xyz), vec3(_LightController));
    lowp vec4 tmpvar_5;
    tmpvar_5.w = 0.0;
    tmpvar_5.xyz = col_2.xyz;
    lowp vec4 tmpvar_6;
    tmpvar_6.w = 0.0;
    tmpvar_6.xyz = (_LightCol.xyz * col_2.xyz);
    lowp vec4 tmpvar_7;
    tmpvar_7 = mix (tmpvar_5, tmpvar_6, max (vec4(0.0, 0.0, 0.0, 0.0), (col_l_1 - 0.65)));
    lowp vec4 tmpvar_8;
    tmpvar_8.w = 0.0;
    tmpvar_8.xyz = tmpvar_7.xyz;
    lowp vec4 tmpvar_9;
    tmpvar_9.w = 0.0;
    tmpvar_9.xyz = (_ShadowCol.xyz + tmpvar_7.xyz);
    col_2.xyz = clamp (mix (col_2.xyz, min (vec3(1.0, 1.0, 1.0), 
        (mix (tmpvar_8, tmpvar_9, max (vec4(0.0, 0.0, 0.0, 0.0), (1.0 - 
        (col_l_1 * 1.35)
        ))).xyz * _GlobalController)
    ), vec3(_CastController)), 0.0, 1.0);
    col_2.xyz = mix (vec3(((
        (col_2.x * 0.2125)
    + 
        (col_2.y * 0.7154)
    ) + (col_2.z * 0.0721))), col_2.xyz, vec3(_Saturation));
    col_2.w = _Alpha;
    gl_FragColor = col_2;
}
