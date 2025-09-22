precision highp float;

#include "Lighting.glsl";

uniform sampler2D _MainTex;
uniform sampler2D _MaskTex;
uniform float _MaskScale;
uniform float _AlphaController;
uniform float _MoveController;
uniform vec4 _Color;
uniform vec3 u_CameraPos;

uniform float u_Time;

varying highp vec2 xlv_TEXCOORD0;
varying highp vec3 xlv_NORMAL;

void main()
{
    // vec3 worldNormal = normalize(mat3(v_WorldMat) * v_Normal);

    // vec3 viewDir = normalize(u_CameraPos-(v_WorldMat*v_Position).xyz);

    // float f = max(0.0,1.0 - abs(dot(viewDir,worldNormal)));
    // vec2 uvMove = v_Texcoord0 * u_MaskScale;
    // uvMove.x += u_Time * 0.05 * u_MoveController;
    // vec4 col = texture2D(u_MainTex, v_Texcoord0);
    // vec4 maskcol = texture2D(u_MaskTex, uvMove);
    // col.rgb = lerp(col.rgb, col.rgb + col.rgb * maskcol.rgb, u_AlphaController) * u_Color.rgb;
    // col.a *= (maskcol.r + f) * u_AlphaController * 4.0;
    // gl_FragColor = col;

    vec4 _Time = vec4(u_Time / 20.0, u_Time, u_Time * 2.0, u_Time * 3.0);
    lowp vec4 col_1;
    lowp vec2 uvMove_2;
    mediump float f_3;
    lowp vec3 viewDir_4;
    lowp vec3 worldNormal_5;
    highp vec3 tmpvar_6;
    tmpvar_6 = normalize(xlv_NORMAL);
    worldNormal_5 = tmpvar_6;
    highp vec3 tmpvar_7;
    tmpvar_7 = normalize(u_CameraPos);
    viewDir_4 = tmpvar_7;
    lowp float tmpvar_8;
    tmpvar_8 = max (0.0, (1.0 - abs(
        dot (viewDir_4, worldNormal_5)
    )));
    f_3 = tmpvar_8;
    highp vec2 tmpvar_9;
    tmpvar_9 = (xlv_TEXCOORD0 * _MaskScale);
    uvMove_2 = tmpvar_9;
    uvMove_2.x = (uvMove_2.x + (_Time * _MoveController).x);
    lowp vec4 tmpvar_10;
    tmpvar_10 = texture2D (_MainTex, xlv_TEXCOORD0);
    lowp vec4 tmpvar_11;
    tmpvar_11 = texture2D (_MaskTex, uvMove_2);
    highp vec3 tmpvar_12;
    lowp vec3 y_13;
    y_13 = (tmpvar_10.xyz + (tmpvar_10.xyz * tmpvar_11.xyz));
    tmpvar_12 = mix (tmpvar_10.xyz, y_13, vec3(_AlphaController));
    col_1.xyz = (tmpvar_12 * _Color.xyz);
    col_1.w = (tmpvar_10.w * ((tmpvar_11.x + f_3) * _AlphaController*2.0));
    gl_FragColor = col_1;
}
