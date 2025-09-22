#ifdef FSHIGHPRECISION
precision highp float;
#else
precision mediump float;
#endif
#include "ShaderTool.glsl";

#if defined(COLOR)&&defined(ENABLEVERTEXCOLOR)
varying vec4 v_Color;
#endif

#ifdef ALBEDOTEXTURE
uniform sampler2D u_AlbedoTexture;
varying vec2 v_Texcoord0;
#endif
uniform sampler2D u_AO;

uniform vec4 u_AlbedoColor;

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
    vec4 color =  vec4(0.0);//u_AlbedoColor;
    /*
#ifdef ALBEDOTEXTURE
color *= texture2D(u_AlbedoTexture, v_Texcoord0);
#endif
#if defined(COLOR)&&defined(ENABLEVERTEXCOLOR)
color *= v_Color;
#endif
     */

    //#ifdef ALPHATEST
    //    if(color.a < u_AlphaTestValue)
    //        discard;
    //#endif

    //vec4 _alpha_var = texture2D(u_AO, v_Texcoord0);
    //gl_FragColor = vec4(color.rgb, _alpha_var.r+ 0.2);
    //gl_FragColor = vec4(vec3(0.0), 0.85);

    color = texture2D(u_AlbedoTexture, v_Texcoord0);
    vec3 emissive = lerp(color.rgb,vec3(31/255, 46/255, 75/255),0.7);
    vec3 finalColor = emissive;
    gl_FragColor = vec4(finalColor, 1.0);

    /*
       float4 _MainTexture_var = tex2D(_MainTexture,TRANSFORM_TEX(i.uv0, _MainTexture));
       float3 emissive = lerp(_MainTexture_var.rgb,_node_817.rgb,_Silhouette);
       float3 finalColor = emissive;
     */

#ifdef FOG
    float lerpFact = clamp((1.0 / gl_FragCoord.w - u_FogStart) / u_FogRange, 0.0, 1.0);
#ifdef ADDTIVEFOG
    gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.0), lerpFact);
#else
    gl_FragColor.rgb = mix(gl_FragColor.rgb, u_FogColor, lerpFact);
#endif
#endif

}
