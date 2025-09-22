#if !defined(Sprite3DVertex_lib)
    #define Sprite3DVertex_lib
    #include "Sprite3DCommon.glsl";

    #ifdef BONE
        uniform mat4 u_Bones[24];
        #ifdef SIMPLEBONE
            uniform vec4 u_SimpleAnimatorParams;
            uniform sampler2D u_SimpleAnimatorTexture;
            uniform float u_SimpleAnimatorTextureSize;
            #include "BakedBoneMatrixSampler.glsl";
        #endif
    #endif

    mat4 getWorldMatrix() {
        #ifdef GPU_INSTANCE
            mat4 worldMat = a_WorldMat;
        #else
            mat4 worldMat = u_WorldMat;
        #endif

        #ifdef BONE
            #ifdef SIMPLEBONE
                #ifdef GPU_INSTANCE
                    float currentPixelPos = a_SimpleTextureParams.x + a_SimpleTextureParams.y;
                #else
                    float currentPixelPos = u_SimpleAnimatorParams.x + u_SimpleAnimatorParams.y;
                #endif
                float offset = 1.0 / u_SimpleAnimatorTextureSize;
                mat4 skinTrans = loadBakedMatMatrix(currentPixelPos, a_BoneIndices.x, offset) * a_BoneWeights.x;
                skinTrans += loadBakedMatMatrix(currentPixelPos, a_BoneIndices.y, offset) * a_BoneWeights.y;
                skinTrans += loadBakedMatMatrix(currentPixelPos, a_BoneIndices.z, offset) * a_BoneWeights.z;
                skinTrans += loadBakedMatMatrix(currentPixelPos, a_BoneIndices.w, offset) * a_BoneWeights.w;
                worldMat = worldMat * skinTrans;
            #else
                ivec4 boneIndex = ivec4(a_BoneIndices);
                mat4 skinTrans = u_Bones[boneIndex.x] * a_BoneWeights.x;
                skinTrans += u_Bones[boneIndex.y] * a_BoneWeights.y;
                skinTrans += u_Bones[boneIndex.z] * a_BoneWeights.z;
                skinTrans += u_Bones[boneIndex.w] * a_BoneWeights.w;
                worldMat = worldMat * skinTrans;
            #endif
        #endif
        return worldMat;
    }

    vec2 getSimpleBoneCustomData() {
        vec2 custom;
        #ifdef BONE
            #ifdef SIMPLEBONE
                #ifdef GPU_INSTANCE
                    custom = a_SimpleTextureParams.zw;
                #else
                    custom = u_SimpleAnimatorParams.zw;
                #endif
            #endif
        #endif
        return custom;
    }
#endif
