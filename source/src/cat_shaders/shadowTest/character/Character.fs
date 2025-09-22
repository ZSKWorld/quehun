#ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    precision highp int;
#else
    precision mediump float;
    precision mediump int;
#endif

#include "Lighting.glsl";
/////////////////////////////////////
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
////////////////////////////////////
uniform sampler2D u_MainTex;
uniform sampler2D u_SpecTex;
uniform vec4 u_SpeculaCrolor;
uniform float u_Gloss;
uniform float u_RimColorRange;
uniform float u_RimColorController;
uniform vec4 u_LightColor;
uniform vec4 u_RefColor;
uniform float u_BloomRange;
uniform float u_BloomPow;
uniform float u_GlobalController;
uniform float u_SpecPower;
uniform vec4 u_RimColor;
uniform vec3 u_CameraPos;
uniform vec4 u_ShadowA;

varying vec2 v_Texcoord0;
varying vec2 v_Texcoord1;
varying vec3 v_LightDir;
varying vec3 v_WorldNormal;
varying vec3 v_WorldPos;

vec3 lerp(vec3 l, vec3 r, float t)
{
    vec3 o = vec3(0.0, 0.0, 0.0);
    o.x = l.x + (r.x - l.x) * t;
    o.y = l.y + (r.y - l.y) * t;
    o.z = l.z + (r.z - l.z) * t;
    return o;
}

float saturate(float n) {
    if (n < 0.0) {
        return 0.0; 
    } else if (n > 1.0) {
        return 1.0; 
    } else {
        return n; 
    }
}

vec3 saturate(vec3 l) 
{
    vec3 o = vec3(saturate(l.x), saturate(l.y), saturate(l.z)); 
    return o;
}

void main()
{
    vec4 col = texture2D(u_MainTex, v_Texcoord0);
    vec4 spe = texture2D(u_SpecTex, v_Texcoord1);

    vec3 worldNormal = normalize(v_WorldNormal);
    vec3 LightDir = normalize(v_LightDir);
    vec3 refDir = normalize(reflect(-LightDir, worldNormal));

    vec3 viewDir = normalize(u_CameraPos.xyz - v_WorldPos.xyz);
    vec3 specular = u_SpeculaCrolor.rgb * pow(max(0.0, dot(viewDir, refDir)), u_Gloss);


    float f = max(0.0, u_RimColorRange - saturate(dot(viewDir, worldNormal)));
    vec3 rimColor = f * col.rgb * u_RimColorController;

    float ls = dot(worldNormal, LightDir);
    vec3 Global = ((saturate(max(0.0, ls)) * u_LightColor.rgb + 1.0)*0.5 + (1.0 - ls) * u_RefColor.rgb);

    float lightmap = (spe.r+ ls +(max(u_BloomRange, (spe.r+ ls)*0.7) - u_BloomRange) * (0.7 * u_BloomPow))*0.5;
    col.rgb = (lerp(col.rgb, col.rgb*lightmap, 0.3));

    col.rgb = saturate(lerp(col.rgb, col.rgb * (Global*1.2), u_GlobalController )+ (specular * u_SpecPower * u_SpeculaCrolor.rgb)* spe.g) + rimColor*u_RimColor.rgb;

    col.a = spe.b;

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
        float temp = 1.0;
            if(!(dif.x == 1.0 && dif.y == 1.0 && dif.z == 1.0)){
                temp = 1.0;
            }
          gl_FragColor = vec4((col*u_ShadowA).rgb * (dif * temp), 1.0);
      #else
            gl_FragColor = col*u_ShadowA;
      #endif
}
