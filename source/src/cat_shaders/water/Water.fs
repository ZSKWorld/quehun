#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

#if defined(COLOR)&&defined(ENABLEVERTEXCOLOR)
varying vec4 v_Color;
#endif

#ifdef ALBEDOTEXTURE
uniform sampler2D u_AlbedoTexture;
varying vec2 v_Texcoord0;
#endif

uniform vec4 u_AlbedoColor;
uniform sampler2D u_noise;
uniform float u_Time;
uniform float u_uSpeed;
uniform float u_vSpeed;
uniform float u_v1;
varying vec2 v_Texcoord1;

#ifdef ALPHATEST
uniform float u_AlphaTestValue;
#endif

#ifdef FOG
uniform float u_FogStart;
uniform float u_FogRange;
#ifdef ADDTIVEFOG
#else
uniform vec3 u_FogColor;
#endif
#endif

void main()
{
    vec4 color =  u_AlbedoColor;
#ifdef ALBEDOTEXTURE
    float x = fract(v_Texcoord0.x * 2.0);
    float y = fract(v_Texcoord0.y * 2.0);
    vec2 node_1391 = vec2(fract(u_vSpeed * u_Time + x), fract(u_uSpeed * u_Time + y));
    vec4 _tex2_var = texture2D(u_noise, node_1391);
    vec2 node_5710 = v_Texcoord0 + vec2(_tex2_var.r, _tex2_var.r) * u_v1;
    vec4 _tex1_var = texture2D(u_AlbedoTexture,node_5710);
    color *= _tex1_var;
#endif

#if defined(COLOR)&&defined(ENABLEVERTEXCOLOR)
    color *= v_Color;
#endif

#ifdef ALPHATEST
    if(color.a < u_AlphaTestValue)
        discard;
#endif

    gl_FragColor = color;

#ifdef FOG
    float lerpFact = clamp((1.0 / gl_FragCoord.w - u_FogStart) / u_FogRange, 0.0, 1.0);
#ifdef ADDTIVEFOG
    gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.0), lerpFact);
#else
    gl_FragColor.rgb = mix(gl_FragColor.rgb, u_FogColor, lerpFact);
#endif
#endif

}
