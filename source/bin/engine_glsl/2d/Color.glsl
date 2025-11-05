#if !defined(Color_lib)
    #define Color_lib

    #include "Math.glsl";
    
    vec3 linearToGamma(in vec3 value) {
        return pow(value, vec3(1.0 / 2.2));
    }
    vec4 linearToGamma(in vec4 value) {
        return vec4(linearToGamma(value.rgb), value.a);
    }
    vec3 gammaToLinear(in vec3 value) {
        return pow(value, vec3(2.2));
    }
    vec4 gammaToLinear(in vec4 value) {
        return vec4(gammaToLinear(value.rgb), value.a);
    }
    const float c_RGBDMaxRange = 255.0;
    vec4 encodeRGBD(in vec3 color) {
        float maxRGB = max(vecmax(color), FLT_EPS);
        float d = max(1.0, c_RGBDMaxRange / maxRGB);
        d = saturate(d / 255.0);
        vec3 rgb = color.rgb * d;
        rgb = saturate(rgb);
        return vec4(rgb, d);
    }
    vec3 decodeRGBD(in vec4 rgbd) {
        vec3 color = rgbd.rgb * (1.0 / rgbd.a);
        return color;
    }
    vec4 encodeRGBM(in vec3 color, float range) {
        color *= 1.0 / range;
        float maxRGB = max(vecmax(color), FLT_EPS);
        float m = ceil(maxRGB * 255.0) / 255.0;
        vec3 rgb = color.rgb * 1.0 / m;
        vec4 rgbm = vec4(rgb, m);
        return rgbm;
    }
    vec3 decodeRGBM(in vec4 rgbm, float range) {
        return range * rgbm.rgb * rgbm.a;
    }
    #include "OutputTransform.glsl";
#endif
