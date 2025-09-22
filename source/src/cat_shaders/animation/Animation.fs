#ifdef FSHIGHPRECISION
precision highp float;
#else
precision mediump float;
#endif

uniform sampler2D u_MainTex;

uniform float u_Time;
uniform float u_HAmount;
uniform float u_VAmount;
uniform float u_Speed;

varying vec2 v_Texcoord0;

void main()
{          
    float col = floor(u_Time * u_Speed / u_HAmount);
    float row = floor(u_Time * u_Speed - col * u_VAmount);
    float sourceX = 1.0 / u_HAmount;
    float sourceY = 1.0 / u_VAmount;

    vec2 uv = v_Texcoord0;
    uv.x *= sourceX;
    uv.y *= sourceY;
    uv.x += row * sourceX;
    uv.y -= col * sourceY;
    uv.y *=-1.0;

    vec4 color = texture2D(u_MainTex, uv);

    gl_FragColor = color;

//   highp vec2 uv_1;
//   highp float tmpvar_2;
//   highp float tmpvar_3;
//   tmpvar_3 = (u_Time * u_Speed);
//   tmpvar_2 = floor((tmpvar_3 / u_HAmount));
//   highp float tmpvar_4;
//   tmpvar_4 = (1.0/(u_HAmount));
//   highp float tmpvar_5;
//   tmpvar_5 = (1.0/(u_VAmount));
//   uv_1.x = (v_Texcoord0.x * tmpvar_4);
//   uv_1.y = (v_Texcoord0.y * tmpvar_5);
//   uv_1.x = (uv_1.x + (floor(
//     (tmpvar_3 - (tmpvar_2 * u_VAmount))
//   ) * tmpvar_4));
//   uv_1.y = ((1.0 - (tmpvar_2 * tmpvar_5)) - uv_1.y);
//   lowp vec4 tmpvar_6;
//   tmpvar_6 = texture2D (u_MainTex, uv_1);
//     gl_FragColor = tmpvar_6;
}
