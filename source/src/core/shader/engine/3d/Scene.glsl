#if !defined(SceneCommon_lib)
    #define SceneCommon_lib

    #ifdef ENUNIFORMBLOCK
        uniform Scene3D {
            float u_Time;
            vec4 u_FogParams;
            vec4 u_FogColor;
            float u_GIRotate;
            int u_DirationLightCount;
        };
    #else
        uniform float u_Time;
        uniform vec4 u_FogParams;
        uniform vec4 u_FogColor;
        uniform float u_GIRotate;
        uniform mediump int u_DirationLightCount;
    #endif
#endif
