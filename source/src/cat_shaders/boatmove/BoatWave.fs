precision highp float;

#include "Lighting.glsl";

uniform float u_Time;

uniform sampler2D _MainTex;
uniform highp float _SpeedX;
uniform highp float _Alpha;
uniform highp float _WaveFrequency;
uniform highp float _SpeedY;
uniform highp vec4 _Color;

varying highp vec2 xlv_TEXCOORD0;
varying highp vec4 xlv_COLOR;

void main()
{
    highp vec2 tmpvar_1;
    lowp vec4 col2_2;
    tmpvar_1.y = (xlv_TEXCOORD0.y + ((u_Time * 0.05 * -_SpeedX) + _WaveFrequency));
    tmpvar_1.x = (xlv_TEXCOORD0.x + ((u_Time * 0.05 * _SpeedY) + _WaveFrequency));
    col2_2 = (texture2D (_MainTex, tmpvar_1) * _Color);
    col2_2.w = (col2_2.w * (xlv_COLOR * _Alpha).x);
    gl_FragColor = col2_2;
}
