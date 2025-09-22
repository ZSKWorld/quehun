precision highp float;

#include "Lighting.glsl";

#include "Shadow.glsl";
#if defined(DIRECTIONLIGHT)
    varying vec3 v_ViewDir; 
    uniform int u_DirationLightCount;
    uniform sampler2D u_LightBuffer;
#endif
#if (defined(CALCULATE_SHADOWS)&&defined(SHADOW_CASCADE))||defined(CALCULATE_SPOTSHADOWS)
    varying vec3 v_PositionWorld;
#endif

#if defined(CALCULATE_SHADOWS)&&!defined(SHADOW_CASCADE)
    varying vec4 v_ShadowCoord;
#endif
varying vec3 v_Normal; 

uniform sampler2D u_MainTex;
uniform sampler2D u_LightMapTex;


uniform float u_LightController;
uniform float u_CastController;
uniform float u_GlobalController;
uniform float u_BloomRange;
uniform float u_BloomPow;
uniform float u_Saturation;
uniform float u_LightRange;
uniform float u_SpRange;
uniform float u_Alpha;

uniform vec4 u_LightColor;
uniform vec4 u_ShadowColor;

varying vec2 v_Texcoord0;
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

float lerp(float l, float r, float t)
{
    return l + (r - l) * t;
}

vec3 lerp(vec3 l, vec3 r, float t)
{
    vec3 o = vec3(0.0, 0.0, 0.0);
    o.x = l.x + (r.x - l.x) * t;
    o.y = l.y + (r.y - l.y) * t;
    o.z = l.z + (r.z - l.z) * t;
    return o;
}

void main()
{
    vec3 col = texture2D(u_MainTex, v_Texcoord0).rgb;
    vec3 col_l = texture2D(u_LightMapTex, v_Texcoord1).rgb;
    float col_sp = texture2D(u_LightMapTex, v_Texcoord0).b;
    float BloomRange = u_BloomRange * 0.85;
    col_sp = lerp(col_l.r, col_sp, u_SpRange);
    col_l.rgb = lerp(vec3(col_l.r, col_l.r, col_l.r), vec3(col_l.g, col_l.g, col_l.g), u_LightRange);
    col_l = col_l + (max(vec3(BloomRange, BloomRange, BloomRange), col_l) - BloomRange) * (0.7 * u_BloomPow);
    col.rgb = lerp(col.rgb, col.rgb * col_l.rgb, u_LightController);
    
	//1.0// fixed3 castCol = lerp(col.rgb, _LightCol, col_l)*lerp(_ShadowCol, col,  col_l);
    
    //1.0// vec3 castCol = lerp(col.rgb, u_LightColor.rgb, col_l.r) * lerp(u_ShadowColor.rgb, col.rgb,  col_l.r);
    
	//2.0//fixed3 castCol = lerp(col.rgb, _LightCol*col.rgb, max(0, (col_l - 0.65)));
	//2.0//castCol = lerp(castCol, _ShadowCol+castCol, max(0,(1- col_l*1.35)));

	vec3 castCol = lerp(col, u_LightColor.rgb*col, max(0.0, (col_l.r - 0.65)));//2.0
	castCol = lerp(castCol, u_ShadowColor.rgb+castCol, max(0.0,(1.0- col_l.r*1.35)));//2.0
    
    col.rgb = lerp(col.rgb, min(vec3(1.0, 1.0, 1.0), (castCol * u_GlobalController)), u_CastController);
    
    float luminance = col.r * 0.2125 + col.g * 0.7154 + col.b * 0.0721;
    vec3 luminanceColor = vec3(luminance, luminance, luminance);
    col.rgb = lerp(luminanceColor, col.rgb, u_Saturation);

    
    #ifdef DIRECTIONLIGHT
        vec3 dif = vec3(0.0);
        //   for (int i = 0; i < MAX_LIGHT_COUNT; i++) 
        //   {
                // if(i >= u_DirationLightCount){
                // break;
                // }
            DirectionLight directionLight = getDirectionLight(u_LightBuffer,0);
            #ifdef CALCULATE_SHADOWS
                // if(i == 0)
                // {
                  #ifdef SHADOW_CASCADE
                      vec4 shadowCoord = getShadowCoord(vec4(v_PositionWorld,1.0));
                  #else
                      vec4 shadowCoord = v_ShadowCoord;
                  #endif
                  directionLight.color *= sampleShadowmap(shadowCoord);
                // }
            #endif
            vec3 lightVec=normalize(directionLight.direction);
            vec3 normal = normalize(v_Normal);
            lowp float ln = max (0.0, dot (-lightVec,normal));
            dif+=directionLight.color;
        //   }
          gl_FragColor = vec4(col * dif , u_Alpha);
      #else
            gl_FragColor = vec4(col , u_Alpha);
      #endif
}
