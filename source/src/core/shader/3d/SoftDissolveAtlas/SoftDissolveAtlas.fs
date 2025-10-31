#ifdef HIGHPRECISION
  precision highp float;
#else
  precision mediump float;
#endif

varying float v_Discard;
varying vec4 v_Color;
varying vec2 v_TextureCoordinate;
varying float v_Time;

uniform vec4 u_MainColor;
uniform float u_MainColorMulti;
uniform float u_Alpha;
//#14A269
#ifdef DEF_MainTex
    uniform sampler2D u_MainTex;
    uniform vec4 u_MainTex_ST;
    uniform vec4 u_MainAnim;
#endif

#ifdef DEF_DissolveTex
    uniform sampler2D u_DissolveTex;
    uniform vec4 u_DissolveTex_ST;
    uniform vec4 u_DissolveAnim;
    uniform float u_DissMode;
    uniform float u_Dissolve;
    uniform vec4 u_EdgeColor;
    uniform float u_EdgeColorMulti;
    uniform float u_EdgeWidth;
    uniform float u_OutsideEdge;
    uniform float u_InsideEdge;
#endif
//#14A269
#ifdef DEF_DistortionTex
    uniform sampler2D u_DistortionTex;
    uniform vec4 u_DistortionTex_ST;
    uniform vec4 u_DistortionAnim;
    #ifdef DEF_MainTex
        uniform float u_MainTexDistortion;
    #endif
    #ifdef DEF_DissolveTex
        uniform float u_EdgeDistortion;
    #endif
    #ifdef DEF_AMBlightTex
        uniform float u_AMBlightTexDistortion;
    #endif
    #ifdef DEF_MaskTex
        uniform float u_MaskTexDistortion;
    #endif
#endif

#ifdef DEF_AMBlightTex
    uniform sampler2D u_AMBlightTex;
    uniform vec4 u_AMBlightTex_ST;
    uniform vec4 u_AMBlightAnim;
    uniform float u_AMBlightLerp;
#endif

#ifdef DEF_MaskTex
    uniform sampler2D u_MaskTex;
    uniform vec4 u_MaskTex_ST;
    uniform vec4 u_MaskAnim;
#endif

vec2 GetTexUV(vec2 originUV, vec4 texST, vec4 anim) {
    
    vec2 uv = (vec2(originUV.x, originUV.y - 1.0) * texST.xy) + texST.zw;
    uv=vec2(uv.x,1.0+uv.y);
    // vec2 uv = originUV * texST.xy + texST.zw;
    float angle = anim.z * v_Time + anim.w;
    float cosA = cos(angle);
    float sinA = sin(angle);
    vec2 rot = (uv - vec2(0.5, 0.5)) * mat2(cosA, -sinA, sinA, cosA) + vec2(0.5, 0.5);
    return rot + anim.xy * v_Time;
}

vec2 DistortionUV(vec2 distortion) {
    distortion.y = -distortion.y;
    return distortion;
}

void main()
{	
    #ifdef DEF_DistortionTex
        vec2 distortionTexUV = GetTexUV(v_TextureCoordinate, u_DistortionTex_ST, u_DistortionAnim);
        vec2 distortion = texture2D(u_DistortionTex, distortionTexUV).gg; // uv的扰动值
    #endif

    vec4 mainTexColor = vec4(1.0, 1.0, 1.0, 1.0);
    float alpha = u_Alpha;
    #ifdef DEF_MainTex
        vec2 mainTexUV = GetTexUV(v_TextureCoordinate, u_MainTex_ST, u_MainAnim);
        #ifdef DEF_DistortionTex
            mainTexUV += DistortionUV(distortion * u_MainTexDistortion);
        #endif
        mainTexColor = texture2D(u_MainTex, mainTexUV);	// 原始贴图颜色
    #endif

    alpha *= mainTexColor.a;
    vec4 baseColor = mainTexColor;
    vec4 AMBlight = mainTexColor;
    #ifdef DEF_AMBlightTex
        vec2 AMBlightUV = GetTexUV(v_TextureCoordinate, u_AMBlightTex_ST, u_AMBlightAnim);
        #ifdef DEF_DistortionTex
            AMBlightUV += DistortionUV(distortion * u_AMBlightTexDistortion);
        #endif
        AMBlight = texture2D(u_AMBlightTex, AMBlightUV);
        AMBlight = mix(AMBlight * mainTexColor, AMBlight + mainTexColor, u_AMBlightLerp); // 流金色
    #endif

    #ifdef DEF_DissolveTex
        vec2 dissolveTexUV = GetTexUV(v_TextureCoordinate, u_DissolveTex_ST, u_DissolveAnim);
        #ifdef DEF_DistortionTex
            dissolveTexUV += DistortionUV(distortion * u_EdgeDistortion);
        #endif
        float dissolveRate = texture2D(u_DissolveTex, dissolveTexUV).r;
        float dissolve = mix(u_Dissolve, 1.0 - v_Color.a, u_DissMode);
        float edgeOutside = smoothstep(dissolve, dissolve + u_OutsideEdge, dissolveRate);
        float edgeInside = smoothstep(dissolve + u_EdgeWidth, dissolve + u_EdgeWidth + u_InsideEdge, dissolveRate);

        vec4 edgeColor = u_EdgeColor * u_EdgeColorMulti * (edgeOutside - edgeInside); // 溶解边缘的颜色
        vec4 insideColor = edgeInside * u_MainColor * AMBlight * u_MainColorMulti;
        baseColor = (insideColor + edgeColor) * v_Color;
        alpha *= edgeOutside * clamp(v_Color.a + u_DissMode, 0.0, 1.0);
    #else
        baseColor = u_MainColor * u_MainColorMulti * AMBlight * v_Color;
        alpha *= v_Color.a;
    #endif

    #ifdef DEF_MaskTex
        vec2 maskUV = GetTexUV(v_TextureCoordinate, u_MaskTex_ST, u_MaskAnim);
        #ifdef DEF_DistortionTex
            maskUV += DistortionUV(distortion * u_MaskTexDistortion);
        #endif
        float mask = texture2D(u_MaskTex, maskUV).a;
        alpha *= mask;
    #endif

    alpha = clamp(alpha, 0.0, 1.0);

	gl_FragColor = vec4(baseColor.rgb, alpha);
}