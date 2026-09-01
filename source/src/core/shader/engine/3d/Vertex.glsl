#if !defined(VertexCommon_lib)
    #define VertexCommon_lib
    #ifdef MORPHTARGETS
        #include "MorphTarget.glsl";
    #endif

    struct Vertex {
        vec3 positionOS;
        vec3 normalOS;
        #ifdef TANGENT
            vec4 tangentOS;
        #endif

        #ifdef UV
            vec2 texCoord0;
        #endif

        #ifdef UV1
            vec2 texCoord1;
        #endif

        #ifdef COLOR
            vec4 vertexColor;
        #endif
        
        #ifdef LIGHTMAP
            vec4 lightmapScaleOffset;
        #endif LIGHTMAP
    };

    vec4 getVertexPosition() {
        vec4 position = a_Position;
        #ifdef MORPHTARGETS
            #ifdef MORPHTARGETS_POSITION
                #ifdef GRAPHICS_API_GLES3
                    position.xyz = positionMorph(position.xyz);
                #endif
            #endif
        #endif
        return position;
    }

    vec3 getVertexNormal() {
        vec3 normal = a_Normal.xyz;
        #ifdef MORPHTARGETS
            #ifdef MORPHTARGETS_NORMAL
                #ifdef GRAPHICS_API_GLES3
                    normal.xyz = normalMorph(normal);
                #endif
            #endif
        #endif
        return normal;
    }

    #ifdef TANGENT
        vec4 getVertexTangent() {
            vec4 tangent = a_Tangent0;
            #ifdef MORPHTARGETS
                #ifdef MORPHTARGETS_TANGENT
                    #ifdef GRAPHICS_API_GLES3
                        tangent = tangentMorph(tangent);
                    #endif
                #endif
            #endif
            return tangent;
        }
    #endif

    #ifdef LIGHTMAP
        #ifndef GPU_INSTANCE
            uniform vec4 u_LightmapScaleOffset;
        #endif
        vec4 getLightmapScaleOffset() {
            #ifdef GPU_INSTANCE
                return a_LightmapScaleOffset;
            #else
                return u_LightmapScaleOffset;
            #endif
        }
    #endif

    void getVertexParams(inout Vertex vertex) {
        vertex.positionOS = getVertexPosition().xyz;
        vertex.normalOS = getVertexNormal();
        #ifdef TANGENT
            vertex.tangentOS = getVertexTangent();
        #endif

        #ifdef UV
            vertex.texCoord0 = a_Texcoord0;
        #endif

        #ifdef UV1
            vertex.texCoord1 = a_Texcoord1;
        #endif

        #ifdef COLOR
            vertex.vertexColor = vec4(pow(a_Color.rgb, vec3(2.2)), a_Color.a);
        #endif
        
        #ifdef LIGHTMAP
            vertex.lightmapScaleOffset = getLightmapScaleOffset();
        #endif LIGHTMAP
    }
#endif
