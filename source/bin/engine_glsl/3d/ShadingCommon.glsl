#if !defined(ShadingCommon_lib)
    #define ShadingCommon_lib

    varying vec3 v_PositionWS;
    varying vec3 v_NormalWS;
    varying vec3 v_TangentWS;
    varying vec3 v_BiNormalWS;

    #ifdef UV
        varying vec2 v_Texcoord0;
    #endif

    #ifdef UV1
        #ifdef LIGHTMAP
            varying vec2 v_Texcoord1;
        #endif
    #endif

    #ifdef COLOR
        varying vec4 v_VertexColor;
    #endif

    struct PixelParams {
        vec3 positionWS;
        vec3 normalWS;
        vec3 tangentWS;
        vec3 biNormalWS;
        mat3 TBN;
        #ifdef UV
            vec2 uv0;
        #endif

        #ifdef UV1
            #ifdef LIGHTMAP
                vec2 uv1;
            #endif
        #endif

        #ifdef COLOR
            vec4 vertexColor;
        #endif
    };
#endif
